import {
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";

import {
  getPlayers,
  getPlayersByCountry,
} from "../services/apiService";

import PlayerCard from "../components/PlayerCard";

import Loader from "../components/Loader";

import ErrorMessage from "../components/ErrorMessage";

const PlayersPage = () => {

  const [players, setPlayers] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [activeCountry, setActiveCountry] =
    useState("ALL");

  useEffect(() => {

    fetchPlayers();

  }, []);

  const fetchPlayers = async () => {

    try {

      setLoading(true);

      setError("");

      const data =
        await getPlayers();

      setPlayers(data);

    } catch (err) {

      if (
        err.message === "Network Error"
      ) {

        setError(
          "Backend server is not running"
        );

      } else {

        setError(
          "Failed to fetch players"
        );
      }

    } finally {

      setLoading(false);
    }
  };

  const handleFilter = async (
    country
  ) => {

    try {

      setLoading(true);

      setError("");

      setActiveCountry(country);

      let data = [];

      if (country === "ALL") {

        data = await getPlayers();

      } else {

        data =
          await getPlayersByCountry(
            country
          );
      }

      setPlayers(data);

    } catch (err) {

      setError(
        "Filter failed"
      );

    } finally {

      setLoading(false);
    }
  };

  const countries =
    [...new Set(
      players.map(
        (player) => player.country
      )
    )].length;

  const batsmen =
    players.filter(
      (player) =>
        player.role === "Batsman" ||
        player.role === "All-rounder"
    ).length;

  const bowlers =
    players.filter(
      (player) =>
        player.role === "Bowler" ||
        player.role === "All-rounder"
    ).length;

  if (loading) {

    return <Loader />;
  }

  if (error) {

    return (
      <ErrorMessage
        message={error}
        onRetry={fetchPlayers}
      />
    );
  }

  return (

    <div className="min-h-screen bg-[#020617] text-white px-5 py-10">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="mb-10">

          <p
            className="
              text-cyan-400
              text-sm
              font-bold
              tracking-[4px]
              mb-3
            "
          >

            SQUAD DATABASE

          </p>

          <h1
            className="
              text-5xl
              md:text-6xl
              font-black
              mb-3
            "
          >

            Cricket Players

          </h1>

          <p className="text-gray-400">

            Explore profiles and stats
            of world-class cricketers.

          </p>

        </div>

        {/* Stats */}

        <div
          className="
            grid
            grid-cols-2
            md:grid-cols-4
            gap-5
            mb-10
          "
        >

          <div
            className="
              bg-white/5
              border
              border-white/10
              rounded-3xl
              p-5
            "
          >

            <p className="text-gray-400 text-sm mb-2">
              Total Players
            </p>

            <h2
              className="
                text-4xl
                font-black
                text-cyan-400
              "
            >

              {players.length}

            </h2>

          </div>

          <div
            className="
              bg-white/5
              border
              border-white/10
              rounded-3xl
              p-5
            "
          >

            <p className="text-gray-400 text-sm mb-2">
              Countries
            </p>

            <h2
              className="
                text-4xl
                font-black
                text-purple-400
              "
            >

              {countries}

            </h2>

          </div>

          <div
            className="
              bg-white/5
              border
              border-white/10
              rounded-3xl
              p-5
            "
          >

            <p className="text-gray-400 text-sm mb-2">
              Batsmen
            </p>

            <h2
              className="
                text-4xl
                font-black
                text-yellow-400
              "
            >

              {batsmen}

            </h2>

          </div>

          <div
            className="
              bg-white/5
              border
              border-white/10
              rounded-3xl
              p-5
            "
          >

            <p className="text-gray-400 text-sm mb-2">
              Bowlers
            </p>

            <h2
              className="
                text-4xl
                font-black
                text-orange-400
              "
            >

              {bowlers}

            </h2>

          </div>

        </div>

        {/* Filters */}

        <div className="mb-10">

          <p
            className="
              text-gray-400
              text-sm
              mb-4
            "
          >

            Filter by Country

          </p>

          <div className="flex flex-wrap gap-3">

            <button
              onClick={() =>
                handleFilter("ALL")
              }
              className={
                activeCountry === "ALL"
                  ? "bg-cyan-400 text-black px-5 py-3 rounded-2xl font-bold"
                  : "bg-white/5 border border-white/10 px-5 py-3 rounded-2xl"
              }
            >

              🌍 All

            </button>

            <button
              onClick={() =>
                handleFilter("India")
              }
              className={
                activeCountry === "India"
                  ? "bg-cyan-400 text-black px-5 py-3 rounded-2xl font-bold"
                  : "bg-white/5 border border-white/10 px-5 py-3 rounded-2xl"
              }
            >

              🇮🇳 India

            </button>

            <button
              onClick={() =>
                handleFilter("Australia")
              }
              className={
                activeCountry === "Australia"
                  ? "bg-cyan-400 text-black px-5 py-3 rounded-2xl font-bold"
                  : "bg-white/5 border border-white/10 px-5 py-3 rounded-2xl"
              }
            >

              🇦🇺 Australia

            </button>

            <button
              onClick={() =>
                handleFilter("England")
              }
              className={
                activeCountry === "England"
                  ? "bg-cyan-400 text-black px-5 py-3 rounded-2xl font-bold"
                  : "bg-white/5 border border-white/10 px-5 py-3 rounded-2xl"
              }
            >

              🏴 England

            </button>

          </div>

        </div>

        {/* Top Bar */}

        <div
          className="
            flex
            justify-between
            items-center
            flex-wrap
            gap-4
            mb-8
          "
        >

          <p className="text-gray-400">

            Showing
            {" "}
            <span className="text-white font-bold">
              {players.length}
            </span>
            {" "}
            players

          </p>

          <Link
            to="/players/add"
            className="
              bg-cyan-400
              text-black
              px-5
              py-3
              rounded-2xl
              font-bold
            "
          >

            + Add Player

          </Link>

        </div>

        {/* Empty State */}

        {players.length === 0 ? (

          <div
            className="
              text-center
              py-20
            "
          >

            <div className="text-7xl mb-5">
              🏏
            </div>

            <h2
              className="
                text-3xl
                font-bold
                mb-3
              "
            >

              No Players Found

            </h2>

            <p className="text-gray-400 mb-8">

              Try another filter
              or add new players.

            </p>

            <Link
              to="/players/add"
              className="
                bg-cyan-400
                text-black
                px-6
                py-4
                rounded-2xl
                font-bold
              "
            >

              + Add First Player

            </Link>

          </div>

        ) : (

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-4
              gap-5
            "
          >

            {players.map(
              (player, index) => (

                <PlayerCard
                  key={player._id}
                  player={player}
                  index={index}
                />

              )
            )}

          </div>

        )}

      </div>

    </div>

  );
};

export default PlayersPage;