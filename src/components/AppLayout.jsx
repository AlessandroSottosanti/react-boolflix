import { Outlet } from "react-router-dom";
import AppHeader from "./AppHeader";
import { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";

function AppLayout() {
  const { query, handleSearch, getFilms, getTvSeries } = useContext(GlobalContext);

  return (
    <>
      <AppHeader
        query={query}
        handleSearch={handleSearch}
        getFilms={getFilms}
        getTvSeries={getTvSeries}
      />
      <Outlet />
    </>
  );
}

export default AppLayout;
