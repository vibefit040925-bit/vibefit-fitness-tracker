import { motion } from 'framer-motion';
import { COLORS, ANIMATIONS } from '../../utils/constants';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  loading = false, 
  disabled = false,
  icon = null,
  onClick,
  type = 'button',
  className = '',
  ...props 
}) => {
  const variants = {
    primary: {
      background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.flowGreen} 100%)`,
      color: COLORS.white,
      border: 'none',
      boxShadow: `0 4px 16px rgba(74, 229, 74, 0.3)`,
    },
    secondary: {
      background: COLORS.white,
      color: COLORS.text,
      border: `2px solid ${COLORS.lightGray}`,
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    },
    google: {
      background: COLORS.white,
      color: COLORS.text,
      border: `2px solid ${COLORS.lightGray}`,
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    },
    ghost: {
      background: 'transparent',
      color: COLORS.secondary,
      border: 'none',
      boxShadow: 'none',
    }
  };

  const sizes = {
    small: {
      height: '40px',
      padding: '0 16px',
      fontSize: '14px',
      borderRadius: '8px',
    },
    medium: {
      height: '48px',
      padding: '0 24px',
      fontSize: '16px',
      borderRadius: '12px',
    },
    large: {
      height: '56px',
      padding: '0 32px',
      fontSize: '18px',
      borderRadius: '16px',
    }
  };

  const currentVariant = variants[variant];
  const currentSize = sizes[size];

  const buttonVariants = {
    initial: { scale: 1 },
    tap: { scale: 0.95 },
    hover: { scale: 1.02 }
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        relative flex items-center justify-center gap-2 font-medium
        transition-all duration-200 ease-in-out
        disabled:opacity-50 disabled:cursor-not-allowed
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50
        ${variant === 'primary' ? 'focus:ring-green-400' : 'focus:ring-gray-400'}
        ${className}
      `}
      style={{
        ...currentVariant,
        ...currentSize,
        width: '100%',
      }}
      variants={buttonVariants}
      initial="initial"
      whileTap={!disabled && !loading ? "tap" : "initial"}
      whileHover={!disabled && !loading ? "hover" : "initial"}
      transition={{ duration: ANIMATIONS.fast }}
      {...props}
    >
      {loading ? (
        <div className="spinner" />
      ) : (
        <>
          {icon && <span className="flex-shrink-0">{icon}</span>}
          <span>{children}</span>
        </>
      )}
    </motion.button>
  );
};

export default Button;