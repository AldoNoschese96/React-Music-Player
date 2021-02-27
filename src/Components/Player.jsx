import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
  faForward,
  faBackward,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
  currentSong,
  isPlaying,
  setIsPlaying,
  audioRef,
  songInfo,
  setSongInfo,
  dragHandler,
  songs,
  setCurrentSong,
  setSongs,
}) => {
  const checkIfIsPlaying = async (song) => {
    const newSongs = songs.map((_song) => {
      if (_song.id === song.id) {
        return {
          ..._song,
          active: true,
        };
      } else {
        return {
          ..._song,
          active: false,
        };
      }
    });

    setSongs(newSongs);
    // Check If Is Playing
    if (isPlaying) {
      await setCurrentSong(song);
      audioRef.current.play();
    } else {
      await setCurrentSong(song);
    }
  };

  const skipTrackHandler = (skipType) => {
    const newSongs = [...songs];

    const indexOfCurrentSong = newSongs.findIndex(
      (_song) => currentSong.id === _song.id
    );

    if (skipType === "skip-back") {
      const songToGo = songs[indexOfCurrentSong - 1];

      if ((indexOfCurrentSong - 1) % songs.length === -1) {
        checkIfIsPlaying(songs[songs.length - 1]);
        return;
      }
      checkIfIsPlaying(songToGo);
    } else if (skipType === "skip-forward") {
      const songToGo = songs[(indexOfCurrentSong + 1) % newSongs.length];
      checkIfIsPlaying(songToGo);
    } else if (skipType === "skip-first") {
      setSongInfo({ ...songInfo, currentTime: 0.0 });
      audioRef.current.currentTime = 0;
    } else if (skipType === "skip-last") {
      setSongInfo({ ...songInfo, currentTime: songInfo.duration - 1 });
      audioRef.current.currentTime = songInfo.duration - 1;
    }
  };

  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  useEffect(() => {
    if (
      songInfo.currentTime !== null &&
      songInfo.currentTime !== 0 &&
      songInfo.currentTime >= songInfo.duration
    ) {
      // AUTO SKIP
      skipTrackHandler("skip-forward");
    }
  }, [songInfo.currentTime]);

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <input
          min={0}
          max={songInfo.duration}
          value={songInfo.currentTime ? songInfo.currentTime : 0}
          onChange={dragHandler}
          type="range"
        />
        <p>{getTime(songInfo.duration)}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          size="2x"
          className="skip-back"
          icon={faAngleLeft}
          onClick={() => skipTrackHandler("skip-back")}
        />
        <FontAwesomeIcon
          size="2x"
          className="skip-back"
          icon={faBackward}
          onClick={() => skipTrackHandler("skip-first")}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          size="2x"
          className="play"
          icon={!isPlaying ? faPlay : faPause}
        />
        <FontAwesomeIcon
          size="2x"
          className="skip-back"
          icon={faForward}
          onClick={() => skipTrackHandler("skip-last")}
        />
        <FontAwesomeIcon
          size="2x"
          className="skip-forward"
          icon={faAngleRight}
          onClick={() => skipTrackHandler("skip-forward")}
        />
      </div>
    </div>
  );
};

export default Player;
