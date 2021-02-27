import React, { useState, useRef, useEffect } from "react";
import "./styles/app.scss";

// COMPONENTS
import Player from "./Components/Player";
import Song from "./Components/Song";
import Library from "./Components/Library";
import Nav from "./Components/Nav";

// DATA
import data from "./data";

function App() {
  const updateDurationHandler = (e) => {
    const duration = e.target.duration;
    setSongInfo({ ...songInfo, duration: duration });
  };

  const timeUpdateHandler = (e) => {
    const currentTime = e.target.currentTime;
    setSongInfo({ ...songInfo, currentTime: currentTime });
  };

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;

    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  const volumeHandler = () => {
    setVolume(!volume);

    volume ? (audioRef.current.volume = 0) : (audioRef.current.volume = 1);
  };

  //Ref
  const audioRef = useRef(null);

  //State
  const [theme, setTheme] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [songInfo, setSongInfo] = useState({
    currentTime: null,
    duration: null,
  });
  const [libraryStatus, setLibraryStatus] = useState(false);
  const [volume, setVolume] = useState(true);

  useEffect(() => {
    if (!theme) {
      document.documentElement.style.setProperty("--color-white", "#ffffff");
      document.documentElement.style.setProperty(
        "--color-dark",
        "rgb(36, 36, 36)"
      );
      document.documentElement.style.setProperty(
        "--color-shadow",
        "rgb(75, 75, 75);"
      );
      document.documentElement.style.setProperty("--color-shadow-none", "none");
      document.documentElement.style.setProperty(
        "--color-shadow-libary-none",
        "rgb(202, 202, 202)"
      );
      document.documentElement.style.setProperty(
        "--color-shadow-library",
        "rgb(202, 202, 202)"
      );
    } else {
      document.documentElement.style.setProperty(
        "--color-white",
        "rgb(36, 36, 36)"
      );
      document.documentElement.style.setProperty("--color-dark", "#ffffff");
      document.documentElement.style.setProperty("--color-shadow", "none");
      document.documentElement.style.setProperty(
        "--color-shadow-none",
        "rgb(75, 75, 75)"
      );
      document.documentElement.style.setProperty(
        "--color-shadow-libary-none",
        "rgb(202, 202, 202)"
      );
      document.documentElement.style.setProperty(
        "--color-shadow-library",
        "none"
      );
    }
  }, [theme]);

  return (
    <div className={`App ${libraryStatus ? "library-active" : ""}`}>
      <Nav
        libraryStatus={libraryStatus}
        setLibraryStatus={setLibraryStatus}
        volumeHandler={volumeHandler}
        setTheme={setTheme}
        theme={theme}
        volume={volume}
      />
      <Song currentSong={currentSong} isPlaying={isPlaying} />
      <Player
        setIsPlaying={setIsPlaying}
        isPlaying={isPlaying}
        currentSong={currentSong}
        audioRef={audioRef}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        songs={songs}
        dragHandler={dragHandler}
        setCurrentSong={setCurrentSong}
        setSongs={setSongs}
      />
      <Library
        songs={songs}
        isPlaying={isPlaying}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        setSongs={setSongs}
        libraryStatus={libraryStatus}
      />
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={updateDurationHandler}
        ref={audioRef}
        src={currentSong.audio}
      ></audio>
    </div>
  );
}

export default App;
