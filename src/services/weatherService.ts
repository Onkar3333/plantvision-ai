// Open-Meteo Weather API Service (Free, no API key required)

export interface WeatherData {
  temperature: number;
  humidity: number;
  precipitation: number;
  windSpeed: number;
  weatherCode: number;
  isDay: boolean;
  uvIndex: number;
  cloudCover: number;
  location: {
    latitude: number;
    longitude: number;
    city?: string;
  };
}

export interface WeatherCondition {
  code: number;
  description: string;
  icon: string;
  isRainy: boolean;
  isSunny: boolean;
  isCloudy: boolean;
  isStormy: boolean;
}

// Weather code mapping based on WMO codes
export const getWeatherCondition = (code: number): WeatherCondition => {
  const conditions: Record<number, Omit<WeatherCondition, 'code'>> = {
    0: { description: "Clear sky", icon: "☀️", isRainy: false, isSunny: true, isCloudy: false, isStormy: false },
    1: { description: "Mainly clear", icon: "🌤️", isRainy: false, isSunny: true, isCloudy: false, isStormy: false },
    2: { description: "Partly cloudy", icon: "⛅", isRainy: false, isSunny: false, isCloudy: true, isStormy: false },
    3: { description: "Overcast", icon: "☁️", isRainy: false, isSunny: false, isCloudy: true, isStormy: false },
    45: { description: "Foggy", icon: "🌫️", isRainy: false, isSunny: false, isCloudy: true, isStormy: false },
    48: { description: "Depositing rime fog", icon: "🌫️", isRainy: false, isSunny: false, isCloudy: true, isStormy: false },
    51: { description: "Light drizzle", icon: "🌧️", isRainy: true, isSunny: false, isCloudy: true, isStormy: false },
    53: { description: "Moderate drizzle", icon: "🌧️", isRainy: true, isSunny: false, isCloudy: true, isStormy: false },
    55: { description: "Dense drizzle", icon: "🌧️", isRainy: true, isSunny: false, isCloudy: true, isStormy: false },
    61: { description: "Slight rain", icon: "🌧️", isRainy: true, isSunny: false, isCloudy: true, isStormy: false },
    63: { description: "Moderate rain", icon: "🌧️", isRainy: true, isSunny: false, isCloudy: true, isStormy: false },
    65: { description: "Heavy rain", icon: "🌧️", isRainy: true, isSunny: false, isCloudy: true, isStormy: false },
    71: { description: "Slight snow", icon: "🌨️", isRainy: false, isSunny: false, isCloudy: true, isStormy: false },
    73: { description: "Moderate snow", icon: "🌨️", isRainy: false, isSunny: false, isCloudy: true, isStormy: false },
    75: { description: "Heavy snow", icon: "❄️", isRainy: false, isSunny: false, isCloudy: true, isStormy: false },
    80: { description: "Rain showers", icon: "🌦️", isRainy: true, isSunny: false, isCloudy: true, isStormy: false },
    81: { description: "Moderate showers", icon: "🌦️", isRainy: true, isSunny: false, isCloudy: true, isStormy: false },
    82: { description: "Violent showers", icon: "⛈️", isRainy: true, isSunny: false, isCloudy: true, isStormy: true },
    95: { description: "Thunderstorm", icon: "⛈️", isRainy: true, isSunny: false, isCloudy: true, isStormy: true },
    96: { description: "Thunderstorm with hail", icon: "⛈️", isRainy: true, isSunny: false, isCloudy: true, isStormy: true },
    99: { description: "Heavy thunderstorm", icon: "⛈️", isRainy: true, isSunny: false, isCloudy: true, isStormy: true },
  };

  const condition = conditions[code] || conditions[0];
  return { code, ...condition };
};

// Get user's current location
export const getCurrentLocation = (): Promise<GeolocationCoordinates> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => resolve(position.coords),
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            reject(new Error("Location permission denied. Please enable location access."));
            break;
          case error.POSITION_UNAVAILABLE:
            reject(new Error("Location information unavailable."));
            break;
          case error.TIMEOUT:
            reject(new Error("Location request timed out."));
            break;
          default:
            reject(new Error("An unknown error occurred."));
        }
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes cache
      }
    );
  });
};

// Reverse geocoding to get city name
export const getCityName = async (latitude: number, longitude: number): Promise<string> => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`
    );
    const data = await response.json();
    return data.address?.city || data.address?.town || data.address?.village || data.address?.state || "Your Location";
  } catch {
    return "Your Location";
  }
};

// Fetch weather data from Open-Meteo
export const fetchWeatherData = async (latitude: number, longitude: number): Promise<WeatherData> => {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m,is_day,cloud_cover,uv_index&timezone=auto`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }

  const data = await response.json();
  const current = data.current;
  const city = await getCityName(latitude, longitude);

  return {
    temperature: current.temperature_2m,
    humidity: current.relative_humidity_2m,
    precipitation: current.precipitation,
    windSpeed: current.wind_speed_10m,
    weatherCode: current.weather_code,
    isDay: current.is_day === 1,
    uvIndex: current.uv_index || 0,
    cloudCover: current.cloud_cover,
    location: {
      latitude,
      longitude,
      city,
    },
  };
};

// Default location (Delhi, India) for when geolocation fails
export const DEFAULT_LOCATION = {
  latitude: 28.6139,
  longitude: 77.2090,
  city: "New Delhi",
};
