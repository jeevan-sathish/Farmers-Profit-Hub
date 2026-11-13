import { Route, Routes } from "react-router-dom";
import Home from "../layouts/Home";
import About from "../layouts/About";
import AuthPage from "../features/auth/pages/AuthPage";

const AppRoute: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </div>
  );
};

export default AppRoute;
