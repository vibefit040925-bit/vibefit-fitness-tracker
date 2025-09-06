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

// Helper function to get logo based on theme and resolution
export const getLogo = (theme = 'transparent', resolution = '1x') => {
  if (theme === 'transparent') {
    return IMAGES.logo.transparent;
  }
  
  const logoKey = `${theme}Logo${resolution}`;
  return IMAGES.logo[logoKey] || IMAGES.logo.transparent;
};