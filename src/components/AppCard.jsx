function AppCard({ item, type, apiUrlImgs }) {
    const isFilm = type === "film";
    console.log(isFilm, item);
    return (
        <>

            <div className="card">
                {item.poster_path && (
                    <img
                        className="img-poster"
                        src={`${apiUrlImgs}/w342/${item.poster_path}`}
                        alt={isFilm ? item.title : item.name}
                    />
                )}

                <h1>Titolo: {isFilm ? item.title : item.name}</h1>
                <h2>Titolo Originale: {isFilm ? item.original_title : item.original_name}</h2>
                <h3>{isFilm ? "Film" : "Serie TV"}</h3>

                {item.original_language && (
                    <span className="font-mid flag-icon-container">
                        Lingua originale:
                        <img
                            className="flag-icon"
                            src={
                                item.original_language === 'it' || item.original_language === 'en'
                                    ? `images/${item.original_language}.png`
                                    : `images/placeholder.png`
                            }
                            alt={item.original_language}
                        />
                    </span>
                )}

                {isFilm ? (
                    <div>Numero recensioni: {item.vote_count}</div>
                ) : (
                    <p><strong>Descrizione:</strong> {item.overview}</p>
                )}

                <div className="font-mid">
                    Voto: <strong>{Math.ceil(item.vote_average * 1) / 2}/5</strong>
                </div>
            </div>
        </>
    )
}

export default AppCard;