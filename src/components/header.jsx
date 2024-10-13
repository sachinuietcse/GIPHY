import { useState } from "react";
import { Link } from "react-router-dom";
import { HiEllipsisVertical, HiMiniBars3BottomRight } from "react-icons/hi2";
import GifSearch from "./gif-search";
import { GifState } from "../context/gif-context";

const Header = () => {
  const [showCategories, setShowCategories] = useState(false);
  const { filter, setFilter, favorites } = GifState();

  // Manually define the specific categories
  const categories = [
    { name: "Reaction", name_encoded: "reaction" },
    { name: "Actions", name_encoded: "actions" },
    { name: "Adjectives", name_encoded: "adjectives" },
    { name: "Animee", name_encoded: "animee" },
    { name: "Art and Design", name_encoded: "art-design" },
  ];

  return (
    <nav>
      <div className="relative flex gap-4 justify-between items-center mb-2">
        <Link to={"/"} className="flex gap-2">
          <img src="/logo.svg" alt="Giphy Logo" className="w-8" />
          <h1 className="text-5xl font-bold tracking-tight cursor-pointer">
            GIPHY
          </h1>
        </Link>

        <div className="font-bold text-md flex gap-2 items-center">
          {categories.slice(0, 5).map((category) => (
            <Link
              className="px-4 py-1 transition ease-in-out hover:gradient border-b-4 hidden lg:block"
              key={category.name}
              to={`/category/${category.name_encoded}`}
            >
              {category.name}
            </Link>
          ))}

          <button onClick={() => setShowCategories(!showCategories)}>
            <HiEllipsisVertical
              size={35}
              className={`py-0.5 transition ease-in-out hover:gradient ${
                showCategories ? "gradient" : ""
              } border-b-4 cursor-pointer hidden lg:block`}
            />
          </button>

          {favorites.length > 0 && (
            <div className="h-9 bg-gray-700 pt-1.5 px-6 cursor-pointer rounded">
              <Link to="/favorites">Favorite GIFs</Link>
            </div>
          )}

          {/* -- Mobile UI -- */}
          <button onClick={() => setShowCategories(!showCategories)}>
            <HiMiniBars3BottomRight
              className="text-sky-400 block lg:hidden"
              size={30}
            />
          </button>
          {/* -- Mobile UI -- */}
        </div>

        {showCategories && (
          <div className="absolute right-0 top-14 px-10 pt-6 pb-9 w-full gradient z-20">
            <span className="text-3xl font-extrabold">Categories</span>
            <hr className="bg-gray-100 opacity-50 my-5" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {categories.map((category) => (
                <Link
                  onClick={() => setShowCategories(false)}
                  className="transition ease-in-out font-bold"
                  key={category.name}
                  to={`/category/${category.name_encoded}`}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <GifSearch filter={filter} setFilter={setFilter} />
    </nav>
  );
};

export default Header;
