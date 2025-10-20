import { motion } from 'framer-motion';
import Butterfly from './Butterfly';
import Flower from './Flower';

const AnimatedBackground = () => {
  // Floating particles with different sizes and speeds (reduced for performance)
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2, // 2-6px
    x: Math.random() * 100, // 0-100%
    y: Math.random() * 100, // 0-100%
    duration: Math.random() * 20 + 15, // 15-35 seconds
    delay: Math.random() * 5, // 0-5 seconds delay
  }));

  // Floating hearts with different sizes and speeds (reduced for performance)
  const hearts = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    size: Math.random() * 8 + 12, // 12-20px
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 25 + 20, // 20-45 seconds
    delay: Math.random() * 8,
  }));

  // Generate many butterflies with random properties
  const butterflies = Array.from({ length: 25 }, (_, i) => {
    const colors = ['rose', 'pink', 'orange', 'yellow', 'purple'];
    const paths = ['gentle', 'wave', 'spiral', 'zigzag', 'swoop', 'dance', 'flutter'];
    
    return {
      id: i + 1,
      size: Math.random() * 12 + 12, // 12-24px
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 20 + 20, // 20-40 seconds
      delay: Math.random() * 15, // 0-15 seconds delay
      color: colors[Math.floor(Math.random() * colors.length)],
      path: paths[Math.floor(Math.random() * paths.length)]
    };
  });

  // Generate beautiful flowers
  const flowers = Array.from({ length: 22 }, (_, i) => {
    const flowerTypes = ['rose', 'tulip', 'daisy', 'cherry', 'sunflower', 'lily'];
    const colors = ['rose', 'pink', 'orange', 'yellow', 'purple', 'white', 'red'];
    
    return {
      id: i + 1,
      size: Math.random() * 20 + 20, // 20-40px
      x: Math.random() * 100,
      y: Math.random() * 100,
      type: flowerTypes[Math.floor(Math.random() * flowerTypes.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 10, // 0-10 seconds delay
    };
  });

  // Floating petals for extra beauty
  const petals = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    size: Math.random() * 6 + 4, // 4-10px
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 15 + 10, // 10-25 seconds
    delay: Math.random() * 8,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {/* Gradient overlay for subtle depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-rose-50/70 via-pink-50/40 to-rose-100/70" />
      {/* Soft color blobs to enrich background */}
      <div className="absolute top-0 -right-10 w-72 h-72 md:w-96 md:h-96 bg-rose-200/25 rounded-full blur-3xl" />
      <div className="absolute -bottom-10 -left-10 w-72 h-72 md:w-96 md:h-96 bg-pink-200/25 rounded-full blur-3xl" />
      
      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={`particle-${particle.id}`}
          className="absolute rounded-full bg-gradient-to-r from-rose-200/40 to-pink-200/40"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Floating hearts */}
      {hearts.map((heart) => (
        <motion.div
          key={`heart-${heart.id}`}
          className="absolute text-rose-200/30"
          style={{
            fontSize: `${heart.size}px`,
            left: `${heart.x}%`,
            top: `${heart.y}%`,
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, Math.random() * 30 - 15, 0],
            rotate: [0, Math.random() * 20 - 10, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          ♥
        </motion.div>
      ))}

      {/* Flying butterflies */}
      {butterflies.map((butterfly) => (
        <Butterfly
          key={`butterfly-${butterfly.id}`}
          size={butterfly.size}
          x={butterfly.x}
          y={butterfly.y}
          duration={butterfly.duration}
          delay={butterfly.delay}
          color={butterfly.color}
          path={butterfly.path}
        />
      ))}

      {/* Beautiful flowers */}
      {flowers.map((flower) => (
        <Flower
          key={`flower-${flower.id}`}
          size={flower.size}
          x={flower.x}
          y={flower.y}
          type={flower.type}
          color={flower.color}
          delay={flower.delay}
        />
      ))}

      {/* Corner floral clusters to support butterflies */}
      <div className="absolute inset-0">
        {/* Bottom-left cluster */}
        <div className="absolute bottom-4 left-3">
          <Flower size={34} x={0} y={0} type="rose" color="rose" delay={0.2} />
          <Flower size={26} x={6} y={6} type="tulip" color="pink" delay={0.6} />
          <Flower size={22} x={12} y={2} type="daisy" color="yellow" delay={1.0} />
        </div>
        {/* Top-right cluster */}
        <div className="absolute top-6 right-4">
          <Flower size={28} x={0} y={0} type="cherry" color="pink" delay={0.4} />
          <Flower size={22} x={-8} y={10} type="lily" color="purple" delay={0.8} />
          <Flower size={20} x={-12} y={-6} type="daisy" color="white" delay={1.2} />
        </div>
      </div>

      {/* Floating petals */}
      {petals.map((petal) => (
        <motion.div
          key={`petal-${petal.id}`}
          className="absolute text-rose-200/40 animate-petal-fall"
          style={{
            fontSize: `${petal.size}px`,
            left: `${petal.x}%`,
            top: `${petal.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            rotate: [0, 180, 360],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          ✿
        </motion.div>
      ))}

      {/* Subtle wave animation */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-rose-100/30 to-transparent"
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Soft light rays */}
      <motion.div
        className="absolute top-0 right-0 w-64 h-64 bg-gradient-radial from-rose-200/20 to-transparent rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.35, 0.55, 0.35],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-1/4 left-0 w-48 h-48 bg-gradient-radial from-pink-200/20 to-transparent rounded-full"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
