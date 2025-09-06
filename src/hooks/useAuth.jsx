import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('vibefit_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const signIn = async (email, password) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser = {
          id: '1',
          email,
          name: 'Demo User',
          avatar: null,
        };
        setUser(mockUser);
        localStorage.setItem('vibefit_user', JSON.stringify(mockUser));
        resolve({ user: mockUser, error: null });
      }, 1000);
    });
  };

  const signUp = async (email, password, fullName) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser = {
          id: '1',
          email,
          name: fullName,
          avatar: null,
        };
        setUser(mockUser);
        localStorage.setItem('vibefit_user', JSON.stringify(mockUser));
        resolve({ user: mockUser, error: null });
      }, 1000);
    });
  };

  const signOut = async () => {
    setUser(null);
    localStorage.removeItem('vibefit_user');
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};