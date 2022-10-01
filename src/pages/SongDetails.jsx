import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import { useGetSongDetailsQuery } from "../redux/services/shazamCore";
import { MdSettingsApplications } from "react-icons/md";
const SongDetails = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { songid } = useParams();
  const {
    data: songData,
    isLoading: isLoadingSongDetails,
    isError,
  } = useGetSongDetailsQuery({ songid });

  console.log("songData", songData);
  return (
    <div className="flex flex-col">
      <DetailsHeader artistId="" songData={songData} />
      <div className="m-10">
        <h2 className="text-white text-3xl font-bold"> Lyrics</h2>
        <div className="mt-5">
          {songData?.sections[1].type === "LYRICS" ? (
            songData?.sections[1]?.text?.map((line, i) => (
              <p className="text-gray-400 text-base my-1">{line}</p>
            ))
          ) : (
            <p className="text-gray-400 text-base my-1"> No Lyrics Found</p>
          )}
        </div>
      </div>
    </div>
  );
};
export default SongDetails;
