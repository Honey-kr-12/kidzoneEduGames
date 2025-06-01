import React, { useState, useEffect } from 'react';
import { Unity, useUnityContext } from 'react-unity-webgl';

const Nodulus = () => {
  const [displayProgress, setDisplayProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const { unityProvider, loadingProgression } = useUnityContext({
    loaderUrl: '/Games/nodulus/Build/nodulus webgl build.loader.js',
    dataUrl: '/Games/nodulus/Build/nodulus webgl build.data.gz',
    frameworkUrl: '/Games/nodulus/Build/nodulus webgl build.framework.js.gz',
    codeUrl: '/Games/nodulus/Build/nodulus webgl build.wasm.gz',
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setDisplayProgress(prev => {
        if (loadingProgression > 0) return Math.round(loadingProgression * 100);
        const newVal = prev + Math.random() * 5;
        return newVal > 85 ? 85 : newVal;
      });
    }, 200);

    return () => clearInterval(timer);
  }, [loadingProgression]);

  useEffect(() => {
    if (loadingProgression === 1) {
      setIsLoaded(true);
      setDisplayProgress(100);
    }
  }, [loadingProgression]);

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      {!isLoaded && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center'
        }}>
          <div style={{
            width: '300px',
            height: '20px',
            backgroundColor: '#ddd',
            borderRadius: '10px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${displayProgress}%`,
              height: '100%',
              background: 'linear-gradient(to right, #ff9f43, #feca57)',
              transition: 'width 0.3s'
            }} />
          </div>
          <p>Loading {displayProgress}%</p>
          {displayProgress > 85 && (
            <p style={{ color: '#666' }}>Almost there! The game is preparing...</p>
          )}
        </div>
      )}
      
      <Unity
        unityProvider={unityProvider}
        style={{
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
          width: '100%',
          height: '100%',
          visibility: isLoaded ? 'visible' : 'hidden'
        }}
      />
    </div>
  );
};

export default Nodulus;