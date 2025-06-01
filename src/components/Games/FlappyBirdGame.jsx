import React, { useState, useEffect } from 'react';
import { Unity, useUnityContext } from 'react-unity-webgl';

const FlappyBirdGame = () => {
  const [displayProgress, setDisplayProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const { unityProvider, loadingProgression } = useUnityContext({
    loaderUrl: '/Games/flappy-bird/Build/Flappy Bird Webgl Build.loader.js',
    dataUrl: '/Games/flappy-bird/Build/Flappy Bird Webgl Build.data.br',
    frameworkUrl: '/Games/flappy-bird/Build/Flappy Bird Webgl Build.framework.js.br',
    codeUrl: '/Games/flappy-bird/Build/Flappy Bird Webgl Build.wasm.br',
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
      background: 'linear-gradient(to bottom right, #74ebd5, #ACB6E5)',
      padding: '40px 20px',
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
      color: '#333',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>🐤 Flappy Bird Web Game</h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '30px', maxWidth: '600px', textAlign: 'center' }}>
        Welcome to the Flappy Bird challenge! Fly through the pipes without crashing. How far can you go?
      </p>

      {!isLoaded && (
        <div style={{
          marginBottom: '30px',
          textAlign: 'center',
          backgroundColor: 'rgba(255,255,255,0.7)',
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
              background: 'linear-gradient(to right, #ff9f43, #feca57)',
              transition: 'width 0.3s'
            }} />
          </div>
          <p>Loading {displayProgress}%</p>
          {displayProgress > 85 && (
            <p style={{ color: '#555', fontStyle: 'italic' }}>Almost there! The game is preparing...</p>
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
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        textAlign: 'left'
      }}>
        <h2>📜 How to Play</h2>
        <ul style={{ lineHeight: '1.8' }}>
          <li>Tap or click to make the bird flap its wings.</li>
          <li>Dodge the pipes — one hit and it’s game over!</li>
          <li>Try to get the highest score possible.</li>
          <li>Challenge your friends and share your score!</li>
        </ul>
      </div>
    </div>
  );
};

export default FlappyBirdGame;
