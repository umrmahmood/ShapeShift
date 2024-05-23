// src/hooks/useFetchImages.js
import { useState, useEffect } from 'react';

const useFetchImages = (imageUrls) => {
  const [imageUrlsFetched, setImageUrlsFetched] = useState([]);

  useEffect(() => {
    if (imageUrls && imageUrls.length > 0) {
      const fetchImages = async () => {
        try {
          const promises = imageUrls.map(async (imageUrl) => {
            const response = await fetch(`/api/images/${imageUrl}`);
            if (response.ok) {
              const data = await response.json();
              return data.url;
            } else {
              throw new Error('Failed to fetch image');
            }
          });
          const urls = await Promise.all(promises);
          setImageUrlsFetched(urls);
        } catch (error) {
          console.error(error);
        }
      };

      fetchImages();
    }
  }, []);

  return imageUrlsFetched;
};

export default useFetchImages;
