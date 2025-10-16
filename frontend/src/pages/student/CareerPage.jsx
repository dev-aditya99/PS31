import React from "react";
import PlaceholderPage from "../../components/placeholders/PlaceholderPage";

const Target = (props) => (
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
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const CareerPage = () => {
  return (
    <PlaceholderPage title="Career Suggestions">
      <p className="text-lg text-gray-600 mb-8">
        Here you will find job roles and career paths suitable for your skills.
      </p>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-md text-left">
          <Target className="w-8 h-8 text-blue-600 mb-3" />
          <h4 className="font-bold text-lg">Frontend Developer</h4>
          <p className="text-gray-600">
            Build beautiful and responsive user interfaces.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md text-left">
          <Target className="w-8 h-8 text-blue-600 mb-3" />
          <h4 className="font-bold text-lg">Backend Developer</h4>
          <p className="text-gray-600">
            Power applications with robust server-side logic.
          </p>
        </div>
      </div>
    </PlaceholderPage>
  );
};

export default CareerPage;
