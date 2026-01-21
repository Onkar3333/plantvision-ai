import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: string;
  positive?: boolean;
  delay?: number;
}

const StatCard = ({ 
  title, 
  value, 
  icon: Icon, 
  change, 
  positive = true,
  delay = 0 
}: StatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="glass-card p-5"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-muted-foreground font-medium">{title}</span>
        <div className="p-2 rounded-xl bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </div>
      
      <div className="flex items-end gap-2">
        <span className="text-3xl font-space font-bold text-foreground">
          {value}
        </span>
        {change && (
          <span className={`text-sm font-medium mb-1 ${positive ? "text-primary" : "text-destructive"}`}>
            {positive ? "↑" : "↓"} {change}
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default StatCard;
