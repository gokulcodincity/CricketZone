import {
  useParams,
  Link,
  useNavigate,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import {
  getPlayerById,
  deletePlayer,
} from "../services/apiService";

import Loader from "../components/Loader";

import ErrorMessage from "../components/ErrorMessage";

const PlayerDetailPage = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [player, setPlayer] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [showDelete, setShowDelete] =
    useState(false);

  const [deleting, setDeleting] =
    useState(false);

  useEffect(() => {

    fetchPlayer();

  }, [id]);

  const fetchPlayer = async () => {

    try {

      setLoading(true);

      setError("");

      const data =
        await getPlayerById(id);

      setPlayer(data);

    } catch (err) {

      setError(
        "Player not found"
      );

    } finally {

      setLoading(false);
    }
  };

  const handleDelete = async () => {

    try {

      setDeleting(true);

      await deletePlayer(id);

      navigate("/players");

    } catch (err) {

      setError(
        "Failed to delete player"
      );

    } finally {

      setDeleting(false);

      setShowDelete(false);
    }
  };

  if (loading) {

    return <Loader />;
  }

  if (error) {

    return (
      <ErrorMessage
        message={error}
        onRetry={fetchPlayer}
      />
    );
  }

  const isBatsman =
    player.role === "Batsman" ||
    player.role === "All-rounder";

  const isBowler =
    player.role === "Bowler" ||
    player.role === "All-rounder";

  let roleColor =
    "bg-cyan-500";

  let roleIcon = "🏏";

  if (player.role === "Bowler") {

    roleColor = "bg-orange-500";

    roleIcon = "⚡";
  }

  if (
    player.role === "All-rounder"
  ) {

    roleColor = "bg-yellow-500";

    roleIcon = "⭐";
  }

  if (
    player.role === "Wicket-keeper"
  ) {

    roleColor = "bg-purple-500";

    roleIcon = "🧤";
  }

  return (

    <div className="min-h-screen bg-[#020617] text-white px-5 py-10">

      <div className="max-w-5xl mx-auto">

        {/* Back Button */}

        <Link
          to="/players"
          className="
            inline-block
            text-cyan-400
            mb-8
          "
        >

          ← Back to Players

        </Link>

        {/* Main Card */}

        <div
          className="
            bg-white/5
            border
            border-white/10
            rounded-[35px]
            p-8
            mb-8
          "
        >

          {/* Top */}

          <div
            className="
              flex
              justify-between
              items-start
              flex-wrap
              gap-5
              mb-10
            "
          >

            {/* Left */}

            <div className="flex gap-5">

              {/* Avatar */}

              <div
                className={`
                  w-24
                  h-24
                  rounded-3xl
                  ${roleColor}
                  flex
                  items-center
                  justify-center
                  text-3xl
                  font-black
                `}
              >

                {player.name
                  ?.split(" ")
                  .map((word) => word[0])
                  .join("")
                  .slice(0, 2)}

              </div>

              {/* Name */}

              <div>

                <h1
                  className="
                    text-5xl
                    font-black
                    mb-3
                  "
                >

                  {player.name}

                </h1>

                <div className="flex gap-3 flex-wrap">

                  <div
                    className={`
                      ${roleColor}
                      px-4
                      py-2
                      rounded-full
                      text-sm
                      font-bold
                    `}
                  >

                    {roleIcon}
                    {" "}
                    {player.role}

                  </div>

                  <div
                    className="
                      bg-white/5
                      px-4
                      py-2
                      rounded-full
                      text-sm
                    "
                  >

                    🌍 {player.country}

                  </div>

                </div>

              </div>

            </div>

            {/* Buttons */}

            <div className="flex gap-3">

              <Link
                to={`/players/${id}/edit`}
                className="
                  bg-cyan-400
                  text-black
                  px-5
                  py-3
                  rounded-2xl
                  font-bold
                "
              >

                Edit

              </Link>

              <button
                onClick={() =>
                  setShowDelete(true)
                }
                className="
                  bg-red-500
                  text-white
                  px-5
                  py-3
                  rounded-2xl
                  font-bold
                "
              >

                Delete

              </button>

            </div>

          </div>

          {/* Stats */}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

            <div
              className="
                bg-white/5
                rounded-2xl
                p-5
              "
            >

              <p className="text-gray-400 text-sm mb-2">
                Matches
              </p>

              <h2
                className="
                  text-4xl
                  font-black
                  text-cyan-400
                "
              >

                {player.matches}

              </h2>

            </div>

            {isBatsman && (

              <>
                <div
                  className="
                    bg-white/5
                    rounded-2xl
                    p-5
                  "
                >

                  <p className="text-gray-400 text-sm mb-2">
                    Runs
                  </p>

                  <h2
                    className="
                      text-4xl
                      font-black
                      text-yellow-400
                    "
                  >

                    {player.runs}

                  </h2>

                </div>

                <div
                  className="
                    bg-white/5
                    rounded-2xl
                    p-5
                  "
                >

                  <p className="text-gray-400 text-sm mb-2">
                    Average
                  </p>

                  <h2
                    className="
                      text-4xl
                      font-black
                    "
                  >

                    {player.average}

                  </h2>

                </div>
              </>

            )}

            {isBowler && (

              <>
                <div
                  className="
                    bg-white/5
                    rounded-2xl
                    p-5
                  "
                >

                  <p className="text-gray-400 text-sm mb-2">
                    Wickets
                  </p>

                  <h2
                    className="
                      text-4xl
                      font-black
                      text-orange-400
                    "
                  >

                    {player.wickets}

                  </h2>

                </div>

                <div
                  className="
                    bg-white/5
                    rounded-2xl
                    p-5
                  "
                >

                  <p className="text-gray-400 text-sm mb-2">
                    Economy
                  </p>

                  <h2
                    className="
                      text-4xl
                      font-black
                    "
                  >

                    {player.economy}

                  </h2>

                </div>
              </>

            )}

          </div>

        </div>

        {/* Profile Info */}

        <div
          className="
            bg-white/5
            border
            border-white/10
            rounded-3xl
            p-6
          "
        >

          <h2
            className="
              text-2xl
              font-bold
              mb-6
            "
          >

            Player Profile

          </h2>

          <div className="grid grid-cols-2 gap-5">

            <div>

              <p className="text-gray-400 mb-2">
                Full Name
              </p>

              <p className="font-bold">
                {player.name}
              </p>

            </div>

            <div>

              <p className="text-gray-400 mb-2">
                Country
              </p>

              <p className="font-bold">
                {player.country}
              </p>

            </div>

            <div>

              <p className="text-gray-400 mb-2">
                Role
              </p>

              <p className="font-bold">
                {player.role}
              </p>

            </div>

            <div>

              <p className="text-gray-400 mb-2">
                Experience
              </p>

              <p className="font-bold">
                {player.matches} Matches
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Delete Modal */}

      {showDelete && (

        <div
          className="
            fixed
            inset-0
            bg-black/70
            flex
            justify-center
            items-center
            px-5
          "
        >

          <div
            className="
              bg-[#111827]
              border
              border-white/10
              rounded-3xl
              p-8
              max-w-md
              w-full
            "
          >

            <div
              className="
                text-center
              "
            >

              <div className="text-6xl mb-5">
                ⚠️
              </div>

              <h2
                className="
                  text-3xl
                  font-black
                  mb-3
                "
              >

                Delete Player?

              </h2>

              <p className="text-gray-400 mb-8">

                Are you sure you want to
                delete
                {" "}
                <span className="text-white font-bold">
                  {player.name}
                </span>
                ?

              </p>

              <div className="flex gap-4">

                <button
                  onClick={() =>
                    setShowDelete(false)
                  }
                  className="
                    flex-1
                    bg-white/5
                    border
                    border-white/10
                    py-4
                    rounded-2xl
                  "
                >

                  Cancel

                </button>

                <button
                  onClick={handleDelete}
                  className="
                    flex-1
                    bg-red-500
                    text-white
                    py-4
                    rounded-2xl
                    font-bold
                  "
                >

                  {deleting
                    ? "Deleting..."
                    : "Delete"}

                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>

  );
};

export default PlayerDetailPage;