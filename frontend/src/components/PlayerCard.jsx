import { Link } from "react-router-dom";

const PlayerCard = ({ player }) => {

  return (
    <div
      style={{
        border: "1px solid gray",
        padding: "15px",
        marginBottom: "15px",
      }}
    >
      <h2>{player.name}</h2>

      <p>Country: {player.country}</p>

      <p>Role: {player.role}</p>

      {/* Extra Requirement */}
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

      <Link to={`/players/${player.id || player._id}`}>
        View Details
      </Link>
    </div>
  );
};

export default PlayerCard;