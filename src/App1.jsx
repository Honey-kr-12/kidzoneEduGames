import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App1.css"; // Add your styles
import truck from "../src/assets/truck.mp4";
import ExploreSection from "./folio/ExploreSection"; // New component

const App1 = () => {
  const [showSecondHeading, setShowSecondHeading] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [playVideo, setPlayVideo] = useState(false);
  const [showExploreButton, setShowExploreButton] = useState(false);
  const [showExploreSection, setShowExploreSection] = useState(false);

  const handleButtonClick = () => {
    setPlayVideo(true);
    setTimeout(() => {
      setPlayVideo(false);
      setShowExploreButton(true);
    }, 3000); // Video will stop after 3 seconds
  };

  const handleExploreClick = () => {
    setShowExploreSection(true);
  };

  return (
    <div className="app-container">
      {/* {!playVideo && !showExploreButton && !showExploreSection && (
        <AnimatePresence>
          {!showSecondHeading ? (
            <motion.h1
              className="heading"
              key="welcome"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 1 }}
              onAnimationComplete={() => setTimeout(() => setShowSecondHeading(true), 1000)}
            >
              Welcome to my Portfolio
            </motion.h1>
          ) : (
            <motion.h1
              className="heading"
              key="headphones"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 1 }}
              onAnimationComplete={() => setTimeout(() => setShowButton(true), 1000)}
            >
              Put headphones for better experience
            </motion.h1>
          )}
        </AnimatePresence>
      )}

      {showButton && !playVideo && !showExploreButton && (
        <motion.button
          className="mouse-button"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          onClick={handleButtonClick}
        >
          Click to Continue
        </motion.button>
      )}

      {playVideo && (
        <motion.div
          className="video-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <video className="video" autoPlay muted>
            <source src={truck} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </motion.div>
      )}

      {showExploreButton && !showExploreSection && (
        <motion.button
          className="explore-button"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          onClick={handleExploreClick}
        >
          Explore More
        </motion.button>
      )} */}

      {/* {showExploreSection && ( */}
        <AnimatePresence>
          <ExploreSection />
        </AnimatePresence>
      {/* )} */}
    </div>
  );
};

export default App1;
