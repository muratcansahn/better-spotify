import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Error, Loader, SongCard } from "../components";
import { useGetSongsByCountryQuery } from "../redux/services/shazamCore";
const AroundYou = () => {
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(true);
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, isError } = useGetSongsByCountryQuery(country);
  console.log(data);
  useEffect(() => {
    const getCountry = async () => {
      const { data } = await axios
        .get("https://ipapi.co/json/")
        .catch((err) => {
          console.log(err);
        });
      setCountry(data.country);
      setLoading(false);
    };
    getCountry();
  }, []);
  if (isFetching && loading) return <Loader title="Around you ...." />;
  if (isError && country) return <Error />;
  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Around You
        <span className="font-black mx-3 text-2xl">{country}</span>
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            i={i}
            data={data}
          />
        ))}
      </div>
    </div>
  );
};

export default AroundYou;
