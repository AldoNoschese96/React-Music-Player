import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMusic,
  faVolumeUp,
  faVolumeMute,
  faAdjust,
} from "@fortawesome/free-solid-svg-icons";
const Nav = ({
  libraryStatus,
  setLibraryStatus,
  volumeHandler,
  volume,
  theme,
  setTheme,
}) => {
  return (
    <nav>
      <h1>Player</h1>
      <FontAwesomeIcon
        icon={volume ? faVolumeUp : faVolumeMute}
        onClick={volumeHandler}
      />

      <div className="checkTheme">
        <FontAwesomeIcon icon={faAdjust} onClick={() => setTheme(!theme)} />
      </div>
      <button onClick={() => setLibraryStatus(!libraryStatus)}>
        Library <FontAwesomeIcon icon={faMusic} />
      </button>
    </nav>
  );
};

export default Nav;
