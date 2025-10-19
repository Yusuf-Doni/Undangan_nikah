import { motion } from 'framer-motion';

const Flower = ({ 
  size = 30, 
  x = 0, 
  y = 0, 
  type = 'rose',
  color = 'rose',
  delay = 0
}) => {
  // Different flower types
  const flowerTypes = {
    rose: {
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          {/* Rose petals */}
          <path d="M12 2C8 6 4 8 4 12C4 16 8 20 12 20C16 20 20 16 20 12C20 8 16 6 12 2Z" />
          <path d="M12 4C9 7 6 9 6 12C6 15 9 18 12 18C15 18 18 15 18 12C18 9 15 7 12 4Z" />
          <path d="M12 6C10 8 8 10 8 12C8 14 10 16 12 16C14 16 16 14 16 12C16 10 14 8 12 6Z" />
          {/* Rose center */}
          <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.8" />
        </svg>
      )
    },
    tulip: {
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          {/* Tulip petals */}
          <path d="M12 2C10 4 8 6 8 10C8 14 10 16 12 16C14 16 16 14 16 10C16 6 14 4 12 2Z" />
          <path d="M12 4C11 6 10 8 10 10C10 12 11 14 12 14C13 14 14 12 14 10C14 8 13 6 12 4Z" />
          {/* Tulip stem */}
          <path d="M12 16L12 22" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
      )
    },
    daisy: {
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          {/* Daisy petals */}
          <path d="M12 2L14 8L20 8L15 12L17 18L12 15L7 18L9 12L4 8L10 8L12 2Z" />
          <path d="M12 2L10 8L4 8L9 12L7 18L12 15L17 18L15 12L20 8L14 8L12 2Z" />
          {/* Daisy center */}
          <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.9" />
        </svg>
      )
    },
    cherry: {
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          {/* Cherry blossom petals */}
          <path d="M12 2C10 4 8 6 8 10C8 12 9 13 10 14C11 15 12 15 12 15C12 15 13 15 14 14C15 13 16 12 16 10C16 6 14 4 12 2Z" />
          <path d="M12 4C11 5 10 6 10 8C10 9 11 10 12 10C13 10 14 9 14 8C14 6 13 5 12 4Z" />
          {/* Cherry blossom center */}
          <circle cx="12" cy="10" r="1.5" fill="currentColor" opacity="0.8" />
        </svg>
      )
    },
    sunflower: {
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          {/* Sunflower petals */}
          <path d="M12 2L13 6L17 6L14 9L15 13L12 11L9 13L10 9L7 6L11 6L12 2Z" />
          <path d="M12 2L11 6L7 6L10 9L9 13L12 11L15 13L14 9L17 6L13 6L12 2Z" />
          {/* Sunflower center */}
          <circle cx="12" cy="12" r="4" fill="currentColor" opacity="0.9" />
        </svg>
      )
    },
    lily: {
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          {/* Lily petals */}
          <path d="M12 2C10 4 8 6 8 10C8 12 9 13 10 14C11 15 12 15 12 15C12 15 13 15 14 14C15 13 16 12 16 10C16 6 14 4 12 2Z" />
          <path d="M12 4C11 5 10 6 10 8C10 9 11 10 12 10C13 10 14 9 14 8C14 6 13 5 12 4Z" />
          {/* Lily center */}
          <circle cx="12" cy="10" r="1.5" fill="currentColor" opacity="0.8" />
        </svg>
      )
    }
  };

  // Color variations for flowers
  const colorClasses = {
    rose: 'text-rose-300/70',
    pink: 'text-pink-300/70',
    orange: 'text-orange-300/70',
    yellow: 'text-yellow-300/70',
    purple: 'text-purple-300/70',
    white: 'text-white/60',
    red: 'text-red-300/70'
  };

  const selectedFlower = flowerTypes[type] || flowerTypes.rose;

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        fontSize: `${size}px`,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 0.8, 0.6, 0.8, 0.6],
        scale: [0, 1, 1.1, 1, 1.1],
        rotate: [0, 5, -5, 3, -3, 0],
      }}
      transition={{
        duration: 8,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <motion.div
        className={`${colorClasses[color]} drop-shadow-sm animate-flower-sway`}
        animate={{
          y: [0, -10, 0],
          rotate: [0, 2, -2, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {selectedFlower.svg}
      </motion.div>
    </motion.div>
  );
};

export default Flower;
