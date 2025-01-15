import { createContext, useState, useEffect } from "react";
import axios from "axios";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [films, setFilms] = useState([]);
  const [tvSeries, setTvSeries] = useState([]);
  const [query, setQuery] = useState("");

  const apiUrl = "https://api.themoviedb.org/3";
  const apiKey = "964c51a63d6009ef4bd55d2dd351416a";

  const getFilms = () => {
    axios
      .get(`${apiUrl}/search/movie`, {
        params: {
          api_key: apiKey,
          query: query,
        },
      })
      .then((resp) => setFilms(resp.data.results))
      .catch(() => alert("Errore nel caricamento dei film"));
  };

  const getTvSeries = () => {
    axios
      .get(`${apiUrl}/search/tv`, {
        params: {
          api_key: apiKey,
          query: query || "one piece",
        },
      })
      .then((resp) => setTvSeries(resp.data.results))
      .catch(() => alert("Errore nel caricamento delle serie TV"));
  };

  const handleSearch = (event) => setQuery(event.target.value);

  const handleEnterKey = (event) => (event.key === "Enter") && getShows();


  const getShows = () => {
    getFilms();
    getTvSeries();
  };

  useEffect( () => {
    getShows();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        films,
        tvSeries,
        query,
        handleSearch,
        getFilms,
        getTvSeries,
        getShows,
        handleEnterKey
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };
