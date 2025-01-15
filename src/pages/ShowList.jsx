import { useContext, useState } from "react";
import AppCard from "../components/AppCard";
import { GlobalContext } from "../contexts/GlobalContext";
import axios from "axios";
import { language } from "fontawesome";

function ShowList() {
  const { films, tvSeries, movieGenres, tvGenres } = useContext(GlobalContext);


  const apiUrlImgs = "https://image.tmdb.org/t/p/";

  return (


    <main className="upper-container text-white">
      {/* <h1>Generi film</h1>
      <ul>
        {movieGenres.map((genre) => (
          <li>{genre.name}</li>
        ))}
      </ul>
      <h1>Generi SerieTv</h1>
      <ul>
        {tvGenres.map((genre) => (
          <li>{genre.name}</li>
        ))}
      </ul> */}

      <div className="container">
        <div className="group-title">
          <h2 className="text-white">Film</h2>
          {/* Select per i generi dei Film */}
          <select onChange={(e) => filterFilmsByGenre(e.target.value)}>
            <option value="">Tutti i Generi</option>
            {movieGenres.map((genre) => (
              <option key={genre.id} value={genre.name}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>



        {/* Lista Film */}
        {films.map((film) => (
          <AppCard key={film.id} item={film} type="film" apiUrlImgs={apiUrlImgs} />
        ))}
      </div>



      <div className="container">
        <div className="group-title">

          <h2 className="text-white">Serie TV</h2>

          <select onChange={(event) => filterTvSeriesByGenre(event.target.value)}>
            <option value="">Tutti i Generi</option>
            {tvGenres.map((genre) => (
              <option key={genre.id} value={genre.name}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>
        {/* Select per i generi delle Serie TV */}


        {/* Lista Serie TV */}
        {tvSeries.map((serie) => (
          <AppCard key={serie.id} item={serie} type="serie" apiUrlImgs={apiUrlImgs} />
        ))}
      </div>
    </main>
  );
}

export default ShowList;
