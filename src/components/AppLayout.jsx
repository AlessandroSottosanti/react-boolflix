import { Outlet } from "react-router-dom";

function AppLayout({query, setQuery, getFilms, getTvSeries}) {
    
    return (
        <>
            <nav className="navbar">
                <div>
                    <input type="text" value={query} placeholder='Cerca...' onChange={(event) => setQuery(event.target.value)} />
                    <button onClick={() => { getFilms(); getTvSeries(); }}>invia</button>
                </div>
            </nav>
        </>
    )
}

export default AppLayout;