import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const VAPID_PUBLIC_KEY = Deno.env.get("VAPID_PUBLIC_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!VAPID_PUBLIC_KEY) {
      return new Response(
        JSON.stringify({ error: "VAPID key not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);
    const { action, ...body } = await req.json();

    switch (action) {
      case "get-vapid-key": {
        return new Response(
          JSON.stringify({ vapidPublicKey: VAPID_PUBLIC_KEY }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      case "subscribe": {
        const authHeader = req.headers.get("Authorization");
        if (!authHeader) {
          return new Response(
            JSON.stringify({ error: "Unauthorized" }),
            { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        const { data: { user }, error: authError } = await supabase.auth.getUser(
          authHeader.replace("Bearer ", "")
        );

        if (authError || !user) {
          return new Response(
            JSON.stringify({ error: "Unauthorized" }),
            { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        const { subscription, latitude, longitude, city } = body;

        // Delete existing subscriptions for this user first to avoid duplicates
        await supabase
          .from("push_subscriptions")
          .delete()
          .eq("user_id", user.id);

        // Insert new subscription
        const { error: insertError } = await supabase
          .from("push_subscriptions")
          .insert({
            user_id: user.id,
            subscription,
            latitude,
            longitude,
            city,
          });

        if (insertError) {
          console.error("Insert error:", insertError);
          return new Response(
            JSON.stringify({ error: "Failed to save subscription" }),
            { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        return new Response(
          JSON.stringify({ success: true }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      case "unsubscribe": {
        const authHeader = req.headers.get("Authorization");
        if (!authHeader) {
          return new Response(
            JSON.stringify({ error: "Unauthorized" }),
            { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        const { data: { user }, error: authError } = await supabase.auth.getUser(
          authHeader.replace("Bearer ", "")
        );

        if (authError || !user) {
          return new Response(
            JSON.stringify({ error: "Unauthorized" }),
            { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        await supabase
          .from("push_subscriptions")
          .delete()
          .eq("user_id", user.id);

        return new Response(
          JSON.stringify({ success: true }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      case "check-subscription": {
        const authHeader = req.headers.get("Authorization");
        if (!authHeader) {
          return new Response(
            JSON.stringify({ subscribed: false }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        const { data: { user } } = await supabase.auth.getUser(
          authHeader.replace("Bearer ", "")
        );

        if (!user) {
          return new Response(
            JSON.stringify({ subscribed: false }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        const { data: subscriptions } = await supabase
          .from("push_subscriptions")
          .select("id")
          .eq("user_id", user.id)
          .limit(1);

        return new Response(
          JSON.stringify({ subscribed: (subscriptions?.length || 0) > 0 }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      case "get-weather-status": {
        // Get weather status for notifications (can be called by cron)
        const { latitude, longitude } = body;
        
        if (!latitude || !longitude) {
          return new Response(
            JSON.stringify({ error: "Location required" }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        const weatherResponse = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,precipitation,relative_humidity_2m`
        );
        const weather = await weatherResponse.json();
        const current = weather.current;

        // Determine if alert is needed
        const alerts: Array<{ type: string; message: string; priority: string }> = [];

        if (current.temperature_2m > 40) {
          alerts.push({
            type: "heat",
            message: `Extreme heat (${current.temperature_2m}°C)! Move plants to shade immediately.`,
            priority: "high",
          });
        } else if (current.temperature_2m < 5) {
          alerts.push({
            type: "cold",
            message: `Frost warning (${current.temperature_2m}°C)! Protect your plants from cold.`,
            priority: "high",
          });
        }

        if (current.precipitation > 10) {
          alerts.push({
            type: "rain",
            message: "Heavy rain detected. Skip watering and check drainage.",
            priority: "normal",
          });
        }

        if (current.relative_humidity_2m > 90) {
          alerts.push({
            type: "humidity",
            message: `Very high humidity (${current.relative_humidity_2m}%). Watch for fungal diseases.`,
            priority: "normal",
          });
        }

        return new Response(
          JSON.stringify({ 
            weather: current, 
            alerts,
            hasAlerts: alerts.length > 0
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      default:
        return new Response(
          JSON.stringify({ error: "Unknown action" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
    }
  } catch (error) {
    console.error("Push notification error:", error);
    return new Response(
      JSON.stringify({ error: String(error) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
