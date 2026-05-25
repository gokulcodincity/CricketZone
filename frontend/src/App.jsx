import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";

import PlayersPage from "./pages/PlayersPage";

import PlayerDetailPage from "./pages/PlayerDetailPage";

import AddPlayerPage from "./pages/AddPlayerPage";

import EditPlayerPage from "./pages/EditPlayerPage";

function App() {

  return (

    <BrowserRouter>

      {/* Navbar */}

      <Navbar />

      {/* Routes */}

      <Routes>

        {/* Home */}

        <Route
          path="/"
          element={
            <Navigate to="/players" />
          }
        />

        {/* Players Page */}

        <Route
          path="/players"
          element={<PlayersPage />}
        />

        {/* Add Player */}

        <Route
          path="/players/add"
          element={<AddPlayerPage />}
        />

        {/* Player Details */}

        <Route
          path="/players/:id"
          element={
            <PlayerDetailPage />
          }
        />

        {/* Edit Player */}

        <Route
          path="/players/:id/edit"
          element={
            <EditPlayerPage />
          }
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;