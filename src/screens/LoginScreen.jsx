import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Mail, Lock, Chrome } from 'lucide-react';
import Layout from '../components/Layout';
import Logo from '../components/Logo';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { COLORS } from '../utils/constants';

const LoginScreen = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      console.log('Login data:', data);
      // Navigate to dashboard or home screen
      alert('Login successful! (Demo)');
    }, 2000);
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    // Simulate Google OAuth
    setTimeout(() => {
      setIsGoogleLoading(false);
      console.log('Google login');
      alert('Google login successful! (Demo)');
    }, 1500);
  };

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <Layout background="gradient">
      <motion.div 
        className="flex-1 flex flex-col px-6 py-8"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        {/* Header */}
        <motion.div 
          className="flex justify-center mb-8"
          variants={itemVariants}
        >
          <Logo size="medium" />
        </motion.div>

        {/* Welcome Text */}
        <motion.div 
          className="text-center mb-8"
          variants={itemVariants}
        >
          <h1 
            className="text-3xl font-bold mb-2"
            style={{ color: COLORS.text }}
          >
            Welcome Back!
          </h1>
          <p 
            className="text-base font-regular opacity-70"
            style={{ color: COLORS.text }}
          >
            Sign in to continue your fitness journey
          </p>
        </motion.div>

        {/* Login Form */}
        <motion.div 
          className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full"
          variants={itemVariants}
        >
          <Card animated={true} padding="lg">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <Input
                label="Email"
                type="email"
                placeholder="Enter your email"
                icon={<Mail size={20} />}
                error={errors.email?.message}
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
              />

              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                icon={<Lock size={20} />}
                error={errors.password?.message}
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters'
                  }
                })}
              />

              <div className="space-y-4">
                <Button
                  type="submit"
                  variant="primary"
                  size="large"
                  loading={isLoading}
                  disabled={isLoading || isGoogleLoading}
                >
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div 
                      className="w-full border-t"
                      style={{ borderColor: COLORS.lightGray }}
                    />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span 
                      className="px-4 text-sm font-medium"
                      style={{ 
                        backgroundColor: COLORS.white,
                        color: COLORS.text 
                      }}
                    >
                      Or continue with
                    </span>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="google"
                  size="large"
                  loading={isGoogleLoading}
                  disabled={isLoading || isGoogleLoading}
                  onClick={handleGoogleLogin}
                  icon={<Chrome size={20} />}
                >
                  {isGoogleLoading ? 'Connecting...' : 'Continue with Google'}
                </Button>
              </div>
            </form>
          </Card>

          {/* Sign Up Link */}
          <motion.div 
            className="text-center mt-6"
            variants={itemVariants}
          >
            <p 
              className="text-sm font-regular"
              style={{ color: COLORS.text }}
            >
              Don't have an account?{' '}
              <Link 
                to="/register"
                className="font-medium hover:underline transition-all duration-200"
                style={{ color: COLORS.secondary }}
              >
                Sign up
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </Layout>
  );
};

export default LoginScreen;