import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { useGetArtistDetailsQuery } from "../redux/services/shazamCore";
const ArtistDetails = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { id: artistId } = useParams();
  const {
    data: artistData,
    isLoading: isLoadingArtistDetails,
    isError,
  } = useGetArtistDetailsQuery(artistId);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };
  if (isLoadingArtistDetails) return <Loader title="Artist details ...." />;
  if (isError) return <Error />;
  return (
    <div className="flex flex-col">
      <DetailsHeader artistId={artistId} artistData={artistData} />

      <RelatedSongs
        data={Object.values(artistData?.songs)}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
      />
    </div>
  );
};
export default ArtistDetails;
