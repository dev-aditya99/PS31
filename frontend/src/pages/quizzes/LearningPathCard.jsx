import React from "react";
import { useNavigate } from "react-router-dom";

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

const LearningPathCard = ({ path, onPathSelect }) => {
  const colors = {
    blue: "from-blue-500 to-blue-600",
    yellow: "from-yellow-500 to-yellow-600",
    indigo: "from-indigo-500 to-indigo-600",
    green: "from-green-500 to-green-600",
  };

  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/student/quizzes/${path?.title}`)}
      className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden flex flex-col"
    >
      <div className={`p-6 bg-gradient-to-br ${colors[path.color]} text-white`}>
        <h3 className="text-2xl font-bold">{path.title}</h3>
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <p className="text-gray-600 mb-4 flex-grow">{path.description}</p>
        <div className="flex justify-between items-center text-sm text-gray-500 mt-4">
          <span className="flex items-center">
            <BookOpenIcon className="w-4 h-4 mr-2" />
            {path.quizCount} Quizzes
          </span>
          <span className="font-semibold text-blue-600 group-hover:underline">
            Start Learning →
          </span>
        </div>
      </div>
    </div>
  );
};

export default LearningPathCard;
