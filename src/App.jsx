import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [films, setFilms] = useState([]);

  const [tvSeries, setTvSeries] = useState([]);

  const [query, setQuery] = useState("");

  const apiUrlFilms = "https://api.themoviedb.org/3/search/movie?";

  useEffect(() => {
    //  getFilms();
  }, []);

  const getFilms = () => {
    axios.get(`${apiUrlFilms}`,
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

  console.log(query);
  console.log(films);

  return (
    <>
      <input type="text" value={query} placeholder='Cerca...' onChange={(event) => setQuery(event.target.value)} />
      <button onClick={() => getFilms()}>invia</button>

      <div className='container'>

        {films.map((film) =>
          <div className="card">
            <h1>Titolo: {film.title}</h1>
            <h2>Titolo Originale: {film.original_title}</h2>
           {film.original_language && <span className='font-mid flag-icon-container'>lingua originale: <img className='flag-icon' src={(film.original_language === 'it' || film.original_language === 'en') ? `images/${film.original_language}.png` : `images/placeholder.png`}></img></span> }
           <div>Numero recenzioni: {film.vote_count}</div>
           <div className='font-mid'>Voto: <strong>{ Math.ceil(film.vote_average * 10) / 10}/10</strong></div>
          </div>

        )

        }
      </div>

    </>
  )
}

export default App
