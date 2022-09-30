import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";

const PlayPause = ({ isPlaying, activeSong, song, handlePause, handlePlay }) =>
  isPlaying && activeSong?.title === song.title ? (
    <FaPauseCircle
      size={35}
      className="text-gray-300 cursor-pointer"
      onClick={handlePause}
    />
  ) : (
    <FaPlayCircle
      className="text-4xl text-white cursor-pointer"
      onClick={handlePlay}
    />
  );

export default PlayPause;
