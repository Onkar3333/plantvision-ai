import { Cloud, Sun, CloudRain, Droplets, Wind, Thermometer } from "lucide-react";
import { motion } from "framer-motion";

const WeatherWidget = () => {
  // Simulated weather data
  const weather = {
    condition: "sunny",
    temperature: 24,
    humidity: 65,
    wind: 12,
    location: "San Francisco",
  };

  const getWeatherIcon = () => {
    switch (weather.condition) {
      case "sunny":
        return <Sun className="h-10 w-10 text-yellow-400" />;
      case "cloudy":
        return <Cloud className="h-10 w-10 text-gray-400" />;
      case "rainy":
        return <CloudRain className="h-10 w-10 text-blue-400" />;
      default:
        return <Sun className="h-10 w-10 text-yellow-400" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card p-5 h-full"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-space font-semibold text-foreground mb-1">
            Weather
          </h3>
          <p className="text-sm text-muted-foreground">{weather.location}</p>
        </div>
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          {getWeatherIcon()}
        </motion.div>
      </div>

      <div className="flex items-end gap-2 mb-4">
        <span className="text-4xl font-space font-bold text-foreground">
          {weather.temperature}°
        </span>
        <span className="text-muted-foreground mb-1">C</span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="flex items-center gap-2">
          <Droplets className="h-4 w-4 text-secondary" />
          <span className="text-sm text-muted-foreground">{weather.humidity}%</span>
        </div>
        <div className="flex items-center gap-2">
          <Wind className="h-4 w-4 text-secondary" />
          <span className="text-sm text-muted-foreground">{weather.wind} km/h</span>
        </div>
        <div className="flex items-center gap-2">
          <Thermometer className="h-4 w-4 text-secondary" />
          <span className="text-sm text-muted-foreground">Good</span>
        </div>
      </div>

      <p className="mt-4 text-xs text-primary/80">
        ☀️ Great day for plant care!
      </p>
    </motion.div>
  );
};

export default WeatherWidget;
