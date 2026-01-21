import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Leaf, Shield, Zap, Camera, Users, BookOpen, Sparkles } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import Header from "@/components/Header";

const Index = () => {
  const features = [
    {
      icon: Camera,
      title: "AI Disease Detection",
      description: "Snap a photo and get instant diagnosis with treatment recommendations",
      color: "primary" as const,
    },
    {
      icon: BookOpen,
      title: "Plant Library",
      description: "Access comprehensive care guides for thousands of plant species",
      color: "secondary" as const,
    },
    {
      icon: Shield,
      title: "Smart Protection",
      description: "Proactive pest alerts and prevention strategies for your garden",
      color: "accent" as const,
    },
    {
      icon: Users,
      title: "Expert Community",
      description: "Connect with botanists and plant enthusiasts worldwide",
      color: "primary" as const,
    },
  ];

  const benefits = [
    { number: "50K+", label: "Plants Identified" },
    { number: "98%", label: "Detection Accuracy" },
    { number: "10K+", label: "Happy Gardeners" },
    { number: "24/7", label: "AI Support" },
  ];

  const testimonials = [
    {
      quote: "PlantVision saved my entire rose garden from a fungal infection I would have never spotted.",
      author: "Sarah M.",
      role: "Home Gardener",
    },
    {
      quote: "The AI detection is incredibly accurate. It's like having a plant doctor in my pocket.",
      author: "Dr. James L.",
      role: "Botanist",
    },
    {
      quote: "Best plant care app I've ever used. The community features are amazing!",
      author: "Maria G.",
      role: "Plant Enthusiast",
    },
  ];

  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      <Header />

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8"
            >
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">AI-Powered Plant Care</span>
            </motion.div>

            <h1 className="font-space text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Keep Your Plants{" "}
              <span className="gradient-text text-glow">Thriving</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Detect diseases instantly, get personalized care recommendations, and join a community of plant lovers. Your garden deserves the best.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard">
                <motion.button
                  className="btn-neon text-lg px-8 py-4 flex items-center gap-2 w-full sm:w-auto justify-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Start Free
                  <ArrowRight className="h-5 w-5" />
                </motion.button>
              </Link>
              <Link to="/library">
                <motion.button
                  className="btn-glass text-lg px-8 py-4 w-full sm:w-auto"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Explore Plants
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Floating plant visual */}
          <motion.div
            className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 opacity-20 pointer-events-none hidden lg:block"
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          >
            <Leaf className="h-64 w-64 text-primary" />
          </motion.div>
          
          <motion.div
            className="absolute top-1/3 right-0 translate-x-1/2 opacity-20 pointer-events-none hidden lg:block"
            animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 6, repeat: Infinity, delay: 1 }}
          >
            <Leaf className="h-48 w-48 text-secondary" />
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 relative">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-space text-4xl font-bold mb-4">
              Everything You Need for{" "}
              <span className="gradient-text">Healthy Plants</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Powerful features designed to help your garden thrive
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="glass-card p-6 group cursor-pointer transition-all duration-500 hover:border-primary/50 hover:shadow-glow-md"
              >
                <div className={`
                  w-14 h-14 rounded-2xl flex items-center justify-center mb-5
                  ${feature.color === "primary" ? "bg-primary/10 text-primary" : 
                    feature.color === "secondary" ? "bg-secondary/10 text-secondary" : 
                    "bg-accent/10 text-accent"}
                  transition-transform duration-300 group-hover:scale-110
                `}>
                  <feature.icon className="h-7 w-7" />
                </div>
                <h3 className="font-space text-lg font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits/Stats */}
      <section className="py-24 relative">
        <div className="container px-4">
          <div className="glass-card p-10 lg:p-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5" />
            
            <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl lg:text-5xl font-space font-bold gradient-text text-glow mb-2">
                    {benefit.number}
                  </div>
                  <div className="text-muted-foreground font-medium">
                    {benefit.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 relative">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-space text-4xl font-bold mb-4">
              Loved by <span className="gradient-text">Gardeners</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              See what our community has to say
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="glass-card p-6"
              >
                <p className="text-foreground mb-6 leading-relaxed italic">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-semibold">
                    {testimonial.author[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card p-10 lg:p-16 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/5 to-accent/10" />
            
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 right-10 opacity-10"
              >
                <Leaf className="h-32 w-32 text-primary" />
              </motion.div>

              <h2 className="font-space text-4xl lg:text-5xl font-bold mb-6">
                Ready to Transform Your{" "}
                <span className="gradient-text text-glow">Garden</span>?
              </h2>
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                Join thousands of plant lovers using AI to grow healthier, more beautiful gardens.
              </p>
              <Link to="/auth">
                <motion.button
                  className="btn-neon text-lg px-10 py-4"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get Started Free
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-glass-border">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <Leaf className="h-6 w-6 text-primary" />
              <span className="font-space text-lg font-bold gradient-text">PlantVision</span>
            </div>
            
            <nav className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <Link to="/library" className="hover:text-foreground transition-colors">Library</Link>
              <Link to="/detect" className="hover:text-foreground transition-colors">Detection</Link>
              <Link to="/community" className="hover:text-foreground transition-colors">Community</Link>
              <Link to="/stores" className="hover:text-foreground transition-colors">Stores</Link>
            </nav>

            <p className="text-sm text-muted-foreground">
              © 2024 PlantVision. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
