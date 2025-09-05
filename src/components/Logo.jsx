import { motion } from 'framer-motion';
import { COLORS } from '../utils/constants';

const Logo = ({ size = 'large', animated = false }) => {
  const sizes = {
    small: { width: 32, height: 32, fontSize: '16px' },
    medium: { width: 48, height: 48, fontSize: '20px' },
    large: { width: 80, height: 80, fontSize: '32px' },
  };

  const currentSize = sizes[size];

  const logoVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.2
      }
    }
  };

  const infinityVariants = {
    initial: { pathLength: 0 },
    animate: { 
      pathLength: 1,
      transition: {
        duration: 2,
        ease: "easeInOut",
        delay: 0.8
      }
    }
  };

  return (
    <motion.div 
      className="flex flex-col items-center"
      variants={animated ? logoVariants : {}}
      initial={animated ? "initial" : ""}
      animate={animated ? "animate" : ""}
    >
      {/* Logo Icon */}
      <div 
        className="relative flex items-center justify-center rounded-full"
        style={{
          width: currentSize.width,
          height: currentSize.height,
          background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.flowGreen} 100%)`,
          boxShadow: `0 8px 32px rgba(74, 229, 74, 0.3)`
        }}
      >
        {/* Human Figure */}
        <svg 
          width={currentSize.width * 0.5} 
          height={currentSize.height * 0.5} 
          viewBox="0 0 24 24" 
          fill="none"
        >
          {/* Head */}
          <circle cx="12" cy="6" r="2" fill={COLORS.white} />
          {/* Body */}
          <path 
            d="M12 10v6M9 13l3-1 3 1M9 19l3-1 3 1" 
            stroke={COLORS.white} 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          {/* Infinity Symbol Overlay */}
          <motion.path
            d="M8 12c0-1.5 1-2 2-2s2 .5 2 2-1 2-2 2-2-.5-2-2zm6 0c0-1.5 1-2 2-2s2 .5 2 2-1 2-2 2-2-.5-2-2z"
            stroke={COLORS.secondary}
            strokeWidth="1.5"
            fill="none"
            variants={animated ? infinityVariants : {}}
            initial={animated ? "initial" : ""}
            animate={animated ? "animate" : ""}
          />
        </svg>
      </div>

      {/* Logo Text */}
      {size === 'large' && (
        <motion.div 
          className="mt-4 text-center"
          initial={animated ? { opacity: 0, y: 20 } : {}}
          animate={animated ? { opacity: 1, y: 0 } : {}}
          transition={animated ? { delay: 1.2, duration: 0.5 } : {}}
        >
          <h1 
            className="text-extrabold tracking-tight"
            style={{ 
              fontSize: currentSize.fontSize,
              color: COLORS.text,
              fontFamily: 'Montserrat, sans-serif'
            }}
          >
            VibeFit
          </h1>
          <motion.p 
            className="text-medium mt-1"
            style={{ 
              fontSize: '14px',
              color: COLORS.secondary,
              letterSpacing: '0.5px'
            }}
            initial={animated ? { opacity: 0 } : {}}
            animate={animated ? { opacity: 1 } : {}}
            transition={animated ? { delay: 1.5, duration: 0.5 } : {}}
          >
            Feel the Progress. Live the Vibe.
          </motion.p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Logo;