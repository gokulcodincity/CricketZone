import { Link } from "react-router-dom";

const PlayerCard = ({
  player,
  index,
}) => {

  let roleColor =
    "bg-cyan-500";

  let roleIcon = "🏏";

  if (player.role === "Bowler") {

    roleColor = "bg-orange-500";

    roleIcon = "⚡";
  }

  if (player.role === "All-rounder") {

    roleColor = "bg-yellow-500";

    roleIcon = "⭐";
  }

  const isBatsman =
    player.role === "Batsman" ||
    player.role === "All-rounder";

  return (

    <Link
      to={`/players/${player._id}`}
      className="
        block
        bg-white/5
        border
        border-white/10
        rounded-3xl
        p-5
        hover:scale-[1.02]
        transition
        duration-300
      "
    >

      {/* Top */}

      <div className="flex justify-between items-start mb-5">

        <div
          className="
            w-14
            h-14
            rounded-2xl
            bg-cyan-500
            flex
            items-center
            justify-center
            text-white
            text-xl
            font-bold
          "
        >

          {player.name
            ?.split(" ")
            .map((word) => word[0])
            .join("")
            .slice(0, 2)}

        </div>

        <span className="text-3xl">

          🌍

        </span>

      </div>

      {/* Name */}

      <h2
        className="
          text-white
          text-xl
          font-bold
          mb-3
        "
      >

        {player.name}

      </h2>

      {/* Role */}

      <div
        className={`
          inline-flex
          items-center
          gap-2
          ${roleColor}
          text-white
          px-4
          py-2
          rounded-full
          text-sm
          mb-5
        `}
      >

        <span>{roleIcon}</span>

        <span>{player.role}</span>

      </div>

      {/* Stats */}

      <div className="grid grid-cols-2 gap-3 mb-5">

        {isBatsman ? (

          <>
            <div className="bg-white/5 rounded-xl p-3">

              <p className="text-gray-400 text-xs mb-1">
                Runs
              </p>

              <p className="text-cyan-400 text-xl font-bold">

                {player.runs || 0}

              </p>

            </div>

            <div className="bg-white/5 rounded-xl p-3">

              <p className="text-gray-400 text-xs mb-1">
                Average
              </p>

              <p className="text-white text-xl font-bold">

                {player.average || 0}

              </p>

            </div>
          </>

        ) : (

          <>
            <div className="bg-white/5 rounded-xl p-3">

              <p className="text-gray-400 text-xs mb-1">
                Wickets
              </p>

              <p className="text-orange-400 text-xl font-bold">

                {player.wickets || 0}

              </p>

            </div>

            <div className="bg-white/5 rounded-xl p-3">

              <p className="text-gray-400 text-xs mb-1">
                Economy
              </p>

              <p className="text-white text-xl font-bold">

                {player.economy || 0}

              </p>

            </div>
          </>

        )}

      </div>

      {/* Footer */}

      <div
        className="
          flex
          justify-between
          items-center
          border-t
          border-white/10
          pt-4
        "
      >

        <p className="text-gray-400 text-sm">

          {player.matches || 0} Matches

        </p>

        <p className="text-cyan-400 font-semibold text-sm">

          View Profile →

        </p>

      </div>

    </Link>

  );
};

export default PlayerCard;