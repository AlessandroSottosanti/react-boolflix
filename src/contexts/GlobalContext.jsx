import { createContext, useState, useEffect } from "react";
import axios from "axios";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [allFilms, setAllFilms] = useState([]); // Lista completa dei film
  const [allTvSeries, setAllTvSeries] = useState([]); // Lista completa delle serie TV
  const [activeFilmFilter, setActiveFilmFilter] = useState(null); // Filtro attivo per i film
  const [activeTvFilter, setActiveTvFilter] = useState(null);


  const [films, setFilms] = useState([]);
  const [tvSeries, setTvSeries] = useState([]);
  const [query, setQuery] = useState("");
  const [movieGenres, setMovieGenres] = useState([]);
  const [tvGenres, setTvGenres] = useState([]);
  const [filteredQuery, setFilteredQuery] = useState(query);

  const apiUrl = "https://api.themoviedb.org/3";
  const apiKey = "964c51a63d6009ef4bd55d2dd351416a";
  const apiUrlFilmGenres = 'genre/movie/list';
  const apiUrlSeriesGenres = 'genre/tv/list';

  const getFilms = () => {
    axios
      .get(`${apiUrl}/search/movie`, {
        params: {
          api_key: apiKey,
          query: query || "one piece",
        },
      })
      .then((resp) => {
        setFilms(resp.data.results);
        setAllFilms(resp.data.results);
        console.log(resp);
      })
      .catch(() => console.log("Errore nel caricamento dei film"));
  };

  const getTvSeries = () => {
    axios
      .get(`${apiUrl}/search/tv`, {
        params: {
          api_key: apiKey,
          query: query || "one piece",
        },
      })
      .then((resp) => {
        setTvSeries(resp.data.results);
        setAllTvSeries(resp.data.results);
      })
      .catch(() => console.log("Errore nel caricamento delle serie TV"));
  };

  const getFilmGenres = () => {
    axios
      // )
      .get(`${apiUrl}/${apiUrlFilmGenres}`, {
        params: {
          language: 'en',
          api_key: apiKey,
        },
      })
      .then((resp) => {
        setMovieGenres(resp.data.genres);
      })
      .catch((req) => console.log(req, "Errore nel caricamento dei Generi dei film"));
  }

  const getSeriesGenres = () => {
    axios
      // )
      .get(`${apiUrl}/${apiUrlSeriesGenres}`, {
        params: {
          language: 'en',
          api_key: apiKey,
        },
      })
      .then((resp) => {
        setTvGenres(resp.data.genres);
      })
      .catch((req) => console.log(req, "Errore nel caricamento dei Generi dei film"));
  }

  const getGenres = () => {
    getFilmGenres();
    getSeriesGenres();
  }


  const filterFilmsByGenre = (event) => {
    const filterValue = parseInt(event.target.value);

    console.log("filterValue:", filterValue);

    setActiveFilmFilter(filterValue);

    if (!filterValue) {
      setFilms(allFilms);
      return;
    }

    const newFilms = allFilms.filter((film) => film.genre_ids.includes(filterValue));

    console.log("newFilms:", newFilms);

    if (newFilms.length > 0) {
      setFilms(newFilms);
    } else {
      alert("Nessun Film trovato");
    }
  };


  const filterTvSeriesByGenre = (event) => {
    const filterValue = parseInt(event.target.value);

    console.log("filterValue:", filterValue);

    console.log("tvSeries", tvSeries);

    setActiveTvFilter(filterValue);

    if (!filterValue) {
      setTvSeries(allTvSeries);
      return;
    }

    const newTvSeries = allTvSeries.filter((tv) => tv.genre_ids.includes(filterValue));

    console.log("newTvSeries:", newTvSeries);

    if (newTvSeries.length > 0) {
      setTvSeries(newTvSeries);
    } else {
      alert("Nessuna Serie TV trovata");
    }
  };


  const handleSearch = (event) => setQuery(event.target.value);

  const handleEnterKey = (event) => (event.key === "Enter") && getShows();


  const getShows = () => {
    getFilms();
    getTvSeries();
  };

  useEffect(() => {
    getShows();
    getGenres();
  }, [filteredQuery]);

  // useEffect per resettare i film ogni volta che il filtro cambia
  useEffect(() => {
    if (!activeFilmFilter) {
      setFilms(allFilms);
    }
  }, [activeFilmFilter, allFilms]);

  // useEffect per resettare le serie TV ogni volta che il filtro cambia
  useEffect(() => {
    if (!activeTvFilter) {
      setTvSeries(allTvSeries);
    }
  }, [activeTvFilter, allTvSeries]);

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
        handleEnterKey,
        movieGenres,
        tvGenres,
        filterFilmsByGenre,
        filterTvSeriesByGenre
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };
