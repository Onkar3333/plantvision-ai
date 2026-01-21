import { motion } from "framer-motion";
import { Leaf, Camera, BookOpen, MessageSquare, MapPin, History, Sparkles, Bell } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import Header from "@/components/Header";
import DashboardCard from "@/components/DashboardCard";
import StatCard from "@/components/StatCard";
import WeatherWidget from "@/components/WeatherWidget";

const Dashboard = () => {
  const features = [
    {
      title: "Disease Detection",
      description: "AI-powered plant disease diagnosis with treatment plans",
      icon: Camera,
      to: "/detect",
      color: "primary" as const,
    },
    {
      title: "Plant Library",
      description: "Browse thousands of plants with detailed care guides",
      icon: BookOpen,
      to: "/library",
      color: "secondary" as const,
    },
    {
      title: "Care Recommendations",
      description: "Personalized fertilizer and pest control suggestions",
      icon: Sparkles,
      to: "/care",
      color: "accent" as const,
    },
    {
      title: "Nearby Stores",
      description: "Find nurseries and garden centers near you",
      icon: MapPin,
      to: "/stores",
      color: "primary" as const,
    },
    {
      title: "Community Chat",
      description: "Connect with plant experts and enthusiasts",
      icon: MessageSquare,
      to: "/community",
      color: "secondary" as const,
    },
    {
      title: "Detection History",
      description: "View your past scans and saved reports",
      icon: History,
      to: "/history",
      color: "accent" as const,
    },
  ];

  return (
    <div className="min-h-screen pb-10">
      <AnimatedBackground />
      <Header />

      <main className="container px-4 pt-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-2">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Leaf className="h-8 w-8 text-primary" />
            </motion.div>
            <h1 className="font-space text-3xl font-bold text-foreground">
              Good Morning, <span className="gradient-text">Plant Lover</span>
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Your garden is waiting. What would you like to do today?
          </p>
        </motion.div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Plants Scanned"
            value={24}
            icon={Camera}
            change="12%"
            positive
            delay={0.1}
          />
          <StatCard
            title="Healthy Plants"
            value={18}
            icon={Leaf}
            change="8%"
            positive
            delay={0.15}
          />
          <StatCard
            title="Issues Found"
            value={3}
            icon={Bell}
            change="2"
            positive={false}
            delay={0.2}
          />
          <div className="col-span-2 lg:col-span-1">
            <WeatherWidget />
          </div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="font-space text-xl font-semibold text-foreground mb-4">
            Quick Actions
          </h2>
          <div className="flex flex-wrap gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-neon flex items-center gap-2"
            >
              <Camera className="h-5 w-5" />
              Scan Plant
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-glass flex items-center gap-2"
            >
              <BookOpen className="h-5 w-5" />
              Browse Library
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-glass flex items-center gap-2"
            >
              <MessageSquare className="h-5 w-5" />
              Ask Expert
            </motion.button>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div>
          <h2 className="font-space text-xl font-semibold text-foreground mb-4">
            Explore Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <DashboardCard
                key={feature.title}
                {...feature}
                delay={0.1 + index * 0.05}
              />
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-10"
        >
          <h2 className="font-space text-xl font-semibold text-foreground mb-4">
            Recent Activity
          </h2>
          <div className="glass-card divide-y divide-glass-border">
            {[
              { text: "Scanned Monstera Deliciosa", time: "2 hours ago", status: "healthy" },
              { text: "Detected leaf spot on Rose", time: "Yesterday", status: "issue" },
              { text: "Added Fiddle Leaf Fig to collection", time: "3 days ago", status: "added" },
            ].map((activity, index) => (
              <div key={index} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.status === "healthy" ? "bg-primary" :
                    activity.status === "issue" ? "bg-destructive" : "bg-secondary"
                  }`} />
                  <span className="text-foreground">{activity.text}</span>
                </div>
                <span className="text-sm text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
