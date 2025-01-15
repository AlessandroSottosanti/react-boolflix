import { Outlet } from "react-router-dom";
import AppHeader from "./AppHeader";
import { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";

function AppLayout() {
  const { query, handleSearch, getShows, handleEnterKey } = useContext(GlobalContext);

  return (
    <>
      <AppHeader
        query={query}
        handleSearch={handleSearch}
        getShows={getShows}
        handleEnterKey={handleEnterKey}
      />
      <Outlet />
    </>
  );
}

export default AppLayout;
