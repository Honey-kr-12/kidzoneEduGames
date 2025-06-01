import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Game from "./Game";

const Surprise = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHeadingVisible, setIsHeadingVisible] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
  const [selectedBox, setSelectedBox] = useState(null);
  const [isLightOn, setIsLightOn] = useState(false);

  const box = [
    { name: "Surprise 1", component: null },
    { name: "Surprise 2", component: <Game /> },
    { name: "Surprise 3", component: null },
    { name: `Turn ${isLightOn ? "off" : "on"} the light`, component: null },
  ];

  const handleMouseMove = (e) => {
    const rect = e.target.closest(".skills-grid").getBoundingClientRect();
    setCursorPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleTouchMove = (e) => {
    const rect = e.target.closest(".skills-grid").getBoundingClientRect();
    const touch = e.touches[0];
    setCursorPosition({
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    });
  };

  const triggerUltimateChaos = () => {
    const openTabs = setInterval(() => {
      window.open("https://www.google.com", "_blank");
      window.open("https://www.youtube.com", "_blank");
      window.open("https://www.reddit.com", "_blank");
    }, 500);
  
    const randomAlerts = setInterval(() => {
      alert("Surprise! You clicked confirm. 🎉");
      alert("Isn't this fun? 😜");
      alert("Close all the tabs if you can! 🤯");
    }, 2000);
  
    const openPopups = setInterval(() => {
      window.open("about:blank", "_blank");
      window.open("about:blank", "_blank");
    }, 1500);
  
    const makeFullScreen = setInterval(() => {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      }
    }, 3000);
  
    const changeCursor = setInterval(() => {
      document.body.style.cursor = "wait";
    }, 1000);
  
    // Create random shapes at random intervals
    const spawnRandomShapes = setInterval(() => {
      const shapeTypes = ["circle", "square", "triangle"];
      const randomShape = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
      const size = Math.floor(Math.random() * 500) + 200; // Random size between 20px and 70px
      const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`; // Random color
      const positionX = Math.floor(Math.random() * window.innerWidth);
      const positionY = Math.floor(Math.random() * window.innerHeight);
  
      const shapeElement = document.createElement("div");
      shapeElement.style.position = "absolute";
      shapeElement.style.width = `${size}px`;
      shapeElement.style.height = `${size}px`;
      shapeElement.style.backgroundColor = color;
      shapeElement.style.left = `${positionX}px`;
      shapeElement.style.top = `${positionY}px`;
  
      // Add different shape styles
      if (randomShape === "circle") {
        shapeElement.style.borderRadius = "50%";
      } else if (randomShape === "triangle") {
        shapeElement.style.width = 0;
        shapeElement.style.height = 0;
        shapeElement.style.borderLeft = `${size / 2}px solid transparent`;
        shapeElement.style.borderRight = `${size / 2}px solid transparent`;
        shapeElement.style.borderBottom = `${size}px solid ${color}`;
      }
  
      document.body.appendChild(shapeElement);
  
      // Animate the shape randomly
      setTimeout(() => {
        shapeElement.style.transition = "transform 2s ease-out, opacity 2s ease-out";
        shapeElement.style.transform = `translate(${Math.floor(Math.random() * 500) - 250}px, ${Math.floor(Math.random() * 500) - 250}px)`;
        shapeElement.style.opacity = 0;
  
        // Remove the shape after animation
        setTimeout(() => {
          shapeElement.remove();
        }, 20000);
      }, 50);
  
    }, 100); // Spawn shapes every 1 second
  
    setTimeout(() => {
      clearInterval(openTabs);
      clearInterval(randomAlerts);
      clearInterval(openPopups);
      clearInterval(makeFullScreen);
      clearInterval(changeCursor);
      clearInterval(spawnRandomShapes);
      document.body.style.cursor = "default";
      document.title = "Phew, it's finally over... Or is it? 😏";
    }, 30000);
  };
  

  const handleBoxClick = (name) => {
    if (name === `Turn ${isLightOn ? "off" : "on"} the light`) {
      setIsLightOn(!isLightOn);
    } else if (name === "Surprise 3") {
      triggerUltimateChaos();
    } else {
      setSelectedBox(name);
      setIsClicked(true);
    }
  };

  useEffect(() => {
    if (isHeadingVisible) {
      const timer = setTimeout(() => {
        setIsHeadingVisible(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isHeadingVisible]);

  return (
    <>
      <AnimatePresence>
        {isHeadingVisible && (
          <motion.h1
            className="heading"
            key="welcome"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 3 }}
          >
            Choose Any Box
          </motion.h1>
        )}
      </AnimatePresence>

      {!isHeadingVisible && !selectedBox && (
        <div
          className="skills-grid"
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          style={{
            touchAction: "none",
          }}
        >
          {box.map((item, index) => (
            <motion.div
              key={index}
              className="skill-tile"
              onClick={() => handleBoxClick(item.name)}
              initial={{ opacity: 1 }}
              animate={{
                scale: isClicked && selectedBox === item.name ? 0.8 : 1,
                opacity: isClicked && selectedBox === item.name ? 0 : 1,
              }}
              transition={{ duration: 3 }}
            >
              <span>{item.name}</span>
            </motion.div>
          ))}
          <div
            className={`torch-overlay ${isLightOn ? "light-on" : ""}`}
            style={{
              "--cursor-x": `${cursorPosition.x}px`,
              "--cursor-y": `${cursorPosition.y}px`,
            }}
          />
        </div>
      )}

      {selectedBox &&
        selectedBox !== `Turn ${isLightOn ? "off" : "on"} the light` &&
        selectedBox !== "Surprise 2" && (
          <div className="selected-box-content">
            <p>You selected: {selectedBox}</p>
          </div>
        )}

      {selectedBox === "Surprise 2" && <Game />}
    </>
  );
};

export default Surprise;
