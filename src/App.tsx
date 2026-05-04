import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      },
    };

    fetch("https://api.themoviedb.org/3/movie/popular", options)
      .then((res) => res.json())
      .then((data) => setData(data.results))
      .catch((err) => console.error(err));
  }, []);

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

export default App;
