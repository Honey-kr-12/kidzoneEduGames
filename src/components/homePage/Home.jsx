// src/HomePage.js
import React from "react";
import videoo from "../../assets/truck.mp4";
import "./home.css";
const HomePage = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f0f0f0",
      }}
    >
      <video className="responsive-video" autoPlay muted loop playsInline>
        <source src={videoo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default HomePage;
