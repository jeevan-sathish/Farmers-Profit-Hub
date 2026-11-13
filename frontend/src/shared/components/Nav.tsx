import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hook";

const Nav: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);
  return (
    <nav className="w-full h-12 ">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/auth">Auth</Link>
      <h1 className="text-green-300">
        <b>{user?.name}</b>
      </h1>
    </nav>
  );
};

export default Nav;
