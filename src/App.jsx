import { useState, useEffect } from 'react';
import axios from 'axios';
import AppHeader from './components/AppHeader';
import AppCard from './components/AppCard';

function App() {
  const [films, setFilms] = useState([]);

  const [tvSeries, setTvSeries] = useState([]);

  const [query, setQuery] = useState("");

  const apiUrl = "https://api.themoviedb.org";
  const apiUrlFilms = "/3/search/movie?";
  const apiUrlTvSeries = "/3/search/tv?";

  const apiUrlImgs = 'https://image.tmdb.org/t/p/';

  // useEffect(() => {
  //     getFilms();
  // }, []);

  const getFilms = () => {
    axios.get(`${apiUrl + apiUrlFilms}`,
      {
        params:
        {
          api_key: "964c51a63d6009ef4bd55d2dd351416a",
          query: query
        }
      })
      .then((resp) => {
        console.log(resp.data.results)
        setFilms(resp.data.results);
      }).catch(() => {
        alert("Errore nel caricamento dei film");
      });
  }

  const getTvSeries = () => {
    axios.get(`${apiUrl + apiUrlTvSeries}`,
      {
        params:
        {
          api_key: "964c51a63d6009ef4bd55d2dd351416a",
          query: query
        }
      })
      .then((resp) => {
        console.log(resp.data.results)
        setTvSeries(resp.data.results);
      }).catch(() => {
        alert("Errore nel caricamento dei film");
      });
  }

  console.log(query);
  console.log(films);

  return (
    <>

      <AppHeader
        query={query}
        setQuery={setQuery}
        getFilms={getFilms}
        getTvSeries={getTvSeries}
      />
      <main className='upper-container'>

        <div className='container'>

          {/* Lista film */}
          {films.map((film) => (
            <AppCard
              key={film.id}
              item={film}
              type="film"
              apiUrlImgs={apiUrlImgs}
            />
          ))}

          {/* Lista serie TV */}
          {tvSeries.map((serie) => (
            <AppCard
              key={serie.id}
              item={serie}
              type="serie"
              apiUrlImgs={apiUrlImgs}
            />
          ))}

        </div>
      </main>

    </>
  )
}

export default App
