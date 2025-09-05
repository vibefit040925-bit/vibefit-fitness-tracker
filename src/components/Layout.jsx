import { motion } from 'framer-motion';
import { COLORS } from '../utils/constants';

const Layout = ({ children, background = 'gradient' }) => {
  const backgrounds = {
    gradient: `linear-gradient(135deg, ${COLORS.white} 0%, ${COLORS.lightGray} 100%)`,
    solid: COLORS.white,
    primary: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.flowGreen} 100%)`,
  };

  return (
    <motion.div 
      className="min-h-screen w-full flex flex-col safe-area"
      style={{
        background: backgrounds[background],
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex-1 flex flex-col">
        {children}
      </div>
    </motion.div>
  );
};

export default Layout;