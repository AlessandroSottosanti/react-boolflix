import { useState, useEffect } from 'react';
import axios from 'axios';
import AppHeader from './components/AppHeader';

function App() {
  const [films, setFilms] = useState([]);

  const [tvSeries, setTvSeries] = useState([]);

  const [query, setQuery] = useState("");

  const apiUrl = "https://api.themoviedb.org";
  const apiUrlFilms = "/3/search/movie?";
  const apiUrlTvSeries = "/3/search/tv?";

  const apiUrlImgs = 'https://image.tmdb.org/t/p/';

  useEffect(() => {
    //  getFilms();
  }, []);

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

          {films.map((film) =>
            <div className="card" key={film.id}>
              {film.poster_path && <img className='img-poster' src={`${apiUrlImgs}/w342/${film.poster_path}`} alt={film.poster_path} />}
              <h1>Titolo: {film.title}</h1>
              <h2>Titolo Originale: {film.original_title}</h2>

              <h3>Film</h3>
              {film.original_language && <span className='font-mid flag-icon-container'>lingua originale: <img className='flag-icon' src={(film.original_language === 'it' || film.original_language === 'en') ? `images/${film.original_language}.png` : `images/placeholder.png`}></img></span>}
              <div>Numero recenzioni: {film.vote_count}</div>
              <div className='font-mid'>Voto: <strong>{Math.ceil(film.vote_average * 1) / 2}/5</strong></div>
            </div>

          )
          }

          {/* Lista serie Tv */}

          {tvSeries.map((serie) =>
            <div className="card" key={serie.id}>
              {serie.poster_path && <img className='img-poster' src={`${apiUrlImgs}/w342/${serie.poster_path}`} alt={serie.poster_path} />}
              <h1>Titolo: {serie.name}</h1>
              <h2>Titolo Originale: {serie.original_name}</h2>
              <h3>Serie Tv</h3>

              {serie.original_language && <span className='font-mid flag-icon-container'>lingua originale: <img className='flag-icon' src={(serie.original_language === 'it' || serie.original_language === 'en') ? `images/${serie.original_language}.png` : `images/placeholder.png`}></img></span>}
              <p><strong>Descrizione:</strong>{' ' + serie.overview}</p>
              <div>Numero recenzioni: {serie.vote_count}</div>
              <div className='font-mid'>Voto: <strong>{Math.ceil(serie.vote_average * 10) / 10}/10</strong></div>
            </div>
          )}

        </div>
      </main>

    </>
  )
}

export default App
