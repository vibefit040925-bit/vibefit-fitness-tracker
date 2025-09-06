import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Lock, Chrome, Check } from 'lucide-react';
import Logo from '../components/Logo';
import InputField from '../components/InputField';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

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

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!acceptTerms) {
      newErrors.terms = 'Please accept the Terms of Service';
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
      alert('Account created successfully! (Demo)');
      console.log('Signup data:', formData);
    }, 2000);
  };

  const handleGoogleSignup = async () => {
    if (!acceptTerms) {
      setErrors({ terms: 'Please accept the Terms of Service' });
      return;
    }

    setIsGoogleLoading(true);
    
    // Simulate Google OAuth
    setTimeout(() => {
      setIsGoogleLoading(false);
      alert('Google signup successful! (Demo)');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-8 px-6">
      <div className="max-w-md mx-auto w-full">
        {/* Logo */}
        <div className="text-center mb-6">
          <Logo size="medium" />
        </div>

        {/* Welcome Text */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Join VibeFit
          </h2>
          <p className="text-gray-600">
            Start your fitness transformation today
          </p>
        </div>

        {/* Signup Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <InputField
              label="Full Name"
              type="text"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleInputChange('fullName')}
              error={errors.fullName}
              icon={User}
            />

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
              placeholder="Create a password"
              value={formData.password}
              onChange={handleInputChange('password')}
              error={errors.password}
              icon={Lock}
            />

            <InputField
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleInputChange('confirmPassword')}
              error={errors.confirmPassword}
              icon={Lock}
            />

            {/* Terms Checkbox */}
            <div className="flex items-start space-x-3">
              <button
                type="button"
                onClick={() => {
                  setAcceptTerms(!acceptTerms);
                  if (errors.terms) {
                    setErrors(prev => ({ ...prev, terms: '' }));
                  }
                }}
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
              <div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  I agree to the{' '}
                  <Link 
                    to="/terms" 
                    className="font-semibold text-secondary hover:text-primary transition-colors"
                  >
                    Terms of Service
                  </Link>
                  {' '}and{' '}
                  <Link 
                    to="/privacy" 
                    className="font-semibold text-secondary hover:text-primary transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </p>
                {errors.terms && (
                  <div className="error-message mt-1">
                    {errors.terms}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <button
                type="submit"
                disabled={isLoading || isGoogleLoading}
                className="btn btn-primary w-full"
              >
                {isLoading ? (
                  <>
                    <div className="spinner" />
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
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
                onClick={handleGoogleSignup}
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
            </div>
          </form>
        </div>

        {/* Sign In Link */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-semibold text-secondary hover:text-primary transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;