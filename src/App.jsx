import React, { useRef, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Background from "./components/Background/Background";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import OtherComponents from "./components/OtherComponents/OtherComponents";
import SignupPage from "./components/Signup/Signup";
import Login from "./components/Signup/Login";
import FlappyBirdGame from "./components/Games/FlappyBirdGame";
import RunnerBall from "./components/Games/RunnerBall";
import Nodulus from "./components/Games/Nodulus";
import Match3 from "./components/Games/Match3";
// import Anna from "./components/Anna/Anna";
function App() {
  const heroData = [
    { text1: "KidZone Edugames", text2: "An Education Webgames For Kids" },
    { text1: "Best Educational Game", text2: "Platform For Kids" },
    { text1: "Play and Learn", text2: "at the Same Time" },
  ];
  const servicesRef = useRef(null);

  const scrollToServices = () => {
    if (servicesRef.current) {
      servicesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [heroCount, setHeroCount] = useState(2);
  const [playStatus, setPlayStatus] = useState(false);
  return (
    <div className="App">
      <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Background playStatus={playStatus} heroCount={heroCount} />
              <Hero
                playStatus={playStatus}
                heroCount={heroCount}
                heroData={heroData[heroCount]}
                setHeroCount={setHeroCount}
                setPlayStatus={setPlayStatus}
              />
              <OtherComponents ref={servicesRef} />
            </>
          }
        />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/flappy-bird" element={<FlappyBirdGame />} />
        <Route path="/match3" element={<Match3 />} />
        <Route path="/runner-ball" element={<RunnerBall />} />
        <Route path="/nodulus" element={<Nodulus />} />
        {/* <Route path="/anna" element={<Anna />} /> */}
        {/* 
        <Route path="/shipping-policy" element={<ShippingPolicy />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} /> */}
      </Routes>
      {/* <Footer onServicesClick={scrollToServices} /> */}
    </Router>
    </div>
  );
}

export default App;
