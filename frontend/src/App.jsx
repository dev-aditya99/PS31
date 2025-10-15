import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <>
    <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<h1 className="text-red-700">Page Not Found</h1>} />{" "}
        {/* Catch-all for undefined routes */}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
