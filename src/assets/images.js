// Image assets for VibeFit application
export const IMAGES = {
  logo: {
    transparent: '/src/assets/images/VibeFit_transparent-.png',
    blackLogo1x: '/src/assets/images/VibeFit-logo-Black-1x.png',
    blackLogo2x: '/src/assets/images/VibeFit-logo-Black-2x.png',
    whiteLogo1x: '/src/assets/images/VibeFit-logo-White-1x.png',
    whiteLogo2x: '/src/assets/images/VibeFit-logo-White-2x.png',
  }
};

// Helper function to get favicon
export const getFavicon = () => IMAGES.logo.transparent;
// Helper function to get logo based on theme and resolution
// Helper function to get logo for different contexts
export const getLogoForContext = (context = 'default') => {
  switch (context) {
    case 'navbar':
      return IMAGES.logo.transparent;
    case 'auth':
      return IMAGES.logo.transparent;
    case 'dark':
      return IMAGES.logo.whiteLogo1x;
    case 'light':
      return IMAGES.logo.blackLogo1x;
    default:
      return IMAGES.logo.transparent;
  }
};
export const getLogo = (theme = 'transparent', resolution = '1x') => {
  if (theme === 'transparent') {
    return IMAGES.logo.transparent;
  }
  
  const logoKey = `${theme}Logo${resolution}`;
  return IMAGES.logo[logoKey] || IMAGES.logo.transparent;
};