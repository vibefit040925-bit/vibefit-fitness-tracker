import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import Logo from '../components/Logo';
import { COLORS } from '../utils/constants';

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.3
      }
    }
  };

  const backgroundVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    }
  };

  return (
    <Layout background="primary">
      <motion.div 
        className="flex-1 flex flex-col items-center justify-center px-6 relative overflow-hidden"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        {/* Background Elements */}
        <motion.div
          className="absolute top-20 right-10 w-32 h-32 rounded-full opacity-20"
          style={{ backgroundColor: COLORS.white }}
          variants={backgroundVariants}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <motion.div
          className="absolute bottom-32 left-8 w-24 h-24 rounded-full opacity-15"
          style={{ backgroundColor: COLORS.white }}
          variants={backgroundVariants}
          animate={{
            scale: [1, 0.8, 1],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Main Content */}
        <div className="flex flex-col items-center z-10">
          <Logo size="large" animated={true} />
          
          {/* Loading Indicator */}
          <motion.div
            className="mt-12 flex space-x-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.5 }}
          >
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS.white }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: index * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* Bottom Text */}
        <motion.div
          className="absolute bottom-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.5 }}
        >
          <p 
            className="text-sm font-medium opacity-80"
            style={{ color: COLORS.white }}
          >
            Your fitness journey starts here
          </p>
        </motion.div>
      </motion.div>
    </Layout>
  );
};

export default SplashScreen;