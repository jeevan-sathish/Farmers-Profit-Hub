import AppRoute from "../routes/AppRoute";
import Footer from "../shared/components/Footer";
import Nav from "../shared/components/Nav";

const App: React.FC = () => {
  return (
    <div>
      <Nav />
      <AppRoute />
      <Footer />
    </div>
  );
};

export default App;
