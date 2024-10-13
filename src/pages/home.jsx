import { useEffect } from "react";
import { GifState } from "../context/gif-context";

import Gif from "../components/gif";
import FilterGif from "../components/filter-gif";

function Home() {
  const { gf, gifs, setGifs, filter } = GifState();

  const fetchTrendingGIFs = async () => {
    try {
      console.log("Fetching trending GIFs..."); // Log before fetching
      const { data: gifs } = await gf.trending({
        limit: 20,
        type: filter,
        rating: "g",
      });
      console.log("Fetched GIFs successfully:", gifs); // Log the fetched GIFs
      setGifs(gifs);
    } catch (error) {
      console.error("Error fetching GIFs:", error); // Log any errors
    }
  };

  useEffect(() => {
    fetchTrendingGIFs();
  }, [filter]);

  return (
    <div className="">
      <img
        src="/banner.gif"
        alt="earth banner"
        className="mt-2 rounded w-full"
      />

      <FilterGif showTrending />
 
      <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2">
        {gifs.map((gif) => (
          <Gif gif={gif} key={gif.title} />
        ))}
      </div>
    </div>
  );
}

export default Home;
