import { useState } from "react";
import { motion } from "framer-motion";
import { History as HistoryIcon, Calendar, Search, Filter, Eye, Download, Trash2, CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import Header from "@/components/Header";

const History = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const detections = [
    {
      id: 1,
      plantName: "Monstera Deliciosa",
      disease: "Leaf Spot Disease",
      date: "2024-01-15",
      status: "treated",
      confidence: 94,
      image: "🪴",
    },
    {
      id: 2,
      plantName: "Rose Bush",
      disease: "Powdery Mildew",
      date: "2024-01-12",
      status: "monitoring",
      confidence: 89,
      image: "🌹",
    },
    {
      id: 3,
      plantName: "Fiddle Leaf Fig",
      disease: "No issues detected",
      date: "2024-01-10",
      status: "healthy",
      confidence: 98,
      image: "🌿",
    },
    {
      id: 4,
      plantName: "Peace Lily",
      disease: "Root Rot Signs",
      date: "2024-01-08",
      status: "treated",
      confidence: 86,
      image: "🌸",
    },
    {
      id: 5,
      plantName: "Snake Plant",
      disease: "No issues detected",
      date: "2024-01-05",
      status: "healthy",
      confidence: 99,
      image: "🌱",
    },
    {
      id: 6,
      plantName: "Pothos",
      disease: "Spider Mite Infestation",
      date: "2024-01-03",
      status: "monitoring",
      confidence: 91,
      image: "🍀",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="h-5 w-5 text-primary" />;
      case "treated":
        return <CheckCircle className="h-5 w-5 text-secondary" />;
      case "monitoring":
        return <AlertTriangle className="h-5 w-5 text-accent" />;
      default:
        return <XCircle className="h-5 w-5 text-destructive" />;
    }
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-primary/10 text-primary";
      case "treated":
        return "bg-secondary/10 text-secondary";
      case "monitoring":
        return "bg-accent/10 text-accent";
      default:
        return "bg-destructive/10 text-destructive";
    }
  };

  const filteredDetections = detections.filter(d => {
    const matchesSearch = d.plantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.disease.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "all" || d.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: detections.length,
    healthy: detections.filter(d => d.status === "healthy").length,
    treated: detections.filter(d => d.status === "treated").length,
    monitoring: detections.filter(d => d.status === "monitoring").length,
  };

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
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
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
            <p className="text-3xl font-space font-bold text-secondary">{stats.treated}</p>
            <p className="text-sm text-muted-foreground">Treated</p>
          </div>
          <div className="glass-card p-4 text-center">
            <p className="text-3xl font-space font-bold text-accent">{stats.monitoring}</p>
            <p className="text-sm text-muted-foreground">Monitoring</p>
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
            {["all", "healthy", "treated", "monitoring"].map((status) => (
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

        {/* Detection List */}
        <div className="space-y-4">
          {filteredDetections.map((detection, index) => (
            <motion.div
              key={detection.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              className="glass-card p-5 hover:border-primary/30 transition-all"
            >
              <div className="flex items-center gap-4">
                {/* Plant Image */}
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-3xl shrink-0">
                  {detection.image}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-space font-semibold text-foreground truncate">
                      {detection.plantName}
                    </h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusStyles(detection.status)}`}>
                      {detection.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{detection.disease}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(detection.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-primary">{detection.confidence}%</span> confidence
                    </div>
                  </div>
                </div>

                {/* Status Icon */}
                <div className="hidden sm:block">
                  {getStatusIcon(detection.status)}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-lg bg-muted/50 hover:bg-primary/20 transition-colors"
                  >
                    <Eye className="h-4 w-4 text-muted-foreground hover:text-primary" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-lg bg-muted/50 hover:bg-primary/20 transition-colors"
                  >
                    <Download className="h-4 w-4 text-muted-foreground hover:text-primary" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-lg bg-muted/50 hover:bg-destructive/20 transition-colors"
                  >
                    <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}

          {filteredDetections.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <HistoryIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-space text-xl font-semibold text-foreground mb-2">
                No detections found
              </h3>
              <p className="text-muted-foreground">
                {searchQuery || filterStatus !== "all" 
                  ? "Try adjusting your search or filters"
                  : "Start scanning plants to build your history"
                }
              </p>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default History;
