import { useEffect, useState } from "react";
import { GifState } from "../context/gif-context";
import { useParams } from "react-router-dom";
import Gif from "../components/gif";
import FollowOn from "../components/follow-on";

const Category = () => {
  const [searchResults, setSearchResults] = useState([]);
  const { gf } = GifState(); // Get GiphyFetch instance from context
  const { category } = useParams();

  // Fetch GIFs for the category using the Giphy API
  const fetchSearchResults = async () => {
    try {
      const { data } = await gf.search(category, { limit: 15 }); // Using search endpoint for category
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching GIFs:", error);
    }
  };

  useEffect(() => {
    fetchSearchResults();
  }, [category]);

  return (
    <div className="flex flex-col sm:flex-row gap-5 my-4">
      <div className="w-full sm:w-72">
        {searchResults.length > 0 && <Gif gif={searchResults[0]} />}
        <span className="text-gray-400 text-sm pt-2">
          Don&apos;t tell it to me, GIF it to me!
        </span>
        <FollowOn />
        <div className="w-full h-0.5 mt-6 bg-gray-800" />
      </div>
      <div>
        <h2 className="text-4xl pb-1 font-extrabold capitalize">
          {category.split("-").join(" & ")} GIFs
        </h2>
        <h2 className="text-lg text-gray-400 pb-3 font-bold hover:text-gray-50 cursor-pointer">
          @{category}
        </h2>

        {searchResults.length > 0 ? (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-2">
            {searchResults.map((gif) => (
              <Gif gif={gif} key={gif.id} />
            ))}
          </div>
        ) : (
          <p>No GIFs found for this category.</p>
        )}
      </div>
    </div>
  );
};

export default Category;
