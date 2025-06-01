import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import './Explore.css';

// Import the components you want to show when a box is clicked
import AboutMe from './AboutMe.jsx';
import AboutYou from './AboutYou.jsx';
import Surprise from './Surprise.jsx';
import More from './More.jsx';

const ExploreSection = () => {


  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [showSkills, setShowSkills] = useState(false);
  const [isHeadingVisible, setIsHeadingVisible] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
  const [selectedBox, setSelectedBox] = useState(null);
  const [isLightOn, setIsLightOn] = useState(false); 
  const box = [
    { name: "About Me", component: <AboutMe /> },
    { name: "About You", component: <AboutYou /> },
    { name: "Surprise", component: <Surprise /> },
    { name: "More", component: <More /> },
    { name: `Turn ${isLightOn ? 'off' : 'on'} the light`, component: null }, // No component for "Turn on the light"
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

  const handleBoxClick = (name) => {
    if (name === `Turn ${isLightOn ? 'off' : 'on'} the light`) {
      setIsLightOn(!isLightOn);
    } else {
      setIsClicked(true);
      setSelectedBox(name);

      setTimeout(() => {
        setSelectedBox(name); 
      }, 1000); // Animation duration
    }
  };

  useEffect(() => {
    if (isHeadingVisible) {
      const timer = setTimeout(() => {
        setIsHeadingVisible(false);
        setTimeout(() => setShowSkills(true), 2000);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isHeadingVisible]);
  console.log(selectedBox);
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

      {showSkills && !selectedBox && (
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
              transition={{ duration: 0.5 }}
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

      {selectedBox && selectedBox !== `Turn ${isLightOn ? 'off' : 'on'} the light` && (
        <div style={{display:'flex', height:'80%',width:'80%', justifyContent:'center', alignItems:'center'}}>
          {box.map(
            (item) =>
              item.name === selectedBox && (
                <div style={{display:'grid',width:'100%', height:'100%'}} key={item.name}>
                  {item.component}
                </div>
              )
          )}
        </div>
      )}
    </>
  );

  
};

export default ExploreSection;
