import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface UsePushNotificationsReturn {
  isSupported: boolean;
  isSubscribed: boolean;
  isLoading: boolean;
  permission: NotificationPermission | null;
  subscribe: (location?: { latitude: number; longitude: number; city?: string }) => Promise<boolean>;
  unsubscribe: () => Promise<boolean>;
  requestPermission: () => Promise<boolean>;
}

export const usePushNotifications = (): UsePushNotificationsReturn => {
  const { user } = useAuth();
  const [isSupported, setIsSupported] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [permission, setPermission] = useState<NotificationPermission | null>(null);
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);

  // Check if push notifications are supported
  useEffect(() => {
    const supported = 
      "serviceWorker" in navigator && 
      "PushManager" in window && 
      "Notification" in window;
    
    setIsSupported(supported);
    
    if (supported) {
      setPermission(Notification.permission);
    }
    
    setIsLoading(false);
  }, []);

  // Register service worker and check subscription status
  useEffect(() => {
    if (!isSupported || !user) return;

    const init = async () => {
      try {
        // Register service worker
        const reg = await navigator.serviceWorker.register("/sw.js");
        setRegistration(reg);
        
        // Check if already subscribed
        const subscription = await reg.pushManager.getSubscription();
        setIsSubscribed(!!subscription);
      } catch (error) {
        console.error("Service worker registration failed:", error);
      }
    };

    init();
  }, [isSupported, user]);

  const requestPermission = useCallback(async (): Promise<boolean> => {
    if (!isSupported) return false;

    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      return result === "granted";
    } catch (error) {
      console.error("Permission request failed:", error);
      return false;
    }
  }, [isSupported]);

  const subscribe = useCallback(async (location?: { 
    latitude: number; 
    longitude: number; 
    city?: string 
  }): Promise<boolean> => {
    if (!isSupported || !registration || !user) {
      toast.error("Push notifications are not supported");
      return false;
    }

    setIsLoading(true);

    try {
      // Request permission if not granted
      if (Notification.permission !== "granted") {
        const granted = await requestPermission();
        if (!granted) {
          toast.error("Notification permission denied");
          setIsLoading(false);
          return false;
        }
      }

      // Get VAPID public key from server
      const { data: vapidData, error: vapidError } = await supabase.functions.invoke(
        "push-notifications",
        { body: { action: "get-vapid-key" } }
      );

      if (vapidError || !vapidData?.vapidPublicKey) {
        throw new Error("Failed to get VAPID key");
      }

      // Convert VAPID key to Uint8Array
      const vapidKey = urlBase64ToUint8Array(vapidData.vapidPublicKey);

      // Subscribe to push notifications
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: vapidKey.buffer as ArrayBuffer,
      });

      // Send subscription to server
      const { error: subscribeError } = await supabase.functions.invoke(
        "push-notifications",
        {
          body: {
            action: "subscribe",
            subscription: subscription.toJSON(),
            latitude: location?.latitude,
            longitude: location?.longitude,
            city: location?.city,
          },
        }
      );

      if (subscribeError) {
        throw subscribeError;
      }

      setIsSubscribed(true);
      toast.success("Push notifications enabled!");
      return true;
    } catch (error) {
      console.error("Subscription failed:", error);
      toast.error("Failed to enable push notifications");
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [isSupported, registration, user, requestPermission]);

  const unsubscribe = useCallback(async (): Promise<boolean> => {
    if (!registration) return false;

    setIsLoading(true);

    try {
      const subscription = await registration.pushManager.getSubscription();
      if (subscription) {
        await subscription.unsubscribe();
      }
      
      setIsSubscribed(false);
      toast.success("Push notifications disabled");
      return true;
    } catch (error) {
      console.error("Unsubscribe failed:", error);
      toast.error("Failed to disable push notifications");
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [registration]);

  return {
    isSupported,
    isSubscribed,
    isLoading,
    permission,
    subscribe,
    unsubscribe,
    requestPermission,
  };
};

// Helper function to convert base64 URL to Uint8Array
function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
