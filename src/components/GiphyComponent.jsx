// src/components/GiphyComponent.jsx
import React, { useState, useEffect } from 'react';
import { GiphyFetch } from '@giphy/js-fetch-api';

const GiphyComponent = () => {
  const [gifs, setGifs] = useState([]);

  // Initialize GiphyFetch with your API key
  const gf = new GiphyFetch(import.meta.env.VITE_GIPHY_API_KEY);

  // Function to fetch GIFs
  const fetchGifs = async () => {
    try {
      const { data } = await gf.search('funny', { limit: 10 });
      setGifs(data);
    } catch (error) {
      console.error('Error fetching gifs: ', error);
    }
  };

  useEffect(() => {
    fetchGifs();
  }, []);

  return (
    <div>
      <h2>Funny Gifs</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {gifs.map((gif) => (
          <div key={gif.id} style={{ margin: '10px' }}>
            <img src={gif.images.fixed_height.url} alt={gif.title} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GiphyComponent;
