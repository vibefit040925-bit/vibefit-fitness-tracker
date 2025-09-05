import { forwardRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { COLORS } from '../../utils/constants';

const Input = forwardRef(({ 
  label,
  type = 'text',
  placeholder,
  error,
  icon,
  className = '',
  ...props 
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label 
          className="block text-sm font-medium mb-2"
          style={{ color: COLORS.text }}
        >
          {label}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
            style={{ color: isFocused ? COLORS.primary : COLORS.text }}
          >
            {icon}
          </div>
        )}
        
        <motion.input
          ref={ref}
          type={inputType}
          placeholder={placeholder}
          className={`
            w-full h-12 px-4 rounded-xl border-2 transition-all duration-200
            text-base font-regular placeholder-gray-400
            focus:outline-none focus:ring-0
            ${icon ? 'pl-12' : 'pl-4'}
            ${isPassword ? 'pr-12' : 'pr-4'}
            ${error ? 'border-red-400' : 'border-gray-200'}
          `}
          style={{
            backgroundColor: COLORS.white,
            color: COLORS.text,
            borderColor: error ? COLORS.error : (isFocused ? COLORS.primary : '#E5E7EB'),
            boxShadow: isFocused ? `0 0 0 3px rgba(74, 229, 74, 0.1)` : 'none'
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          animate={{
            scale: isFocused ? 1.01 : 1,
          }}
          transition={{ duration: 0.2 }}
          {...props}
        />
        
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-md hover:bg-gray-100 transition-colors"
            style={{ color: COLORS.text }}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
      
      {error && (
        <motion.p 
          className="mt-2 text-sm font-medium"
          style={{ color: COLORS.error }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {error}
        </motion.p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;