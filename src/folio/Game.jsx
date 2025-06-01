import React, { useState, useEffect } from 'react';
import './Game.css';  // For styling and animations

const Game = () => {
  const [mosquitoes, setMosquitoes] = useState([{ id: 1, x: 100, y: 100 }]);
  const [kills, setKills] = useState(0);  // To track the number of mosquitoes killed
  const [targetKills, setTargetKills] = useState(100);  // The number of mosquitoes to kill to get the gift
  const [showGift, setShowGift] = useState(false);  // To control the display of the gift message

  const killMosquito = (id) => {
    // Remove killed mosquito
    setMosquitoes((prevMosquitoes) =>
      prevMosquitoes.filter((mosquito) => mosquito.id !== id)
    );

    // Add two new mosquitoes at random positions
    const newMosquitoes = [
      { id: Date.now(), x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight },
      { id: Date.now() + 1, x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight },
    ];
    setMosquitoes((prevMosquitoes) => [...prevMosquitoes, ...newMosquitoes]);

    // Update kills count
    const newKills = kills + 1;
    setKills(newKills);

    // Check if the target kills are reached
    if (newKills >= targetKills) {
      setShowGift(true);  // Show gift message when the target is reached
    }
  };

  useEffect(() => {
    // Function to update mosquito positions randomly
    const interval = setInterval(() => {
      setMosquitoes((prevMosquitoes) =>
        prevMosquitoes.map((mosquito) => ({
          ...mosquito,
          x: mosquito.x + Math.random() * 10 - 5, // Move in X direction by random amount
          y: mosquito.y + Math.random() * 10 - 5, // Move in Y direction by random amount
        }))
      );
    }, 50); // Update every 50 milliseconds for smoother movement

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="game-container">
      <h1>Game</h1>

      {/* Display countdown to the gift */}
      <div className="countdown">
        <p>Kill {targetKills - kills} more mosquitoes to get a gift!</p>
      </div>

      {/* Display the gift message once target kills are reached */}
      {showGift && (
        <div className="gift-message">
          <p>Congratulations! You've earned a gift!</p>
        </div>
      )}

      {mosquitoes.map((mosquito) => (
        <div
          key={mosquito.id}
          className="mosquito"
          style={{
            left: mosquito.x + 'px',
            top: mosquito.y + 'px',
            position: 'absolute',
          }}
          onClick={() => killMosquito(mosquito.id)}
        >
          🦟
        </div>
      ))}
    </div>
  );
};

export default Game;
