import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header2 from "./components/Header2.jsx";
import Footer from "./components/Footer.jsx";
import "./App.css";

function App() {
  return (
    <>
      <Toaster position="top-center" />
      <Header2 />
      <div className="container content">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default App;
