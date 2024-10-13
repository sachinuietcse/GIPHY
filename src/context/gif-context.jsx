import { GiphyFetch } from "@giphy/js-fetch-api";
import { createContext, useContext, useState } from "react";

// Create context
const GifContext = createContext();

// GifProvider component
const GifProvider = ({ children }) => {
    const [gifs, setGifs] = useState([]);
    const [filter, setFilter] = useState("gifs");
    const [favorites, setFavorites] = useState([]);

    // Giphy Fetch instance
    const gf = new GiphyFetch(import.meta.env.VITE_GIPHY_KEY);

    // Pass the values as an object using curly braces
    return (
        <GifContext.Provider value={{ gf, gifs, setGifs, filter, setFilter, favorites, setFavorites }}>
            {children}
        </GifContext.Provider>
    );
};

// Custom hook to use the GifContext
export const GifState = () => {
    return useContext(GifContext);
};

export default GifProvider;
 