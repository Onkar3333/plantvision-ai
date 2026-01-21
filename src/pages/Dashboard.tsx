import { motion } from "framer-motion";
import { Leaf, Camera, BookOpen, MessageSquare, MapPin, History, Sparkles, Bell, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedBackground from "@/components/AnimatedBackground";
import Header from "@/components/Header";
import DashboardCard from "@/components/DashboardCard";
import StatCard from "@/components/StatCard";
import WeatherWidget from "@/components/WeatherWidget";
import { useAuth } from "@/hooks/useAuth";
import { usePlantScans } from "@/hooks/usePlantScans";
import { usePlantFavorites } from "@/hooks/usePlantFavorites";

const Dashboard = () => {
  const { user } = useAuth();
  const { scans } = usePlantScans();
  const { favorites } = usePlantFavorites();

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

  const healthyCount = scans.filter(s => s.is_healthy).length;
  const issuesCount = scans.filter(s => !s.is_healthy).length;

  const recentActivity = scans.slice(0, 3).map(scan => ({
    text: `Scanned ${scan.plant_name}`,
    time: new Date(scan.created_at).toLocaleDateString(),
    status: scan.is_healthy ? "healthy" : "issue",
  }));

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
              {user ? (
                <>Welcome, <span className="gradient-text">{user.email?.split('@')[0]}</span></>
              ) : (
                <>Hello, <span className="gradient-text">Plant Lover</span></>
              )}
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            {user 
              ? "Your garden is waiting. What would you like to do today?"
              : "Sign in to save your plant scans and track your garden health."
            }
          </p>
        </motion.div>

        {/* Auth Banner for non-logged in users */}
        {!user && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6 mb-8 border-l-4 border-l-primary"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-space font-semibold text-foreground mb-1">
                  Create a free account
                </h3>
                <p className="text-muted-foreground text-sm">
                  Save your plant scans, favorites, and access your history across devices.
                </p>
              </div>
              <Link to="/auth">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-neon flex items-center gap-2 shrink-0"
                >
                  <LogIn className="h-5 w-5" />
                  Sign In
                </motion.button>
              </Link>
            </div>
          </motion.div>
        )}

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Plants Scanned"
            value={user ? scans.length : 0}
            icon={Camera}
            change={user && scans.length > 0 ? `${scans.length}` : undefined}
            positive
            delay={0.1}
          />
          <StatCard
            title="Favorites"
            value={user ? favorites.length : 0}
            icon={Leaf}
            change={user && favorites.length > 0 ? `${favorites.length}` : undefined}
            positive
            delay={0.15}
          />
          <StatCard
            title="Issues Found"
            value={user ? issuesCount : 0}
            icon={Bell}
            change={issuesCount > 0 ? `${issuesCount}` : undefined}
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
            <Link to="/detect">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-neon flex items-center gap-2"
              >
                <Camera className="h-5 w-5" />
                Scan Plant
              </motion.button>
            </Link>
            <Link to="/library">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-glass flex items-center gap-2"
              >
                <BookOpen className="h-5 w-5" />
                Browse Library
              </motion.button>
            </Link>
            <Link to="/community">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-glass flex items-center gap-2"
              >
                <MessageSquare className="h-5 w-5" />
                Ask Expert
              </motion.button>
            </Link>
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
        {user && recentActivity.length > 0 && (
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
              {recentActivity.map((activity, index) => (
                <div key={index} className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.status === "healthy" ? "bg-primary" : "bg-destructive"
                    }`} />
                    <span className="text-foreground">{activity.text}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
