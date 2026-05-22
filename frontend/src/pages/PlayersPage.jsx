import { useEffect, useState } from "react";

import {
  getPlayers,
  getPlayersByCountry,
} from "../services/apiService";

import PlayerCard from "../components/PlayerCard";

import Loader from "../components/Loader";

import ErrorMessage from "../components/ErrorMessage";


const PlayersPage = () => {

  const [players, setPlayers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  useEffect(() => {

    fetchPlayers();

  }, []);


  const fetchPlayers = async () => {

    try {

      setLoading(true);

      const data = await getPlayers();

      setPlayers(data);

    } catch (err) {

      setError(err.message);

    } finally {

      setLoading(false);
    }
  };


  const handleCountryFilter = async (country) => {

    try {

      setLoading(true);

      const data =
        country === "ALL"
          ? await getPlayers()
          : await getPlayersByCountry(country);

      setPlayers(data);

    } catch (err) {

      setError(err.message);

    } finally {

      setLoading(false);
    }
  };


  if (loading) return <Loader />;

  if (error) return <ErrorMessage message={error} />;


  return (
    <div>
      <h1>Cricket Players</h1>

      {/* Country Filter */}
      <button onClick={() => handleCountryFilter("ALL")}>
        All
      </button>

      <button onClick={() => handleCountryFilter("India")}>
        India
      </button>

      <button onClick={() => handleCountryFilter("Australia")}>
        Australia
      </button>

      <button onClick={() => handleCountryFilter("England")}>
        England
      </button>

      <br />
      <br />

      {/* map() */}
      {players.map((player) => (
        <PlayerCard
          key={player.id || player._id}
          player={player}
        />
      ))}
    </div>
  );
};

export default PlayersPage;