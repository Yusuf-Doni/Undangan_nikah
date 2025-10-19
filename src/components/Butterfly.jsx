import { motion } from 'framer-motion';

const Butterfly = ({ 
  size = 20, 
  x = 0, 
  y = 0, 
  duration = 20, 
  delay = 0,
  color = 'rose',
  path = 'gentle'
}) => {
  // Different flight paths for variety
  const flightPaths = {
    gentle: [
      { x: 0, y: 0 },
      { x: 20, y: -30 },
      { x: 40, y: -10 },
      { x: 60, y: -40 },
      { x: 80, y: -20 },
      { x: 100, y: -50 }
    ],
    wave: [
      { x: 0, y: 0 },
      { x: 15, y: -20 },
      { x: 30, y: 10 },
      { x: 45, y: -25 },
      { x: 60, y: 5 },
      { x: 75, y: -30 },
      { x: 90, y: -10 },
      { x: 100, y: -40 }
    ],
    spiral: [
      { x: 0, y: 0 },
      { x: 25, y: -15 },
      { x: 50, y: -30 },
      { x: 75, y: -15 },
      { x: 100, y: -30 }
    ],
    zigzag: [
      { x: 0, y: 0 },
      { x: 20, y: -20 },
      { x: 40, y: 10 },
      { x: 60, y: -25 },
      { x: 80, y: 5 },
      { x: 100, y: -35 }
    ],
    swoop: [
      { x: 0, y: 0 },
      { x: 30, y: -40 },
      { x: 60, y: -10 },
      { x: 90, y: -30 },
      { x: 100, y: -20 }
    ],
    dance: [
      { x: 0, y: 0 },
      { x: 10, y: -15 },
      { x: 25, y: -5 },
      { x: 40, y: -25 },
      { x: 55, y: -10 },
      { x: 70, y: -30 },
      { x: 85, y: -15 },
      { x: 100, y: -25 }
    ],
    flutter: [
      { x: 0, y: 0 },
      { x: 12, y: -8 },
      { x: 24, y: -20 },
      { x: 36, y: -5 },
      { x: 48, y: -25 },
      { x: 60, y: -10 },
      { x: 72, y: -30 },
      { x: 84, y: -15 },
      { x: 96, y: -35 },
      { x: 100, y: -20 }
    ]
  };

  const selectedPath = flightPaths[path] || flightPaths.gentle;

  // Color variations for butterflies
  const colorClasses = {
    rose: 'text-rose-300/60',
    pink: 'text-pink-300/60',
    orange: 'text-orange-300/60',
    yellow: 'text-yellow-300/60',
    purple: 'text-purple-300/60'
  };

  return (
    <motion.div
      className="absolute pointer-events-none butterfly-container"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        fontSize: `${size}px`,
      }}
      animate={{
        x: selectedPath.map(point => `${point.x}%`),
        y: selectedPath.map(point => `${point.y}px`),
        rotate: [0, 5, -5, 3, -3, 0],
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut",
        times: selectedPath.map((_, i) => i / (selectedPath.length - 1))
      }}
    >
      {/* Butterfly SVG */}
      <motion.div
        className={`${colorClasses[color]} drop-shadow-sm animate-butterfly-flap`}
        style={{
          transformOrigin: 'center'
        }}
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          className="drop-shadow-sm butterfly-svg"
        >
          {/* Butterfly body */}
          <path d="M12 2C12 2 8 6 8 10C8 12 10 14 12 14C14 14 16 12 16 10C16 6 12 2 12 2Z" />
          {/* Left wing */}
          <path d="M8 10C6 8 4 6 2 8C2 10 4 12 6 12C8 12 8 10 8 10Z" />
          {/* Right wing */}
          <path d="M16 10C18 8 20 6 22 8C22 10 20 12 18 12C16 12 16 10 16 10Z" />
          {/* Antennae */}
          <path d="M10 2L9 1M14 2L15 1" stroke="currentColor" strokeWidth="1" fill="none" />
        </svg>
      </motion.div>
    </motion.div>
  );
};

export default Butterfly;
