import React from "react";
import { Link } from "react-router-dom";

const ClipboardList = (props) => (
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
    <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <path d="M12 11h4" />
    <path d="M12 16h4" />
    <path d="M8 11h.01" />
    <path d="M8 16h.01" />
  </svg>
);
const Briefcase = (props) => (
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
    <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const BarChart = (props) => (
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
    <line x1="12" x2="12" y1="20" y2="10" />
    <line x1="18" x2="18" y1="20" y2="4" />
    <line x1="6" x2="6" y1="20" y2="16" />
  </svg>
);

const StudentDashboard = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Welcome, Student!
        </h1>
        <p className="text-lg text-gray-600 mb-10">
          Here's your personalized learning dashboard.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Content: Progress UI */}
          <div className="lg:col-span-2 bg-white p-8 rounded-xl shadow-md">
            <h3 className="font-bold text-2xl mb-6 text-gray-800">
              Progress Overview
            </h3>
            <div className="mb-8">
              <h4 className="font-semibold text-lg text-gray-700 mb-3">
                Performance Graph
              </h4>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <BarChart className="w-16 h-16 text-gray-400" />
                <p className="ml-4 text-gray-500">Student progress.</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-lg text-gray-700 mb-3">
                Weak Areas to Focus On
              </h4>
              <div className="flex flex-wrap gap-2">
                <span className="inline-block bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full">
                  React Hooks
                </span>
                <span className="inline-block bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full">
                  Node.js Async
                </span>
                <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                  CSS Grid
                </span>
              </div>
            </div>
          </div>

          {/* Sidebar Cards */}
          <div className="space-y-8">
            {/* Card 1: Take Quiz */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow flex flex-col h-full">
              <ClipboardList className="w-10 h-10 text-blue-600 mb-3" />
              <h3 className="font-bold text-xl mb-2 text-gray-800">
                Take a Quiz
              </h3>
              <p className="text-gray-600 mb-4 flex-grow">
                Challenge yourself with MCQs and beat the timer to sharpen your
                skills.
              </p>
              <Link
                to="/student/quiz"
                className="mt-auto block text-center font-bold text-white bg-blue-600 rounded-lg py-2.5 hover:bg-blue-700 transition-all"
              >
                Start Quiz
              </Link>
            </div>

            {/* Card 2: Career Suggestions */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow flex flex-col h-full">
              <Briefcase className="w-10 h-10 text-blue-600 mb-3" />
              <h3 className="font-bold text-xl mb-2 text-gray-800">
                Career Suggestions
              </h3>
              <p className="text-gray-600 mb-4 flex-grow">
                Explore suggested careers and see how your skills match up with
                industry demands.
              </p>
              <Link
                to="/student/career"
                className="mt-auto block text-center font-bold text-white bg-blue-600 rounded-lg py-2.5 hover:bg-blue-700 transition-all"
              >
                Explore Careers
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
