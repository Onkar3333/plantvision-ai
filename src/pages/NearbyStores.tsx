import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Search, Phone, Clock, Star, Navigation, ExternalLink } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import Header from "@/components/Header";

const NearbyStores = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStore, setSelectedStore] = useState<number | null>(null);

  const stores = [
    {
      id: 1,
      name: "Green Thumb Nursery",
      type: "Garden Center",
      address: "1234 Garden Lane, San Francisco, CA",
      distance: "0.8 mi",
      rating: 4.8,
      reviews: 234,
      hours: "Open until 6:00 PM",
      phone: "(415) 555-0123",
      specialties: ["Houseplants", "Succulents", "Garden Tools"],
    },
    {
      id: 2,
      name: "Botanical Paradise",
      type: "Plant Nursery",
      address: "567 Bloom Street, San Francisco, CA",
      distance: "1.2 mi",
      rating: 4.6,
      reviews: 189,
      hours: "Open until 7:00 PM",
      phone: "(415) 555-0456",
      specialties: ["Tropical Plants", "Orchids", "Fertilizers"],
    },
    {
      id: 3,
      name: "Urban Jungle",
      type: "Plant Shop",
      address: "890 Plant Avenue, San Francisco, CA",
      distance: "1.8 mi",
      rating: 4.9,
      reviews: 312,
      hours: "Open until 8:00 PM",
      phone: "(415) 555-0789",
      specialties: ["Rare Plants", "Planters", "Plant Care"],
    },
    {
      id: 4,
      name: "The Plant Corner",
      type: "Boutique Nursery",
      address: "321 Leaf Road, San Francisco, CA",
      distance: "2.4 mi",
      rating: 4.5,
      reviews: 156,
      hours: "Open until 5:00 PM",
      phone: "(415) 555-0321",
      specialties: ["Indoor Plants", "Terrariums", "Workshops"],
    },
  ];

  const filteredStores = stores.filter(store =>
    store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    store.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen pb-10">
      <AnimatedBackground />
      <Header showBack title="Nearby Stores" />

      <main className="container px-4 pt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-space text-3xl font-bold text-foreground mb-2">
            Find <span className="gradient-text">Plant Stores</span>
          </h1>
          <p className="text-muted-foreground">
            Discover nurseries and garden centers near you
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative mb-6"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search stores or plants..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-muted/50 border border-glass-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Map Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card overflow-hidden h-[400px] lg:h-full min-h-[400px] relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-primary mx-auto mb-4 animate-pulse" />
                <p className="text-muted-foreground">Map View</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Integration coming soon
                </p>
              </div>

              {/* Simulated map pins */}
              {stores.slice(0, 4).map((store, index) => (
                <motion.div
                  key={store.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className={`absolute cursor-pointer ${
                    selectedStore === store.id ? "z-10" : ""
                  }`}
                  style={{
                    top: `${20 + index * 20}%`,
                    left: `${30 + index * 15}%`,
                  }}
                  onClick={() => setSelectedStore(store.id)}
                >
                  <div className={`
                    p-2 rounded-full transition-all
                    ${selectedStore === store.id 
                      ? "bg-primary shadow-glow-md scale-125" 
                      : "bg-muted hover:bg-primary/50"
                    }
                  `}>
                    <MapPin className={`h-5 w-5 ${
                      selectedStore === store.id ? "text-primary-foreground" : "text-foreground"
                    }`} />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Store List */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            {filteredStores.map((store, index) => (
              <motion.div
                key={store.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                onClick={() => setSelectedStore(store.id)}
                className={`glass-card p-5 cursor-pointer transition-all duration-300 ${
                  selectedStore === store.id 
                    ? "border-primary shadow-glow-sm" 
                    : "hover:border-primary/30"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-space text-lg font-semibold text-foreground">
                      {store.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{store.type}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-primary">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="font-semibold">{store.rating}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{store.reviews} reviews</p>
                  </div>
                </div>

                <div className="space-y-2 text-sm mb-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4 text-primary shrink-0" />
                    <span>{store.address}</span>
                    <span className="ml-auto text-primary font-medium">{store.distance}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4 text-secondary shrink-0" />
                    <span>{store.hours}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-4 w-4 text-accent shrink-0" />
                    <span>{store.phone}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {store.specialties.map((specialty) => (
                    <span 
                      key={specialty}
                      className="px-2 py-1 rounded-full bg-muted text-xs text-muted-foreground"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 btn-glass flex items-center justify-center gap-2 py-2 text-sm"
                  >
                    <Navigation className="h-4 w-4" />
                    Directions
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 btn-neon flex items-center justify-center gap-2 py-2 text-sm"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Visit Store
                  </motion.button>
                </div>
              </motion.div>
            ))}

            {filteredStores.length === 0 && (
              <div className="text-center py-10">
                <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No stores found</p>
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default NearbyStores;
