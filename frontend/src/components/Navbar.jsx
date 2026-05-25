import { Link, useLocation } from "react-router-dom";

const Navbar = () => {

  const location = useLocation();

  const currentPath = location.pathname;

  const playersPage =
    currentPath === "/players" ||
    currentPath.startsWith("/players/");

  const addPlayerPage =
    currentPath === "/players/add";

  return (

    <nav
      className="
        sticky
        top-0
        z-50
        flex
        items-center
        justify-between
        px-6
        h-16
        bg-[#07111f]/80
        backdrop-blur-xl
        border-b
        border-white/10
      "
    >

      {/* Logo */}

      <Link
        to="/players"
        className="flex items-center gap-3"
      >

        <div
          className="
            w-10
            h-10
            rounded-xl
            bg-gradient-to-br
            from-cyan-400
            to-teal-500
            flex
            items-center
            justify-center
          "
        >

          <span className="text-xl">
            🏏
          </span>

        </div>

        <h1
          className="
            text-2xl
            font-black
            text-cyan-400
          "
        >
          CricketZone
        </h1>

      </Link>

      {/* Center Menu */}

      <div
        className="
          hidden
          md:flex
          items-center
          gap-3
          bg-white/5
          border
          border-white/10
          rounded-2xl
          px-3
          py-2
        "
      >

        <Link
          to="/players"
          className={
            playersPage && !addPlayerPage
              ? "bg-cyan-500/20 text-cyan-400 px-4 py-2 rounded-xl"
              : "text-gray-400 px-4 py-2"
          }
        >

          Players

        </Link>

      </div>

      {/* Add Player Button */}

      <Link
        to="/players/add"
        className="
          flex
          items-center
          gap-2
          bg-cyan-400
          text-black
          px-5
          py-2
          rounded-xl
          font-bold
        "
      >

        <span>+</span>

        <span>Add Player</span>

      </Link>

    </nav>

  );
};

export default Navbar;