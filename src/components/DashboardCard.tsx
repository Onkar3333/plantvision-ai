import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface DashboardCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  to: string;
  color?: "primary" | "secondary" | "accent";
  delay?: number;
}

const DashboardCard = ({ 
  title, 
  description, 
  icon: Icon, 
  to, 
  color = "primary",
  delay = 0 
}: DashboardCardProps) => {
  const colorStyles = {
    primary: {
      icon: "text-primary",
      bg: "bg-primary/10",
      glow: "group-hover:shadow-glow-md",
      border: "group-hover:border-primary/50",
    },
    secondary: {
      icon: "text-secondary",
      bg: "bg-secondary/10",
      glow: "group-hover:shadow-glow-secondary",
      border: "group-hover:border-secondary/50",
    },
    accent: {
      icon: "text-accent",
      bg: "bg-accent/10",
      glow: "group-hover:shadow-glow-accent",
      border: "group-hover:border-accent/50",
    },
  };

  const styles = colorStyles[color];

  return (
    <Link to={to}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        whileHover={{ y: -8, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`
          group glass-card p-6 cursor-pointer
          transition-all duration-500
          ${styles.glow} ${styles.border}
        `}
      >
        <motion.div
          className={`
            w-14 h-14 rounded-2xl flex items-center justify-center mb-4
            ${styles.bg} ${styles.icon}
            transition-all duration-300 group-hover:scale-110
          `}
          whileHover={{ rotate: 5 }}
        >
          <Icon className="h-7 w-7" />
        </motion.div>
        
        <h3 className="font-space text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>

        <motion.div 
          className="mt-4 flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity"
          initial={{ x: -10 }}
          whileHover={{ x: 0 }}
        >
          Explore →
        </motion.div>
      </motion.div>
    </Link>
  );
};

export default DashboardCard;
