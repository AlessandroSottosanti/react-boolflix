import { useContext } from "react";
import AppCard from "../components/AppCard";
import { GlobalContext } from "../contexts/GlobalContext";

function ShowList() {
  const { films, tvSeries } = useContext(GlobalContext);
  const apiUrlImgs = "https://image.tmdb.org/t/p/";

  return (
    <main className="upper-container">
      <div className="container">
        {/* Lista Film */}
        {films.map((film) => (
          <AppCard key={film.id} item={film} type="film" apiUrlImgs={apiUrlImgs} />
        ))}

        {/* Lista Serie TV */}
        {tvSeries.map((serie) => (
          <AppCard key={serie.id} item={serie} type="serie" apiUrlImgs={apiUrlImgs} />
        ))}
      </div>
    </main>
  );
}

export default ShowList;
