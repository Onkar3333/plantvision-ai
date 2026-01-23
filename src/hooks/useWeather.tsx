import { useState, useEffect, useCallback } from "react";
import { 
  WeatherData, 
  fetchWeatherData, 
  getCurrentLocation, 
  DEFAULT_LOCATION 
} from "@/services/weatherService";

interface UseWeatherReturn {
  weather: WeatherData | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
  isUsingDefaultLocation: boolean;
}

export const useWeather = (): UseWeatherReturn => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUsingDefaultLocation, setIsUsingDefaultLocation] = useState(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Try to get user's location
      const coords = await getCurrentLocation();
      const weatherData = await fetchWeatherData(coords.latitude, coords.longitude);
      setWeather(weatherData);
      setIsUsingDefaultLocation(false);
    } catch (locationError) {
      // Fallback to default location
      console.warn("Using default location:", locationError);
      try {
        const weatherData = await fetchWeatherData(
          DEFAULT_LOCATION.latitude, 
          DEFAULT_LOCATION.longitude
        );
        weatherData.location.city = DEFAULT_LOCATION.city;
        setWeather(weatherData);
        setIsUsingDefaultLocation(true);
      } catch (weatherError) {
        setError("Unable to fetch weather data. Please try again later.");
        console.error("Weather fetch error:", weatherError);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { weather, isLoading, error, refetch: fetchData, isUsingDefaultLocation };
};
