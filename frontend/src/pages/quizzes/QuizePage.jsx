import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";

// --- ICONS (as SVG components) --- //

const BookOpenIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
  </svg>
);

const ArrowLeftIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m12 19-7-7 7-7" />
    <path d="M19 12H5" />
  </svg>
);

const QuizePage = () => {
  // contexts
  const { authUser } = useAuthContext();

  // states
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const URL = useParams();

  const quizzesData = {
    "react-fundamentals": [
      {
        id: 1,
        question: "What is JSX?",
        options: [
          "A JavaScript syntax extension",
          "A CSS preprocessor",
          "A database query language",
          "A templating engine",
        ],
        answer: "A JavaScript syntax extension",
      },
      {
        id: 2,
        question:
          "Which hook is used to manage state in a functional component?",
        options: ["useEffect", "useState", "useContext", "useReducer"],
        answer: "useState",
      },
      {
        id: 3,
        question: "How do you pass data from a parent to a child component?",
        options: ["State", "Context", "Props", "Reducer"],
        answer: "Props",
      },
    ],
    "js-advanced": [
      {
        id: 1,
        question: "What does `async/await` help with?",
        options: [
          "Styling components",
          "Managing asynchronous operations",
          "Creating loops",
          "Defining variables",
        ],
        answer: "Managing asynchronous operations",
      },
      {
        id: 2,
        question:
          "A closure gives you access to an outer function’s scope from an inner function.",
        options: ["True", "False"],
        answer: "True",
      },
    ],
    "css-mastery": [
      {
        id: 1,
        question: "Which property is used to create a flexible layout?",
        options: [
          "display: grid",
          "display: block",
          "display: inline",
          "display: flex",
        ],
        answer: "display: flex",
      },
    ],
    "node-express": [
      {
        id: 1,
        question: "What is Express.js?",
        options: [
          "A React library",
          "A front-end framework",
          "A back-end web application framework for Node.js",
          "A database",
        ],
        answer: "A back-end web application framework for Node.js",
      },
    ],
  };

  // generateQuestions
  const generateQuestions = async (topicName) => {
    try {
      setLoading(true);
      const res = await fetch(
        "http://localhost:8080/api/adaptive/next/" + authUser?._id,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ topic: topicName }),
          credentials: "include",
        }
      );

      const data = await res.json();
      setQuizzes(data?.questions);

      console.log(data);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
      toast.error("Failed to load quizzes. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  //   useEffect
  useEffect(() => {
    const topicName = URL.topicName;
    if (!topicName) return;

    if (topicName) {
      generateQuestions(topicName);
    }
  }, []);

  useEffect(() => {
    console.log(quizzes);
    if (quizzes.length > 0) {
      setCurrentQuestion(quizzes[currentQuestionIndex]);
    }
  }, [quizzes, currentQuestionIndex]);

  //   handle answer selection
  const handleAnswerSelect = (option) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: option,
    });
  };

  //   handle next question
  const handleNext = () => {
    if (currentQuestionIndex < quizzes.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  //   handle back
  const onBack = () => {
    window.location.href = "/student/learning-path";
  };

  if (showResults) {
    const score = Object.keys(selectedAnswers).reduce((acc, index) => {
      if (selectedAnswers[index] === quizzes[index].answer) {
        return acc + 1;
      }
      return acc;
    }, 0);

    return (
      <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-2xl text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Quiz Complete!
        </h2>
        <p className="text-xl text-gray-600 mb-6">
          You scored <span className="font-bold text-blue-600">{score}</span>{" "}
          out of{" "}
          <span className="font-bold text-blue-600">{quizzes.length}</span>
        </p>
        <button
          onClick={onBack}
          className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300"
        >
          Back to Learning Paths
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        <span className="ml-3 text-gray-700 font-medium">
          Loading quizzes...
        </span>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto my-8 ">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-semibold mb-6 transition-colors"
      >
        <ArrowLeftIcon className="w-5 h-5" />
        Back to Paths
      </button>

      {/* quiz box  */}
      <div className="min-w-[500px] bg-white p-8 rounded-xl shadow-2xl">
        {/* question  */}
        <div className="mb-6">
          <p className="text-sm text-gray-500">
            Question {currentQuestionIndex + 1} of {quizzes.length}{" "}
            <span className="italic font-bold">
              #{currentQuestion?.skillTag}
            </span>
          </p>
          <h2 className="text-2xl font-bold text-gray-800 mt-1">
            {currentQuestion.question}
          </h2>
        </div>

        {/* options  */}
        <div className="space-y-4 mb-8">
          {currentQuestion?.options?.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(option)}
              className={`block w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                selectedAnswers[currentQuestionIndex] === option
                  ? "bg-blue-100 border-blue-500 text-blue-800 font-semibold"
                  : "bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-400"
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        {/* navigatio buttons */}
        <div className="w-full py-4 px-3 flex items-center justify-between">
          {/* prev question  */}
          <button
            onClick={handlePrevious}
            disabled={quizzes.length == 1 || currentQuestionIndex === 0}
            className="text-gray-600 font-medium py-3 px-6 rounded-lg hover:text-gray-800 hover:underline transition-colors duration-300 disabled:text-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <GrFormPreviousLink />
            Previous
          </button>

          {/* next question */}
          <button
            onClick={handleNext}
            disabled={
              quizzes.length == 1 || currentQuestionIndex === quizzes.length - 1
            }
            className="text-gray-600 font-medium py-3 px-6 rounded-lg hover:text-gray-800 hover:underline transition-colors duration-300 disabled:text-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            Next
            <GrFormNextLink />
          </button>
        </div>

        {/* go forward button  */}
        <div className="mt-4 w-full flex items-center justify-center">
          <button
            disabled={selectedAnswers.length == 0}
            className="bg-blue-700 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-lg px-8 py-3 rounded-lg shadow-md hover:opacity-90 transition disabled:cursor-not-allowed disabled:opacity-50"
          >
            Go Forward
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizePage;
