import { motion } from "framer-motion";
import { Bell, BellOff, MapPin, Loader2, AlertCircle, CheckCircle } from "lucide-react";
import { usePushNotifications } from "@/hooks/usePushNotifications";
import { useWeather } from "@/hooks/useWeather";
import { useAuth } from "@/hooks/useAuth";
import { Switch } from "@/components/ui/switch";

const NotificationSettings = () => {
  const { user } = useAuth();
  const { weather } = useWeather();
  const {
    isSupported,
    isSubscribed,
    isLoading,
    permission,
    subscribe,
    unsubscribe,
  } = usePushNotifications();

  const handleToggle = async () => {
    if (isSubscribed) {
      await unsubscribe();
    } else {
      // Pass current location if available
      if (weather?.location) {
        await subscribe({
          latitude: weather.location.latitude,
          longitude: weather.location.longitude,
          city: weather.location.city,
        });
      } else {
        await subscribe();
      }
    }
  };

  if (!user) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-5 mb-6"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-muted">
            <Bell className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-foreground">Weather Alerts</h4>
            <p className="text-sm text-muted-foreground">
              Sign in to enable push notifications for weather-based plant care alerts
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  if (!isSupported) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-5 mb-6 border-l-4 border-l-muted"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-muted">
            <AlertCircle className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-foreground">Notifications Not Supported</h4>
            <p className="text-sm text-muted-foreground">
              Your browser doesn't support push notifications. Try using Chrome, Firefox, or Edge.
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`glass-card p-5 mb-6 border-l-4 ${
        isSubscribed ? "border-l-primary bg-primary/5" : "border-l-muted"
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-xl ${isSubscribed ? "bg-primary/10" : "bg-muted"}`}>
            {isSubscribed ? (
              <Bell className="h-5 w-5 text-primary" />
            ) : (
              <BellOff className="h-5 w-5 text-muted-foreground" />
            )}
          </div>
          <div>
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              Weather Alerts
              {isSubscribed && (
                <span className="flex items-center gap-1 text-xs text-primary font-normal">
                  <CheckCircle className="h-3 w-3" />
                  Active
                </span>
              )}
            </h4>
            <p className="text-sm text-muted-foreground">
              {isSubscribed 
                ? "You'll receive alerts for extreme weather conditions"
                : "Get notified when weather requires immediate plant care"
              }
            </p>
            {isSubscribed && weather?.location?.city && (
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                Monitoring weather in {weather.location.city}
              </p>
            )}
            {permission === "denied" && (
              <p className="text-xs text-destructive mt-1">
                Notifications are blocked. Please enable them in your browser settings.
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          ) : (
            <Switch
              checked={isSubscribed}
              onCheckedChange={handleToggle}
              disabled={permission === "denied"}
            />
          )}
        </div>
      </div>

      {/* Alert Types Info */}
      {isSubscribed && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-4 pt-4 border-t border-glass-border"
        >
          <p className="text-xs text-muted-foreground mb-2">You'll be alerted for:</p>
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 rounded-full bg-destructive/10 text-destructive text-xs">
              🌡️ Extreme Heat (40°C+)
            </span>
            <span className="px-2 py-1 rounded-full bg-secondary/10 text-secondary text-xs">
              ❄️ Frost Warning (5°C-)
            </span>
            <span className="px-2 py-1 rounded-full bg-accent/10 text-accent-foreground text-xs">
              🌧️ Heavy Rain
            </span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default NotificationSettings;
