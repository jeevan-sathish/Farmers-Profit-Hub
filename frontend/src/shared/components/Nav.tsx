import { Link } from "react-router-dom";

const Nav: React.FC = () => {
  return (
    <nav className="w-full h-12 ">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/auth">Auth</Link>
    </nav>
  );
};

export default Nav;
