import { motion } from "framer-motion";
import { 
  CloudRain, 
  Sun, 
  Droplets, 
  Wind, 
  Thermometer, 
  AlertTriangle,
  Umbrella,
  Leaf,
  RefreshCw,
  MapPin,
  Loader2,
  ShieldCheck,
  CloudSun
} from "lucide-react";
import { useWeather } from "@/hooks/useWeather";
import { getWeatherCondition } from "@/services/weatherService";

interface CareTip {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  category: "watering" | "protection" | "general";
}

const WeatherCareTips = () => {
  const { weather, isLoading, error, refetch, isUsingDefaultLocation } = useWeather();

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 text-center"
      >
        <Loader2 className="h-12 w-12 text-primary mx-auto mb-4 animate-spin" />
        <p className="text-muted-foreground">Fetching weather data...</p>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 text-center"
      >
        <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
        <p className="text-muted-foreground mb-4">{error}</p>
        <button 
          onClick={refetch}
          className="btn-primary flex items-center gap-2 mx-auto"
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </button>
      </motion.div>
    );
  }

  if (!weather) return null;

  const condition = getWeatherCondition(weather.weatherCode);

  // Generate weather-based care tips
  const generateCareTips = (): CareTip[] => {
    const tips: CareTip[] = [];

    // Temperature-based tips
    if (weather.temperature > 35) {
      tips.push({
        id: "high-temp",
        icon: Thermometer,
        title: "गर्मी से बचाव (Heat Protection)",
        description: `Temperature is ${weather.temperature}°C. Move sensitive plants to shade, increase watering frequency, and consider mulching to retain soil moisture.`,
        priority: "high",
        category: "protection",
      });
    } else if (weather.temperature < 15) {
      tips.push({
        id: "low-temp",
        icon: Thermometer,
        title: "ठंड से बचाव (Cold Protection)",
        description: `Temperature is ${weather.temperature}°C. Protect tropical plants from cold. Consider moving potted plants indoors or covering them with cloth at night.`,
        priority: "high",
        category: "protection",
      });
    } else if (weather.temperature >= 25 && weather.temperature <= 32) {
      tips.push({
        id: "optimal-temp",
        icon: ShieldCheck,
        title: "Optimal Growing Conditions",
        description: `Temperature of ${weather.temperature}°C is ideal for most Indian crops. Great time for planting and transplanting.`,
        priority: "low",
        category: "general",
      });
    }

    // Rain-based tips
    if (condition.isRainy) {
      tips.push({
        id: "rainy",
        icon: Umbrella,
        title: "बारिश का मौसम (Rainy Weather)",
        description: "Rain expected! Skip watering today. Ensure proper drainage in pots to prevent root rot. Check for waterlogging in garden beds.",
        priority: "high",
        category: "watering",
      });
      tips.push({
        id: "fungal-alert",
        icon: AlertTriangle,
        title: "Fungal Disease Alert",
        description: "Wet conditions increase fungal disease risk. Apply neem oil spray preventively. Avoid watering leaves and ensure good air circulation.",
        priority: "high",
        category: "protection",
      });
    }

    // Humidity-based tips
    if (weather.humidity > 80) {
      tips.push({
        id: "high-humidity",
        icon: Droplets,
        title: "High Humidity Care",
        description: `Humidity is ${weather.humidity}%. Reduce watering and improve air circulation. Watch for mold and mildew on leaves.`,
        priority: "medium",
        category: "watering",
      });
    } else if (weather.humidity < 40) {
      tips.push({
        id: "low-humidity",
        icon: Droplets,
        title: "Low Humidity Alert",
        description: `Humidity is only ${weather.humidity}%. Mist tropical plants regularly or use a humidifier. Group plants together to increase local humidity.`,
        priority: "medium",
        category: "watering",
      });
    }

    // Wind-based tips
    if (weather.windSpeed > 20) {
      tips.push({
        id: "windy",
        icon: Wind,
        title: "तेज़ हवा सावधानी (Strong Wind Warning)",
        description: `Wind speed is ${weather.windSpeed} km/h. Stake tall plants and young saplings. Move lightweight pots to sheltered areas.`,
        priority: "high",
        category: "protection",
      });
    }

    // UV Index tips
    if (weather.uvIndex > 7) {
      tips.push({
        id: "high-uv",
        icon: Sun,
        title: "High UV Protection",
        description: `UV index is ${weather.uvIndex}. Provide shade for newly transplanted seedlings. Water in early morning or evening to prevent leaf burn.`,
        priority: "medium",
        category: "protection",
      });
    }

    // Sunny day tips
    if (condition.isSunny && !condition.isRainy) {
      tips.push({
        id: "sunny",
        icon: CloudSun,
        title: "धूप का दिन (Sunny Day)",
        description: "Clear skies today! Perfect for photosynthesis. Water deeply in the morning. Great day for pest inspection and pruning.",
        priority: "low",
        category: "general",
      });
    }

    // General watering tip based on conditions
    if (!condition.isRainy) {
      const wateringAdvice = weather.temperature > 30 
        ? "Water twice daily - early morning and evening."
        : weather.temperature > 20 
        ? "Water once in the morning."
        : "Water every 2-3 days, check soil moisture.";
      
      tips.push({
        id: "watering-schedule",
        icon: Droplets,
        title: "Today's Watering Guide",
        description: wateringAdvice + ` Humidity: ${weather.humidity}%, adjust accordingly.`,
        priority: "medium",
        category: "watering",
      });
    }

    return tips;
  };

  const careTips = generateCareTips();

  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-destructive bg-destructive/5";
      case "medium":
        return "border-l-secondary bg-secondary/5";
      case "low":
        return "border-l-primary bg-primary/5";
      default:
        return "border-l-muted";
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-destructive/10 text-destructive";
      case "medium":
        return "bg-secondary/10 text-secondary";
      case "low":
        return "bg-primary/10 text-primary";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-10"
    >
      {/* Weather Overview Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-6 mb-6 bg-gradient-to-br from-primary/5 to-secondary/5"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="text-5xl">{condition.icon}</div>
            <div>
              <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                <MapPin className="h-4 w-4" />
                <span>{weather.location.city}</span>
                {isUsingDefaultLocation && (
                  <span className="text-xs text-muted-foreground">(default)</span>
                )}
              </div>
              <h3 className="font-space text-2xl font-bold text-foreground">
                {weather.temperature}°C
              </h3>
              <p className="text-muted-foreground">{condition.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 rounded-xl bg-background/50">
              <Droplets className="h-5 w-5 text-secondary mx-auto mb-1" />
              <p className="text-xs text-muted-foreground">Humidity</p>
              <p className="font-semibold text-foreground">{weather.humidity}%</p>
            </div>
            <div className="p-3 rounded-xl bg-background/50">
              <Wind className="h-5 w-5 text-accent mx-auto mb-1" />
              <p className="text-xs text-muted-foreground">Wind</p>
              <p className="font-semibold text-foreground">{weather.windSpeed} km/h</p>
            </div>
            <div className="p-3 rounded-xl bg-background/50">
              <Sun className="h-5 w-5 text-primary mx-auto mb-1" />
              <p className="text-xs text-muted-foreground">UV Index</p>
              <p className="font-semibold text-foreground">{weather.uvIndex}</p>
            </div>
          </div>

          <motion.button
            onClick={refetch}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-glass flex items-center gap-2 shrink-0"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </motion.button>
        </div>
      </motion.div>

      {/* Care Tips Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-primary/10">
          <Leaf className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h2 className="font-space text-2xl font-bold text-foreground">
            Weather-Based Care Tips
          </h2>
          <p className="text-sm text-muted-foreground">
            Personalized recommendations based on current conditions
          </p>
        </div>
      </div>

      {/* Care Tips List */}
      <div className="space-y-4">
        {careTips.map((tip, index) => (
          <motion.div
            key={tip.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`glass-card p-5 border-l-4 ${getPriorityStyles(tip.priority)}`}
          >
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-xl bg-background/50 shrink-0">
                <tip.icon className="h-5 w-5 text-foreground" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-semibold text-foreground">{tip.title}</h4>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getPriorityBadge(tip.priority)}`}>
                    {tip.priority}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{tip.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default WeatherCareTips;
