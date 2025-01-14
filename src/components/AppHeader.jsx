
function AppHeader({query, setQuery, getFilms, getTvSeries}) {
    
    return (
        <>
            <nav className="navbar">
                <div className="logo">
                    <h1>BOOLFLIX</h1>
                </div>
                <div className="">
                    <input name="search" type="text" value={query} placeholder='Cerca...' onChange={(event) => setQuery(event.target.value)} />
                    <button onClick={() => { getFilms(); getTvSeries(); }}>Cerca</button>
                </div>
            </nav>
        </>
    )
}

export default AppHeader;