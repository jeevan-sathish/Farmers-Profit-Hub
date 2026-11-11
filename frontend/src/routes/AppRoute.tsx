import { Route, Routes } from "react-router-dom";
import Home from "../layouts/Home";
import About from "../layouts/About";

const AppRoute: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
};

export default AppRoute;
