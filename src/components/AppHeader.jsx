
function AppHeader({query, handleSearch, getShows, handleEnterKey}) {
    
    return (
        <>
            <nav className="navbar">
                <div className="logo">
                    <h1>BOOLFLIX</h1>
                </div>
                <div className="">
                    <input name="search" type="text" value={query} placeholder='Cerca...' onKeyUp={(event) => handleEnterKey(event)} onChange={(event) => handleSearch(event)} />
                    <button onClick={() => { getShows(); }}>Cerca</button>
                </div>
            </nav>
        </>
    )
}

export default AppHeader;