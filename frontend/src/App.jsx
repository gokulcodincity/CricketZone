import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar         from "./components/Navbar";
import PlayersPage     from "./pages/PlayersPage";
import PlayerDetailPage from "./pages/PlayerDetailPage";
import AddPlayerPage   from "./pages/AddPlayerPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/"                element={<Navigate to="/players" />} />
        <Route path="/players"         element={<PlayersPage />} />
        <Route path="/players/add"     element={<AddPlayerPage />} />
        <Route path="/players/:id"     element={<PlayerDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;