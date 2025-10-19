import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";
import StudentDashboard from "./pages/student/StudentDashboard";
import CareerPage from "./pages/student/CareerPage";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
import LearningPaths from "./pages/quizzes/LearningPaths";
import QuizePage from "./pages/quizzes/QuizePage";
import HomePage from "./pages/home/HomePage";
import TutorDashboard from "./pages/tutor/TutorDashboard";

function App() {
  const { authUser } = useAuthContext();

  return (
    <>
      {/* Main container */}
      <div className="main w-full min-h-screen relative z-1 flex flex-col">
        <Header />
        <Routes>
          {/* Home route  */}
          <Route path="/" element={<HomePage />} />
          {/* auth routes  */}
          <Route path="/auth">
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          {/* studetn route  */}
          <Route path="/student">
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="career" element={<CareerPage />} />
            <Route
              path="learning-path"
              element={authUser ? <LearningPaths /> : <Login />}
            />

            <Route
              path="quizzes/:topicName"
              element={authUser ? <QuizePage /> : <Login />}
            />
          </Route>
          {/* teacher  */}
          <Route path="/tutor">
            <Route path="dashboard" element={<TutorDashboard />} />
          </Route>
          {/* admin  */}
          <Route path="/admin">
            <Route path="dashboard" element={<h1>Admin Dashboard</h1>} />
          </Route>
          <Route
            path="*"
            element={<h1 className="text-red-700">Page Not Found</h1>}
          />{" "}
          {/* Catch-all for undefined routes */}
        </Routes>
        <Toaster />
        <Footer />
      </div>
    </>
  );
}

export default App;
