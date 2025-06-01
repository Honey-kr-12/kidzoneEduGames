import React, { useState, useEffect, useRef } from "react";
import * as Tone from "tone";

function App() {
  const [audioFile, setAudioFile] = useState(null);
  const [audioUrl, setAudioUrl] = useState("");
  const [player, setPlayer] = useState(null);

  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [pitchShift, setPitchShift] = useState(0);
  const [bassBoost, setBassBoost] = useState(0);
  const [volumeBoost, setVolumeBoost] = useState(0);

  // Refs to keep track of Tone.js components
  const pitchShiftEffect = useRef(new Tone.PitchShift(pitchShift).toDestination());
  const eqEffect = useRef(new Tone.EQ3(bassBoost, 0, 0).toDestination());
  const gain = useRef(new Tone.Gain(Tone.dbToGain(volumeBoost)).toDestination());

  // Tone.js reverb
  const reverb = new Tone.Reverb(6).toDestination();

  // Effect chain
  const effectChain = [pitchShiftEffect.current, eqEffect.current, gain.current, reverb];

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAudioFile(file);
      setAudioUrl(url);
    }
  };

  // Set up player with effects
  const startPlayback = async () => {
    if (player) {
      player.stop(); // Stop previous playback if any
    }

    // Initialize and configure the player with the effects chain only once
    const newPlayer = new Tone.Player(audioUrl);
    newPlayer.playbackRate = playbackRate;
    newPlayer.chain(...effectChain, Tone.Destination);
    newPlayer.autostart = true;
    newPlayer.loop = true; // Allow continuous loop for easy testing
    setPlayer(newPlayer);

    newPlayer.start(); // Start the audio playback
  };

  // Stop playback and release player resources
  const stopPlayback = () => {
    if (player) {
      player.stop();
      player.dispose();
      setPlayer(null);
    }
  };

  // Update effect values live as sliders are adjusted
  useEffect(() => {
    if (player) {
      player.playbackRate = playbackRate;
      pitchShiftEffect.current.pitch = pitchShift;
      eqEffect.current.low.value = bassBoost;
      gain.current.gain.value = Tone.dbToGain(volumeBoost);
    }
  }, [playbackRate, pitchShift, bassBoost, volumeBoost, player]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Customizable Audio Player</h1>

      {/* File Upload for Audio */}
      <input type="file" accept="audio/*" onChange={handleFileUpload} />

      {/* Audio Player for Uploaded File */}
      {audioUrl && (
        <div>
          <audio controls src={audioUrl}>
            Your browser does not support the audio element.
          </audio>
        </div>
      )}

      {/* Sliders for Customizations */}
      <div style={{ marginTop: "20px" }}>
        <label>Playback Speed: {playbackRate.toFixed(2)}x</label>
        <input type="range" min="0.5" max="1.5" step="0.1" value={playbackRate} onChange={(e) => setPlaybackRate(parseFloat(e.target.value))} />

        <label>Pitch Shift: {pitchShift} semitones</label>
        <input type="range" min="-12" max="12" step="1" value={pitchShift} onChange={(e) => setPitchShift(parseFloat(e.target.value))} />

        <label>Bass Boost: {bassBoost} dB</label>
        <input type="range" min="0" max="10" step="1" value={bassBoost} onChange={(e) => setBassBoost(parseFloat(e.target.value))} />

        <label>Volume Boost: {volumeBoost} dB</label>
        <input type="range" min="-10" max="10" step="1" value={volumeBoost} onChange={(e) => setVolumeBoost(parseFloat(e.target.value))} />
      </div>

      {/* Play and Stop Buttons */}
      <button onClick={startPlayback} disabled={!audioFile} style={{ marginTop: "20px" }}>
        Play Customized Audio
      </button>
      <button onClick={stopPlayback} disabled={!player} style={{ marginTop: "20px", marginLeft: "10px" }}>
        Stop
      </button>
    </div>
  );
}

export default App;
