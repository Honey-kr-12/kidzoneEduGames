import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import './AboutYou.css';  // Import the CSS for the component

const AboutYou = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [locationData, setLocationData] = useState(null);
  const [org, setOrg] = useState(null);
  const [weather, setWeather] = useState(null);
  const [weatherDescription, setWeatherDescription] = useState(null);
  const [typingText, setTypingText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [contentVisible, setContentVisible] = useState(false);
  const fullText = "Well, I only tell a few things about you like:";

  useEffect(() => {
    const getUserLocation = async () => {
      try {
        const ipInfoResponse = await axios.get("https://ipinfo.io?token=a1dedb78c5747e");
        const { loc, org } = ipInfoResponse.data;
        const [latitude, longitude] = loc.split(",");

        setOrg(org);
        setUserLocation({ latitude, longitude });

        // Use OpenCage API to reverse geocode latitude and longitude
        const openCageResponse = await axios.get(
          `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=5055f98cec674a08a8e2c6590eef06ab`
        );
        const address = openCageResponse.data.results[0]?.formatted;

        setLocationData(address);

        // Fetch weather data using OpenWeatherMap API
        const weatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=691d68333b92d3a59b1ca936a9de95ed
&units=metric`
        );
        const temperature = weatherResponse.data.main.temp;
        const description = weatherResponse.data.weather[0]?.description;

        setWeather(temperature);
        setWeatherDescription(description);
      } catch (error) {
        console.error("Error fetching location or weather data:", error);
      }
    };

    getUserLocation();
  }, []);

  useEffect(() => {
    // Typing effect for "Well, I only tell a few things about you like:"
    if (currentIndex < fullText.length) {
      setTimeout(() => {
        setTypingText(typingText + fullText[currentIndex]);
        setCurrentIndex(currentIndex + 1);
      }, 100);
    } else {
      // Start showing content after typing effect is finished
      setContentVisible(true);
    }
  }, [currentIndex, typingText]);

  // Function to determine emotional response based on weather
  const getEmotionalResponse = () => {
    if (weather !== null) {
      if (weather < 10) {
        return "Brrr... It's really cold outside! 🥶 Stay warm!";
      } else if (weather >= 10 && weather <= 25) {
        return "Perfect weather for a walk! 😊";
      } else {
        return "It's hot outside! 😎 Stay hydrated!";
      }
    }

    if (weatherDescription && weatherDescription.includes("rain")) {
      return "Oh no, it's rainy! ☔️ Don't forget your umbrella!";
    }

    if (weatherDescription && weatherDescription.includes("clouds")) {
      return "It's a bit cloudy today... 🌥️ A cozy day indoors!";
    }

    return "Enjoy the weather, whatever it may be! 🌞";
  };

  return (
    <div className="about-you-page">
      {/* Animated Heading with Typing Effect */}
      <motion.h1
        className="heading"
        key="welcome"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 3 }}
      >
        Hello
      </motion.h1>

      {/* Typing Effect for "Well, I only tell a few things about you like:" */}
      <motion.div
        className="typing-effect"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <h2>{typingText}</h2>
      </motion.div>

      {/* Render all other content with a delay */}
      {contentVisible && (
        <motion.div
          className="content-info"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1 }}
        >
          {/* Display User Location */}
          {locationData && (
            <>
              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
              >
                Your Location:
              </motion.h3>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
              >
                {locationData}
              </motion.p>
            </>
          )}

          {/* Display Organization */}
          {org && (
            <>
              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
              >
                Your Organization:
              </motion.h3>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.7 }}
              >
                {org}
              </motion.p>
            </>
          )}

          {/* Display Weather Information */}
          {weather !== null && weatherDescription && (
            <>
              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 2 }}
              >
                Current Weather:
              </motion.h3>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 2.2 }}
              >
                Temperature: {weather}°C
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 2.4 }}
              >
                Condition: {weatherDescription}
              </motion.p>
            </>
          )}

          {/* Display Emotional Response Based on Weather */}
          {weather !== null && (
            <motion.p
              className="emotional-response"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2.6 }}
            >
              {getEmotionalResponse()}
            </motion.p>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default AboutYou;
