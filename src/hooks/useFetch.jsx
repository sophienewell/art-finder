import { useState, useEffect } from "react";

const baseUrl =
  "https://api.artic.edu/api/v1/artworks/search?fields=id,title,artist_display,date_display,image_id,is_on_view,gallery_title&limit=100&q=";

export default function useFetch(search) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    setLoading(true);

    if (search.length === 0) {
      setLoading(false);
      return;
    }
    setData(null);
    setError(null);
    try {
      const response = await fetch(baseUrl + search);
      const json = await response.json();
      const artData = json.data.map((val) => ({
        id: val.id,
        title: val.title,
        artist: val.artist_display,
        date: val.date_display,
        imageId: val.image_id,
        onView: val.is_on_view,
        gallery: val.gallery_title,
      }));
      setData(artData);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [search]);
  return { data, error, loading };
}
