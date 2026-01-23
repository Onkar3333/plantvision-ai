import { motion } from "framer-motion";
import { Sparkles, Droplets, Bug, Leaf, AlertCircle, ThumbsUp, ShoppingCart } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import Header from "@/components/Header";
import WeatherCareTips from "@/components/WeatherCareTips";
import NotificationSettings from "@/components/NotificationSettings";

const CareRecommendations = () => {
  const recommendations = {
    fertilizers: [
      {
        name: "Balanced NPK Fertilizer",
        ratio: "20-20-20",
        frequency: "Every 2 weeks",
        dosage: "1 tablespoon per gallon of water",
        plantTypes: ["Monstera", "Pothos", "Philodendron"],
        priority: "high",
      },
      {
        name: "Slow-Release Granules",
        ratio: "14-14-14",
        frequency: "Every 3 months",
        dosage: "1 teaspoon per 6-inch pot",
        plantTypes: ["All houseplants"],
        priority: "medium",
      },
      {
        name: "Bloom Booster",
        ratio: "10-30-20",
        frequency: "During flowering",
        dosage: "Half strength as directed",
        plantTypes: ["Orchids", "Peace Lily", "African Violets"],
        priority: "low",
      },
    ],
    pestControl: [
      {
        name: "Neem Oil Solution",
        target: "General pest prevention",
        application: "Spray on leaves every 2 weeks",
        dosage: "2 tbsp per liter of water",
        safeFor: ["All plants", "Pets safe when dry"],
        priority: "high",
      },
      {
        name: "Insecticidal Soap",
        target: "Aphids, Spider Mites, Mealybugs",
        application: "Spray directly on pests",
        dosage: "As directed on label",
        safeFor: ["Most houseplants"],
        priority: "medium",
      },
      {
        name: "Diatomaceous Earth",
        target: "Crawling insects, Fungus gnats",
        application: "Sprinkle on soil surface",
        dosage: "Thin layer on top soil",
        safeFor: ["All plants", "Pet safe"],
        priority: "low",
      },
    ],
    tips: [
      {
        icon: Droplets,
        title: "Watering Schedule",
        content: "Based on your plants, water every 5-7 days. Check soil moisture before watering.",
      },
      {
        icon: Leaf,
        title: "Humidity Boost",
        content: "Your tropical plants need 60%+ humidity. Consider a humidifier or pebble tray.",
      },
      {
        icon: AlertCircle,
        title: "Seasonal Alert",
        content: "Reduce fertilizing during winter months as plant growth slows down.",
      },
    ],
  };

  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-primary bg-primary/5";
      case "medium":
        return "border-l-secondary bg-secondary/5";
      case "low":
        return "border-l-accent bg-accent/5";
      default:
        return "border-l-muted";
    }
  };

  return (
    <div className="min-h-screen pb-10">
      <AnimatedBackground />
      <Header showBack title="Care Recommendations" />

      <main className="container px-4 pt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-space text-3xl font-bold text-foreground mb-2">
            Smart <span className="gradient-text">Care Guide</span>
          </h1>
          <p className="text-muted-foreground">
            Personalized recommendations based on your plant collection
          </p>
        </motion.div>

        {/* Notification Settings */}
        <NotificationSettings />

        {/* Weather-Based Care Tips */}
        <WeatherCareTips />

        {/* Quick Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10"
        >
          {recommendations.tips.map((tip, index) => (
            <motion.div
              key={tip.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="glass-card p-5"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-primary/10">
                  <tip.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">{tip.title}</h4>
                  <p className="text-sm text-muted-foreground">{tip.content}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Fertilizers Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-primary/10">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <h2 className="font-space text-2xl font-bold text-foreground">
              Fertilizer Recommendations
            </h2>
          </div>

          <div className="space-y-4">
            {recommendations.fertilizers.map((fertilizer, index) => (
              <motion.div
                key={fertilizer.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className={`glass-card p-6 border-l-4 ${getPriorityStyles(fertilizer.priority)}`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-space text-lg font-semibold text-foreground">
                        {fertilizer.name}
                      </h3>
                      <span className="px-2 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground">
                        {fertilizer.ratio}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Frequency</p>
                        <p className="font-medium text-foreground">{fertilizer.frequency}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Dosage</p>
                        <p className="font-medium text-foreground">{fertilizer.dosage}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-muted-foreground">Best For</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {fertilizer.plantTypes.map((plant) => (
                            <span 
                              key={plant} 
                              className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs"
                            >
                              {plant}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-glass flex items-center gap-2 shrink-0"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Buy Now
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Pest Control Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-secondary/10">
              <Bug className="h-6 w-6 text-secondary" />
            </div>
            <h2 className="font-space text-2xl font-bold text-foreground">
              Pest Control Solutions
            </h2>
          </div>

          <div className="space-y-4">
            {recommendations.pestControl.map((product, index) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className={`glass-card p-6 border-l-4 ${getPriorityStyles(product.priority)}`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-space text-lg font-semibold text-foreground">
                        {product.name}
                      </h3>
                    </div>
                    
                    <p className="text-secondary text-sm mb-3">{product.target}</p>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Application</p>
                        <p className="font-medium text-foreground">{product.application}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Dosage</p>
                        <p className="font-medium text-foreground">{product.dosage}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Safe For</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {product.safeFor.map((item) => (
                            <span 
                              key={item} 
                              className="flex items-center gap-1 text-primary text-xs"
                            >
                              <ThumbsUp className="h-3 w-3" />
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-glass flex items-center gap-2 shrink-0"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Buy Now
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>
    </div>
  );
};

export default CareRecommendations;
