import { motion } from "framer-motion";

const AnimatedBackground = () => {
  const orbs = [
    { size: 400, x: "10%", y: "20%", color: "primary", delay: 0 },
    { size: 300, x: "80%", y: "60%", color: "secondary", delay: 1 },
    { size: 250, x: "50%", y: "80%", color: "accent", delay: 2 },
    { size: 200, x: "70%", y: "10%", color: "primary", delay: 0.5 },
    { size: 350, x: "20%", y: "70%", color: "secondary", delay: 1.5 },
  ];

  const getOrbColor = (color: string) => {
    switch (color) {
      case "primary":
        return "from-primary/20 to-primary/5";
      case "secondary":
        return "from-secondary/20 to-secondary/5";
      case "accent":
        return "from-accent/20 to-accent/5";
      default:
        return "from-primary/20 to-primary/5";
    }
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-dark" />
      
      {/* Animated orbs */}
      {orbs.map((orb, index) => (
        <motion.div
          key={index}
          className={`absolute rounded-full bg-gradient-radial ${getOrbColor(orb.color)} blur-3xl`}
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -40, 20, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 15 + index * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.delay,
          }}
        />
      ))}

      {/* Grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(160 84% 45%) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(160 84% 45%) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Noise texture */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
