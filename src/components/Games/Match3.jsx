import React, { useState, useEffect } from 'react';
import { Unity, useUnityContext } from 'react-unity-webgl';

const Match3 = () => {
  const [displayProgress, setDisplayProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const { unityProvider, loadingProgression } = useUnityContext({
    loaderUrl: '/Games/match3/Build/match3 webgl build.loader.js',
    dataUrl: '/Games/match3/Build/match3 webgl build.data.gz',
    frameworkUrl: '/Games/match3/Build/match3 webgl build.framework.js.gz',
    codeUrl: '/Games/match3/Build/match3 webgl build.wasm.gz',
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
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f9d423, #ff4e50)',
      padding: '40px 20px',
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      color: '#333'
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', color: '#fff' }}>🍬 Match 3 Candy Crush Clone</h1>
      <p style={{ fontSize: '1.1rem', marginBottom: '30px', maxWidth: '600px', textAlign: 'center', color: '#fff' }}>
        Match candies and complete each level by scoring the highest points. Sweet surprises await!
      </p>

      {!isLoaded && (
        <div style={{
          marginBottom: '30px',
          textAlign: 'center',
          backgroundColor: 'rgba(255,255,255,0.8)',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            width: '300px',
            height: '20px',
            backgroundColor: '#ddd',
            borderRadius: '10px',
            overflow: 'hidden',
            margin: '0 auto'
          }}>
            <div style={{
              width: `${displayProgress}%`,
              height: '100%',
              background: 'linear-gradient(to right, #ff6f91, #ffc75f)',
              transition: 'width 0.3s'
            }} />
          </div>
          <p>Loading {displayProgress}%</p>
          {displayProgress > 85 && (
            <p style={{ color: '#555', fontStyle: 'italic' }}>Almost there! The candy is getting sweetened...</p>
          )}
        </div>
      )}

      <div style={{
        visibility: isLoaded ? 'visible' : 'hidden',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '15px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
        maxWidth: '700px',
        marginBottom: '30px'
      }}>
        <Unity
          unityProvider={unityProvider}
          style={{
            width: '640px',
            height: '480px',
            borderRadius: '10px'
          }}
        />
      </div>

      <div style={{
        maxWidth: '700px',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        textAlign: 'left'
      }}>
        <h2>🍭 How to Play</h2>
        <ul style={{ lineHeight: '1.8' }}>
          <li>Swap adjacent candies to create lines of 3 or more of the same color.</li>
          <li>Complete the level goal within a limited number of moves.</li>
          <li>Trigger combos for powerful candy effects.</li>
          <li>Each level brings new challenges — crush them all!</li>
        </ul>
      </div>
    </div>
  );
};

export default Match3;
