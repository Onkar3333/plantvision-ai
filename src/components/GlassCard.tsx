import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: "primary" | "secondary" | "accent" | "none";
  delay?: number;
}

const GlassCard = ({ 
  children, 
  className = "", 
  hover = true,
  glow = "none",
  delay = 0 
}: GlassCardProps) => {
  const glowStyles = {
    primary: "hover:shadow-glow-md hover:border-primary/50",
    secondary: "hover:shadow-glow-secondary hover:border-secondary/50",
    accent: "hover:shadow-glow-accent hover:border-accent/50",
    none: "",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      className={`
        glass-card p-6 
        ${hover ? "transition-all duration-300" : ""} 
        ${glowStyles[glow]}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
