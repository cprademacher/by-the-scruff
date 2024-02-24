import { Outlet } from "react-router-dom";
import Header2 from "./components/Header2.jsx";
import Footer from "./components/Footer.jsx";
import "./App.css";

function App() {
  return (
    <>
      <Header2 />
      <div className="container">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default App;
