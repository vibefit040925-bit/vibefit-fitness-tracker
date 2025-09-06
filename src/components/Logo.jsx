const Logo = ({ size = 'large' }) => {
  const sizes = {
    small: { width: 40, height: 40 },
    medium: { width: 60, height: 60 },
    large: { width: 80, height: 80 }
  };

  const currentSize = sizes[size];

  return (
    <div className="flex flex-col items-center">
      <img 
        src="/VibeFit_transparent-.png" 
        alt="VibeFit Logo" 
        style={{
          width: currentSize.width,
          height: currentSize.height,
          objectFit: 'contain'
        }}
      />
      {size === 'large' && (
        <div className="mt-4 text-center">
          <h1 className="text-3xl font-extrabold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
            VibeFit
          </h1>
          <p className="text-sm text-gray-600 mt-1 font-medium">
            Feel the Progress. Live the Vibe.
          </p>
        </div>
      )}
    </div>
  );
};

export default Logo;