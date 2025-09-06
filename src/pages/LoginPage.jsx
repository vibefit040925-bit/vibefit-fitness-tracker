import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, Chrome } from 'lucide-react';
import Logo from '../components/Logo';
import InputField from '../components/InputField';
import { getLogoForContext } from '../assets/images';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleInputChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert('Login successful! (Demo)');
      console.log('Login data:', formData);
    }, 2000);
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    
    // Simulate Google OAuth
    setTimeout(() => {
      setIsGoogleLoading(false);
      alert('Google login successful! (Demo)');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-8 px-6">
      <div className="max-w-md mx-auto w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <Logo size="large" />
        </div>

        {/* Welcome Text */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome Back!
          </h2>
          <p className="text-gray-600">
            Sign in to continue your fitness journey
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange('email')}
              error={errors.email}
              icon={Mail}
            />

            <InputField
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange('password')}
              error={errors.password}
              icon={Lock}
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-secondary hover:text-primary transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading || isGoogleLoading}
              className="btn btn-primary w-full"
            >
              {isLoading ? (
                <>
                  <div className="spinner" />
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-medium">
                  Or continue with
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isLoading || isGoogleLoading}
              className="btn btn-secondary w-full"
            >
              {isGoogleLoading ? (
                <>
                  <div className="spinner" style={{ borderTopColor: '#4AE54A' }} />
                  Connecting...
                </>
              ) : (
                <>
                  <Chrome size={20} />
                  Continue with Google
                </>
              )}
            </button>
          </form>
        </div>

        {/* Sign Up Link */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="font-semibold text-secondary hover:text-primary transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;