import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Chrome, Check } from 'lucide-react';
import Layout from '../components/Layout';
import Logo from '../components/Logo';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { COLORS } from '../utils/constants';

const RegisterScreen = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch('password');

  const onSubmit = async (data) => {
    if (!acceptTerms) {
      alert('Please accept the Terms of Service');
      return;
    }
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      console.log('Register data:', data);
      alert('Registration successful! (Demo)');
      navigate('/login');
    }, 2000);
  };

  const handleGoogleRegister = async () => {
    if (!acceptTerms) {
      alert('Please accept the Terms of Service');
      return;
    }
    
    setIsGoogleLoading(true);
    // Simulate Google OAuth
    setTimeout(() => {
      setIsGoogleLoading(false);
      console.log('Google register');
      alert('Google registration successful! (Demo)');
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
          className="flex justify-center mb-6"
          variants={itemVariants}
        >
          <Logo size="medium" />
        </motion.div>

        {/* Welcome Text */}
        <motion.div 
          className="text-center mb-6"
          variants={itemVariants}
        >
          <h1 
            className="text-3xl font-bold mb-2"
            style={{ color: COLORS.text }}
          >
            Join VibeFit
          </h1>
          <p 
            className="text-base font-regular opacity-70"
            style={{ color: COLORS.text }}
          >
            Start your fitness transformation today
          </p>
        </motion.div>

        {/* Register Form */}
        <motion.div 
          className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full"
          variants={itemVariants}
        >
          <Card animated={true} padding="lg">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <Input
                label="Full Name"
                type="text"
                placeholder="Enter your full name"
                icon={<User size={20} />}
                error={errors.name?.message}
                {...register('name', {
                  required: 'Full name is required',
                  minLength: {
                    value: 2,
                    message: 'Name must be at least 2 characters'
                  }
                })}
              />

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
                placeholder="Create a password"
                icon={<Lock size={20} />}
                error={errors.password?.message}
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters'
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                    message: 'Password must contain uppercase, lowercase, and number'
                  }
                })}
              />

              <Input
                label="Confirm Password"
                type="password"
                placeholder="Confirm your password"
                icon={<Lock size={20} />}
                error={errors.confirmPassword?.message}
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: value =>
                    value === password || 'Passwords do not match'
                })}
              />

              {/* Terms Checkbox */}
              <div className="flex items-start space-x-3">
                <button
                  type="button"
                  onClick={() => setAcceptTerms(!acceptTerms)}
                  className={`
                    flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center
                    transition-all duration-200 mt-0.5
                    ${acceptTerms 
                      ? 'border-green-400 bg-green-400' 
                      : 'border-gray-300 bg-white hover:border-green-400'
                    }
                  `}
                >
                  {acceptTerms && <Check size={12} color="white" />}
                </button>
                <p 
                  className="text-sm font-regular leading-relaxed"
                  style={{ color: COLORS.text }}
                >
                  I agree to the{' '}
                  <a 
                    href="#" 
                    className="font-medium hover:underline"
                    style={{ color: COLORS.secondary }}
                  >
                    Terms of Service
                  </a>
                  {' '}and{' '}
                  <a 
                    href="#" 
                    className="font-medium hover:underline"
                    style={{ color: COLORS.secondary }}
                  >
                    Privacy Policy
                  </a>
                </p>
              </div>

              <div className="space-y-4 pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="large"
                  loading={isLoading}
                  disabled={isLoading || isGoogleLoading}
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
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
                  onClick={handleGoogleRegister}
                  icon={<Chrome size={20} />}
                >
                  {isGoogleLoading ? 'Connecting...' : 'Continue with Google'}
                </Button>
              </div>
            </form>
          </Card>

          {/* Sign In Link */}
          <motion.div 
            className="text-center mt-6"
            variants={itemVariants}
          >
            <p 
              className="text-sm font-regular"
              style={{ color: COLORS.text }}
            >
              Already have an account?{' '}
              <Link 
                to="/login"
                className="font-medium hover:underline transition-all duration-200"
                style={{ color: COLORS.secondary }}
              >
                Sign in
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </Layout>
  );
};

export default RegisterScreen;