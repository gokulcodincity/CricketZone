import { Link } from "react-router-dom";

const Navbar = () => {

  return (
    <div
      style={{
        padding: "20px",
        borderBottom: "1px solid gray",
        marginBottom: "20px",
      }}
    >
      <Link to="/players">
        Players
      </Link>
    </div>
  );
};

export default Navbar;