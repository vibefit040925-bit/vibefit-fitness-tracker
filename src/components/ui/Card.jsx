import { motion } from 'framer-motion';
import { COLORS } from '../../utils/constants';

const Card = ({ 
  children, 
  className = '', 
  padding = 'lg',
  shadow = 'medium',
  animated = false,
  ...props 
}) => {
  const paddings = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  };

  const shadows = {
    none: 'shadow-none',
    small: 'shadow-sm',
    medium: 'shadow-lg',
    large: 'shadow-2xl'
  };

  const cardVariants = {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const CardComponent = animated ? motion.div : 'div';

  return (
    <CardComponent
      className={`
        rounded-2xl border border-gray-100
        ${paddings[padding]}
        ${shadows[shadow]}
        ${className}
      `}
      style={{
        backgroundColor: COLORS.white,
        backdropFilter: 'blur(10px)',
      }}
      variants={animated ? cardVariants : undefined}
      initial={animated ? "initial" : undefined}
      animate={animated ? "animate" : undefined}
      {...props}
    >
      {children}
    </CardComponent>
  );
};

export default Card;