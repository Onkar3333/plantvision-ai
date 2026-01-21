import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Leaf, Sun, Cloud, Droplets, ChevronDown, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedBackground from "@/components/AnimatedBackground";
import Header from "@/components/Header";
import { useAuth } from "@/hooks/useAuth";
import { usePlantFavorites } from "@/hooks/usePlantFavorites";

// Import plant images
import monsteraImg from "@/assets/plants/monstera.jpg";
import fiddleLeafFigImg from "@/assets/plants/fiddle-leaf-fig.jpg";
import snakePlantImg from "@/assets/plants/snake-plant.jpg";
import peaceLilyImg from "@/assets/plants/peace-lily.jpg";
import pothosImg from "@/assets/plants/pothos.jpg";
import roseBushImg from "@/assets/plants/rose-bush.jpg";
import lavenderImg from "@/assets/plants/lavender.jpg";
import succulentImg from "@/assets/plants/succulent.jpg";

const PlantLibrary = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  
  const { user } = useAuth();
  const { isFavorite, toggleFavorite } = usePlantFavorites();

  const filters = [
    { id: "all", label: "All Plants" },
    { id: "spring", label: "Spring" },
    { id: "summer", label: "Summer" },
    { id: "autumn", label: "Autumn" },
    { id: "winter", label: "Winter" },
    { id: "indoor", label: "Indoor" },
    { id: "outdoor", label: "Outdoor" },
  ];

  const plants = [
    {
      id: 1,
      name: "Monstera Deliciosa",
      category: "Indoor",
      difficulty: "Easy",
      season: "All Year",
      light: "Medium",
      water: "Weekly",
      image: monsteraImg,
    },
    {
      id: 2,
      name: "Fiddle Leaf Fig",
      category: "Indoor",
      difficulty: "Medium",
      season: "All Year",
      light: "Bright",
      water: "Weekly",
      image: fiddleLeafFigImg,
    },
    {
      id: 3,
      name: "Snake Plant",
      category: "Indoor",
      difficulty: "Easy",
      season: "All Year",
      light: "Low",
      water: "Bi-weekly",
      image: snakePlantImg,
    },
    {
      id: 4,
      name: "Peace Lily",
      category: "Indoor",
      difficulty: "Easy",
      season: "Spring",
      light: "Low",
      water: "Weekly",
      image: peaceLilyImg,
    },
    {
      id: 5,
      name: "Pothos",
      category: "Indoor",
      difficulty: "Easy",
      season: "All Year",
      light: "Low",
      water: "Weekly",
      image: pothosImg,
    },
    {
      id: 6,
      name: "Rose Bush",
      category: "Outdoor",
      difficulty: "Medium",
      season: "Summer",
      light: "Full Sun",
      water: "Daily",
      image: roseBushImg,
    },
    {
      id: 7,
      name: "Lavender",
      category: "Outdoor",
      difficulty: "Easy",
      season: "Summer",
      light: "Full Sun",
      water: "Weekly",
      image: lavenderImg,
    },
    {
      id: 8,
      name: "Succulent",
      category: "Indoor",
      difficulty: "Easy",
      season: "All Year",
      light: "Bright",
      water: "Bi-weekly",
      image: succulentImg,
    },
  ];

  const filteredPlants = plants.filter(plant => {
    const matchesSearch = plant.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === "all" || 
      plant.season.toLowerCase().includes(activeFilter) ||
      plant.category.toLowerCase() === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const handleFavoriteClick = (e: React.MouseEvent, plantId: number, plantName: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (user) {
      toggleFavorite(String(plantId), plantName);
    }
  };

  return (
    <div className="min-h-screen pb-10">
      <AnimatedBackground />
      <Header showBack title="Plant Library" />

      <main className="container px-4 pt-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-space text-3xl font-bold text-foreground mb-2">
            Explore <span className="gradient-text">Plants</span>
          </h1>
          <p className="text-muted-foreground">
            Discover care guides for thousands of plant species
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 space-y-4"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search plants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-muted/50 border border-glass-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Filter className="h-5 w-5" />
            <span>Filters</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
          </button>

          {/* Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex flex-wrap gap-2"
              >
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      activeFilter === filter.id
                        ? "bg-primary text-primary-foreground shadow-glow-sm"
                        : "bg-muted/50 text-muted-foreground hover:text-foreground border border-glass-border"
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Plants Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPlants.map((plant, index) => (
            <Link key={plant.id} to={`/plant/${plant.id}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="glass-card overflow-hidden group cursor-pointer transition-all duration-500 hover:border-primary/50 hover:shadow-glow-md relative"
              >
                {/* Favorite Button */}
                {user && (
                  <motion.button
                    onClick={(e) => handleFavoriteClick(e, plant.id, plant.name)}
                    className="absolute top-3 right-3 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm border border-glass-border hover:border-primary/50 transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Heart 
                      className={`h-5 w-5 transition-colors ${
                        isFavorite(String(plant.id)) 
                          ? "fill-primary text-primary" 
                          : "text-muted-foreground hover:text-primary"
                      }`} 
                    />
                  </motion.button>
                )}

                {/* Plant Image */}
                <div className="h-48 overflow-hidden">
                  <img 
                    src={plant.image} 
                    alt={plant.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="p-5">
                  <h3 className="font-space text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {plant.name}
                  </h3>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                      {plant.category}
                    </span>
                    <span className="px-2 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-medium">
                      {plant.difficulty}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Sun className="h-4 w-4 text-primary" />
                      <span className="truncate">{plant.light}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Droplets className="h-4 w-4 text-secondary" />
                      <span className="truncate">{plant.water}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Cloud className="h-4 w-4 text-accent" />
                      <span className="truncate">{plant.season}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {filteredPlants.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Leaf className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-space text-xl font-semibold text-foreground mb-2">
              No plants found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default PlantLibrary;
