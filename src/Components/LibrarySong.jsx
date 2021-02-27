import React from "react";

const LibrarySong = ({
  song,
  setCurrentSong,
  songs,
  audioRef,
  isPlaying,
  setSongs,
}) => {
  const songSelectHandler = async () => {
    // Add Active State

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

  return (
    <div onClick={songSelectHandler}>
      <div className={`library-song ${song.active ? "selected" : null}`}>
        <img src={song.cover} alt={song.name} />
        <div className="song-description">
          <h3>{song.name}</h3>
          <h4>{song.artist}</h4>
        </div>
      </div>
    </div>
  );
};
export default LibrarySong;
