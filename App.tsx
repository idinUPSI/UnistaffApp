
import React, { useState, useEffect } from 'react';
import { LOGO_BASE64 } from './constants';

// Spinner component defined in the same file to reduce file count,
// but outside the App component to prevent re-instantiation on every render.
const Spinner: React.FC = () => {
  return (
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-800"></div>
  );
};

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const portalUrl = 'https://unistaff.upsi.edu.my';

  const handleLoad = () => {
    setIsLoading(false);
    setLoadError(false);
  };
  
  const handleIframeError = () => {
    setIsLoading(false);
    setLoadError(true);
  };

  useEffect(() => {
    const goOnline = () => {
      // When connection returns, reload the app to try loading the iframe again.
      if (loadError) {
        window.location.reload();
      }
    };

    window.addEventListener('online', goOnline);

    // Initial check to see if we start offline
    if (!navigator.onLine) {
        handleIframeError();
    }

    return () => {
      window.removeEventListener('online', goOnline);
    };
  }, [loadError]);

  return (
    <main className="relative w-screen h-screen bg-white overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-white z-20 transition-opacity duration-300">
          <img src={LOGO_BASE64} alt="UPSI Logo" className="w-32 h-32 mb-6" />
          <Spinner />
          <p className="mt-6 text-lg text-gray-700 font-sans">
            Memuatkan Portal UniStaff...
          </p>
        </div>
      )}

      {loadError && (
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-white z-10 text-center p-4">
            <img src={LOGO_BASE64} alt="UPSI Logo" className="w-32 h-32 mb-6 opacity-50" />
            <h2 className="text-2xl font-bold text-gray-800">Gagal Memuatkan Portal</h2>
            <p className="mt-2 text-gray-600">
                Aplikasi memerlukan sambungan internet. Sila semak sambungan anda dan cuba lagi.
            </p>
        </div>
      )}

      <iframe
        src={portalUrl}
        title="UPSI UniStaff Portal"
        // Hide iframe if it's loading or has an error to prevent showing the browser's ugly error page
        className={`w-full h-full border-none transition-opacity duration-500 ease-in-out ${isLoading || loadError ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        onLoad={handleLoad}
        onError={handleIframeError}
      />
    </main>
  );
};

export default App;
