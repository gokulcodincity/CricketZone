import { useState, useEffect } from "react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  getPlayerById,
  updatePlayer,
} from "../services/apiService";

import Loader from "../components/Loader";

const EditPlayerPage = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      name: "",
      country: "",
      role: "",
      matches: "",
      runs: "",
      average: "",
      wickets: "",
      economy: "",
    });

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  useEffect(() => {

    fetchPlayer();

  }, []);

  const fetchPlayer = async () => {

    try {

      setLoading(true);

      const data =
        await getPlayerById(id);

      setFormData({
        name: data.name || "",
        country: data.country || "",
        role: data.role || "",
        matches: data.matches || "",
        runs: data.runs || "",
        average: data.average || "",
        wickets: data.wickets || "",
        economy: data.economy || "",
      });

    } catch (err) {

      setError(
        "Failed to load player"
      );

    } finally {

      setLoading(false);
    }
  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setSaving(true);

      const updatedPlayer = {
        name: formData.name,
        country: formData.country,
        role: formData.role,
        matches: Number(formData.matches),
        runs: formData.runs
          ? Number(formData.runs)
          : null,
        average: formData.average
          ? Number(formData.average)
          : null,
        wickets: formData.wickets
          ? Number(formData.wickets)
          : null,
        economy: formData.economy
          ? Number(formData.economy)
          : null,
      };

      await updatePlayer(
        id,
        updatedPlayer
      );

      navigate(`/players/${id}`);

    } catch (err) {

      setError(
        "Failed to update player"
      );

    } finally {

      setSaving(false);
    }
  };

  const isBatsman =
    formData.role === "Batsman" ||
    formData.role === "All-rounder";

  const isBowler =
    formData.role === "Bowler" ||
    formData.role === "All-rounder";

  if (loading) {

    return <Loader />;
  }

  return (

    <div className="min-h-screen bg-[#020617] text-white px-5 py-10">

      <div className="max-w-3xl mx-auto">

        {/* Back Button */}

        <Link
          to={`/players/${id}`}
          className="
            inline-block
            text-cyan-400
            mb-8
          "
        >

          ← Back to Player

        </Link>

        {/* Heading */}

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

            EDIT PLAYER

          </p>

          <h1
            className="
              text-5xl
              font-black
              mb-3
            "
          >

            Edit Player

          </h1>

          <p className="text-gray-400">

            Update player information.

          </p>

        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="space-y-8"
        >

          {/* Basic Info */}

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
                text-xl
                font-bold
                mb-5
              "
            >

              Basic Information

            </h2>

            <div className="space-y-5">

              <input
                type="text"
                name="name"
                placeholder="Player Name"
                value={formData.name}
                onChange={handleChange}
                className="
                  w-full
                  bg-[#07111f]
                  border
                  border-white/10
                  rounded-2xl
                  p-4
                "
              />

              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="
                  w-full
                  bg-[#07111f]
                  border
                  border-white/10
                  rounded-2xl
                  p-4
                "
              >

                <option value="">
                  Select Country
                </option>

                <option value="India">
                  India
                </option>

                <option value="Australia">
                  Australia
                </option>

                <option value="England">
                  England
                </option>

                <option value="Pakistan">
                  Pakistan
                </option>

              </select>

              <input
                type="number"
                name="matches"
                placeholder="Matches"
                value={formData.matches}
                onChange={handleChange}
                className="
                  w-full
                  bg-[#07111f]
                  border
                  border-white/10
                  rounded-2xl
                  p-4
                "
              />

            </div>

          </div>

          {/* Role */}

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
                text-xl
                font-bold
                mb-5
              "
            >

              Select Role

            </h2>

            <div className="grid grid-cols-2 gap-4">

              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    role: "Batsman",
                  })
                }
                className="
                  bg-cyan-500/10
                  border
                  border-cyan-500/20
                  rounded-2xl
                  p-5
                "
              >

                🏏 Batsman

              </button>

              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    role: "Bowler",
                  })
                }
                className="
                  bg-orange-500/10
                  border
                  border-orange-500/20
                  rounded-2xl
                  p-5
                "
              >

                ⚡ Bowler

              </button>

              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    role: "All-rounder",
                  })
                }
                className="
                  bg-yellow-500/10
                  border
                  border-yellow-500/20
                  rounded-2xl
                  p-5
                "
              >

                ⭐ All-rounder

              </button>

              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    role: "Wicket-keeper",
                  })
                }
                className="
                  bg-purple-500/10
                  border
                  border-purple-500/20
                  rounded-2xl
                  p-5
                "
              >

                🧤 Wicket Keeper

              </button>

            </div>

          </div>

          {/* Stats */}

          {formData.role && (

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
                  text-xl
                  font-bold
                  mb-5
                "
              >

                Player Stats

              </h2>

              <div className="grid grid-cols-2 gap-5">

                {isBatsman && (

                  <>
                    <input
                      type="number"
                      name="runs"
                      placeholder="Runs"
                      value={formData.runs}
                      onChange={handleChange}
                      className="
                        bg-[#07111f]
                        border
                        border-white/10
                        rounded-2xl
                        p-4
                      "
                    />

                    <input
                      type="number"
                      name="average"
                      placeholder="Average"
                      value={formData.average}
                      onChange={handleChange}
                      className="
                        bg-[#07111f]
                        border
                        border-white/10
                        rounded-2xl
                        p-4
                      "
                    />
                  </>

                )}

                {isBowler && (

                  <>
                    <input
                      type="number"
                      name="wickets"
                      placeholder="Wickets"
                      value={formData.wickets}
                      onChange={handleChange}
                      className="
                        bg-[#07111f]
                        border
                        border-white/10
                        rounded-2xl
                        p-4
                      "
                    />

                    <input
                      type="number"
                      name="economy"
                      placeholder="Economy"
                      value={formData.economy}
                      onChange={handleChange}
                      className="
                        bg-[#07111f]
                        border
                        border-white/10
                        rounded-2xl
                        p-4
                      "
                    />
                  </>

                )}

              </div>

            </div>

          )}

          {/* Error */}

          {error && (

            <div
              className="
                bg-red-500/10
                border
                border-red-500/20
                text-red-400
                rounded-2xl
                p-4
              "
            >

              {error}

            </div>

          )}

          {/* Buttons */}

          <div className="flex gap-4">

            <Link
              to={`/players/${id}`}
              className="
                flex-1
                text-center
                bg-white/5
                border
                border-white/10
                rounded-2xl
                py-4
              "
            >

              Cancel

            </Link>

            <button
              type="submit"
              disabled={saving}
              className="
                flex-1
                bg-cyan-400
                text-black
                rounded-2xl
                py-4
                font-bold
              "
            >

              {saving
                ? "Saving..."
                : "Save Changes"}

            </button>

          </div>

        </form>

      </div>

    </div>

  );
};

export default EditPlayerPage;