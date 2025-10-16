import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";
import StudentDashboard from "./pages/student/StudentDashboard";
import CareerPage from "./pages/student/CareerPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth">
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="/student">
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="career" element={<CareerPage />} />
        </Route>
        <Route
          path="*"
          element={<h1 className="text-red-700">Page Not Found</h1>}
        />{" "}
        {/* Catch-all for undefined routes */}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
