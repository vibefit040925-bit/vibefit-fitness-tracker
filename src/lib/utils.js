// Date utilities
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatTime = (date) => {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatDateTime = (date) => {
  return `${formatDate(date)} at ${formatTime(date)}`;
};

// Number utilities
export const formatNumber = (num, decimals = 1) => {
  return Number(num).toFixed(decimals);
};

export const calculatePercentage = (current, target) => {
  if (target === 0) return 0;
  return Math.min((current / target) * 100, 100);
};

// Validation utilities
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 8 && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password);
};

// Color utilities
export const getProgressColor = (percentage) => {
  if (percentage >= 100) return '#10B981'; // green
  if (percentage >= 75) return '#4AE54A'; // primary green
  if (percentage >= 50) return '#F59E0B'; // yellow
  return '#EF4444'; // red
};

// Local storage utilities
export const storage = {
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },
  
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Handle storage errors silently
    }
  },
  
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch {
      // Handle storage errors silently
    }
  },
};