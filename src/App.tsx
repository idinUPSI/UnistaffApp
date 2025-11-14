import React, { useState, useEffect } from 'react';
import { LOGO_BASE64 } from './constants';

// Linear Progress Bar component for a more native loading feel.
const LinearProgressBar: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  if (!isLoading) {
    return null;
  }

  return (
    <div 
        className="fixed top-0 left-0 w-full h-1 bg-blue-100 z-50 overflow-hidden"
        role="progressbar"
        aria-busy="true"
        aria-valuetext="Memuatkan..."
    >
      <div className="animate-progress w-full h-full bg-gradient-to-r from-blue-500 to-blue-800"></div>
    </div>
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
      <LinearProgressBar isLoading={isLoading} />

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
        // The iframe is now always visible unless there's an error.
        // The loading indicator overlays it for a more native feel.
        className={`w-full h-full border-none ${loadError ? 'hidden' : ''}`}
        onLoad={handleLoad}
        onError={handleIframeError}
      />
    </main>
  );
};

export default App;
