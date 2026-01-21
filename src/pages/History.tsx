import { useState } from "react";
import { motion } from "framer-motion";
import { History as HistoryIcon, Calendar, Search, Trash2, CheckCircle, AlertTriangle, Loader2, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedBackground from "@/components/AnimatedBackground";
import Header from "@/components/Header";
import { useAuth } from "@/hooks/useAuth";
import { usePlantScans } from "@/hooks/usePlantScans";

const History = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  
  const { user, loading: authLoading } = useAuth();
  const { scans, isLoading, deleteScan } = usePlantScans();

  const getStatusIcon = (isHealthy: boolean) => {
    if (isHealthy) {
      return <CheckCircle className="h-5 w-5 text-primary" />;
    }
    return <AlertTriangle className="h-5 w-5 text-destructive" />;
  };

  const getStatusStyles = (isHealthy: boolean) => {
    return isHealthy 
      ? "bg-primary/10 text-primary" 
      : "bg-destructive/10 text-destructive";
  };

  const filteredScans = scans.filter(scan => {
    const matchesSearch = scan.plant_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (scan.disease_name?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    const matchesFilter = filterStatus === "all" || 
      (filterStatus === "healthy" && scan.is_healthy) ||
      (filterStatus === "issues" && !scan.is_healthy);
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: scans.length,
    healthy: scans.filter(s => s.is_healthy).length,
    issues: scans.filter(s => !s.is_healthy).length,
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <AnimatedBackground />
        <Loader2 className="h-8 w-8 text-primary animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen pb-10">
        <AnimatedBackground />
        <Header showBack title="Detection History" />
        
        <main className="container px-4 pt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <HistoryIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-space text-xl font-semibold text-foreground mb-2">
              Sign in to view your history
            </h3>
            <p className="text-muted-foreground mb-6">
              Create an account to save and track your plant scans
            </p>
            <Link to="/auth">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-neon flex items-center gap-2 mx-auto"
              >
                <LogIn className="h-5 w-5" />
                Sign In
              </motion.button>
            </Link>
          </motion.div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-10">
      <AnimatedBackground />
      <Header showBack title="Detection History" />

      <main className="container px-4 pt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-space text-3xl font-bold text-foreground mb-2">
            Your <span className="gradient-text">History</span>
          </h1>
          <p className="text-muted-foreground">
            View and manage your past plant detections
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-4 mb-8"
        >
          <div className="glass-card p-4 text-center">
            <p className="text-3xl font-space font-bold gradient-text">{stats.total}</p>
            <p className="text-sm text-muted-foreground">Total Scans</p>
          </div>
          <div className="glass-card p-4 text-center">
            <p className="text-3xl font-space font-bold text-primary">{stats.healthy}</p>
            <p className="text-sm text-muted-foreground">Healthy</p>
          </div>
          <div className="glass-card p-4 text-center">
            <p className="text-3xl font-space font-bold text-destructive">{stats.issues}</p>
            <p className="text-sm text-muted-foreground">Issues Found</p>
          </div>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 mb-6"
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by plant or disease..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-muted/50 border border-glass-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
            />
          </div>
          <div className="flex gap-2">
            {["all", "healthy", "issues"].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${
                  filterStatus === status
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted/50 text-muted-foreground hover:text-foreground border border-glass-border"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-20">
            <Loader2 className="h-8 w-8 text-primary animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading your scans...</p>
          </div>
        )}

        {/* Detection List */}
        {!isLoading && (
          <div className="space-y-4">
            {filteredScans.map((scan, index) => (
              <motion.div
                key={scan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                className="glass-card p-5 hover:border-primary/30 transition-all"
              >
                <div className="flex items-center gap-4">
                  {/* Plant Icon */}
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center shrink-0">
                    {getStatusIcon(scan.is_healthy)}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-space font-semibold text-foreground truncate">
                        {scan.plant_name}
                      </h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusStyles(scan.is_healthy)}`}>
                        {scan.is_healthy ? "Healthy" : "Issue Found"}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {scan.disease_name || "No issues detected"}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(scan.created_at).toLocaleDateString()}
                      </div>
                      {scan.confidence && (
                        <div className="flex items-center gap-1">
                          <span className="text-primary">{scan.confidence}%</span> confidence
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => deleteScan(scan.id)}
                    className="p-2 rounded-lg bg-muted/50 hover:bg-destructive/20 transition-colors"
                  >
                    <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                  </motion.button>
                </div>
              </motion.div>
            ))}

            {filteredScans.length === 0 && !isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <HistoryIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-space text-xl font-semibold text-foreground mb-2">
                  No detections found
                </h3>
                <p className="text-muted-foreground mb-6">
                  {searchQuery || filterStatus !== "all" 
                    ? "Try adjusting your search or filters"
                    : "Start scanning plants to build your history"
                  }
                </p>
                <Link to="/detect">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-neon"
                  >
                    Scan Your First Plant
                  </motion.button>
                </Link>
              </motion.div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default History;
