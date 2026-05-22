import { useParams } from "react-router-dom";

import { useEffect, useState } from "react";

import { getPlayerById } from "../services/apiService";

import Loader from "../components/Loader";

import ErrorMessage from "../components/ErrorMessage";


const PlayerDetailPage = () => {

  const { id } = useParams();

  const [player, setPlayer] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  useEffect(() => {

    fetchPlayer();

  }, []);


  const fetchPlayer = async () => {

    try {

      setLoading(true);

      const data = await getPlayerById(id);

      setPlayer(data);

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
      <h1>{player.name}</h1>

      <p>Country: {player.country}</p>

      <p>Role: {player.role}</p>

      <p>Matches: {player.matches}</p>

      {player.role === "Batsman" ? (
        <>
          <p>Runs: {player.runs}</p>
          <p>Average: {player.average}</p>
        </>
      ) : (
        <>
          <p>Wickets: {player.wickets}</p>
          <p>Economy: {player.economy}</p>
        </>
      )}
    </div>
  );
};

export default PlayerDetailPage;