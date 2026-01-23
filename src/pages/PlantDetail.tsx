import { useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { Sun, Droplets, Thermometer, Bug, Heart, Share2, Bookmark, Leaf } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import AnimatedBackground from "@/components/AnimatedBackground";
import Header from "@/components/Header";
import { getPlantById, formatPrice, indianPlants } from "@/data/indianPlants";
import { getPlantImage } from "@/data/plantImages";

const PlantDetail = () => {
  const { id } = useParams();
  const plantId = parseInt(id || "1");
  const [activeTab, setActiveTab] = useState("care");

  // Get plant data from Indian plants database
  const plantData = getPlantById(plantId);
  
  // Fallback to first plant if not found
  const plant = plantData || indianPlants[0];

  const tabs = [
    { id: "care", label: "Care Guide" },
    { id: "pests", label: "Pests & Issues" },
    { id: "charts", label: "Analytics" },
  ];

  return (
    <div className="min-h-screen pb-10">
      <AnimatedBackground />
      <Header showBack title={plant.name} />

      <main className="container px-4 pt-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card overflow-hidden mb-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Plant Image */}
            <div className="h-64 lg:h-96 overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
              {getPlantImage(plant.id) ? (
                <img 
                  src={getPlantImage(plant.id)} 
                  alt={plant.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <Leaf className="h-24 w-24 text-primary/60 mx-auto mb-4" />
                    <p className="text-muted-foreground text-sm">{plant.category}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="p-6 lg:p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="font-space text-3xl font-bold text-foreground mb-1">
                    {plant.name}
                  </h1>
                  {plant.hindiName && (
                    <p className="text-lg text-primary font-medium mb-1">{plant.hindiName}</p>
                  )}
                  <p className="text-muted-foreground italic">{plant.scientificName}</p>
                </div>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-full bg-muted/50 hover:bg-primary/20 transition-colors"
                  >
                    <Heart className="h-5 w-5 text-muted-foreground hover:text-destructive" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-full bg-muted/50 hover:bg-primary/20 transition-colors"
                  >
                    <Bookmark className="h-5 w-5 text-muted-foreground" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-full bg-muted/50 hover:bg-primary/20 transition-colors"
                  >
                    <Share2 className="h-5 w-5 text-muted-foreground" />
                  </motion.button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  {plant.category}
                </span>
                <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-medium">
                  {plant.difficulty}
                </span>
                <span className="px-3 py-1 rounded-full bg-accent/10 text-accent-foreground text-sm font-medium">
                  {plant.season}
                </span>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-6">
                {plant.description}
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 rounded-xl bg-muted/30">
                  <Sun className="h-5 w-5 text-primary mx-auto mb-1" />
                  <p className="text-xs text-muted-foreground">Light</p>
                  <p className="text-sm font-medium text-foreground">{plant.stats.light}</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-muted/30">
                  <Droplets className="h-5 w-5 text-secondary mx-auto mb-1" />
                  <p className="text-xs text-muted-foreground">Water</p>
                  <p className="text-sm font-medium text-foreground">{plant.stats.water}</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-muted/30">
                  <Thermometer className="h-5 w-5 text-accent mx-auto mb-1" />
                  <p className="text-xs text-muted-foreground">Temp</p>
                  <p className="text-sm font-medium text-foreground">{plant.stats.temperature}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="flex gap-2 p-1 rounded-xl bg-muted/30">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground shadow-glow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "care" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(plant.care).map(([key, value], index) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card p-6"
                >
                  <h3 className="font-space text-lg font-semibold text-foreground capitalize mb-3">
                    {key}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{value}</p>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === "pests" && (
            <div className="space-y-4">
              {plant.pests.map((pest, index) => (
                <motion.div
                  key={pest.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-destructive/10">
                      <Bug className="h-6 w-6 text-destructive" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-space text-lg font-semibold text-foreground mb-2">
                        {pest.name}
                      </h3>
                      <p className="text-muted-foreground mb-3">{pest.description}</p>
                      <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                        <p className="text-sm text-primary">
                          <span className="font-semibold">Treatment:</span> {pest.treatment}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === "charts" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-6"
              >
                <h3 className="font-space text-lg font-semibold text-foreground mb-4">
                  Price Trend (₹/kg)
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={plant.priceHistory}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                      <YAxis 
                        stroke="hsl(var(--muted-foreground))" 
                        tickFormatter={(value) => `₹${value}`}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "0.5rem",
                        }}
                        formatter={(value: number) => [formatPrice(value), "Price"]}
                      />
                      <Line
                        type="monotone"
                        dataKey="price"
                        stroke="hsl(160 84% 45%)"
                        strokeWidth={2}
                        dot={{ fill: "hsl(160 84% 45%)" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-card p-6"
              >
                <h3 className="font-space text-lg font-semibold text-foreground mb-4">
                  Growth Rate (cm)
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={plant.growthChart}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "0.5rem",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="height"
                        stroke="hsl(185 75% 45%)"
                        strokeWidth={2}
                        dot={{ fill: "hsl(185 75% 45%)" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default PlantDetail;
