import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GifState } from "../context/gif-context";
import Gif from "../components/gif";
import FollowOn from "../components/follow-on";
import { HiOutlineExternalLink } from "react-icons/hi";
import { HiMiniChevronDown, HiMiniChevronUp } from "react-icons/hi2";

const contentType = ["gif", "gifs", "stickers", "texts"]; // Added 'gif' for singular case

const GifPage = () => {
  const { type, slug } = useParams();
  const [gif, setGif] = useState(null);
  const [relatedGifs, setRelatedGifs] = useState([]);
  const [readMore, setReadMore] = useState(false);
  const { gf, addToFavorites, favorites } = GifState();

  useEffect(() => {
    if (!contentType.includes(type)) {
      console.error("Invalid Content Type:", type);
      return;
    }

    const fetchGif = async () => {
      try {
        const gifId = slug.split("-").pop();
        const { data } = await gf.gif(gifId);
        const { data: related } = await gf.related(gifId, { limit: 10 });
        setGif(data);
        setRelatedGifs(related);
      } catch (error) {
        console.error("Error fetching GIF:", error);
      }
    };

    fetchGif();
  }, [type, slug, gf]);

  if (!gif) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-4 my-10 gap-4">
      <div className="hidden sm:block">
        {gif.user && (
          <>
            <div className="flex gap-1">
              <img
                src={gif.user.avatar_url}
                alt={gif.user.display_name}
                className="h-14"
              />
              <div className="px-2">
                <div className="font-bold">{gif.user.display_name}</div>
                <div className="faded-text">@{gif.user.username}</div>
              </div>
            </div>
            {gif.user.description && (
              <p className="py-4 whitespace-pre-line text-sm text-gray-400">
                {readMore ? gif.user.description : gif.user.description.slice(0, 100) + "..."}
                <div
                  className="flex items-center faded-text cursor-pointer"
                  onClick={() => setReadMore(!readMore)}
                >
                  {readMore ? (
                    <>
                      Read less <HiMiniChevronUp size={20} />
                    </>
                  ) : (
                    <>
                      Read more <HiMiniChevronDown size={20} />
                    </>
                  )}
                </div>
              </p>
            )}
          </>
        )}
        <FollowOn />
        <div className="divider" />
        {gif.source && (
          <div>
            <span className="faded-text">Source</span>
            <div className="flex items-center text-sm font-bold gap-1">
              <HiOutlineExternalLink size={25} />
              <a href={gif.source} target="_blank" className="truncate">
                {gif.source}
              </a>
            </div>
          </div>
        )}
      </div>
      <div className="col-span-3">
        {relatedGifs.map((relatedGif) => (
          <Gif key={relatedGif.id} gif={relatedGif} />
        ))}
      </div>
    </div>
  );
};

export default GifPage;
