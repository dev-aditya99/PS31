import React, { useEffect, useState } from "react";
import LearningPathCard from "./LearningPathCard";

const LearningPaths = () => {
  const learningPathsData = [
    {
      id: "react-fundamentals",
      title: "React Fundamentals",
      description:
        "Master the core concepts of React, including components, props, state, and hooks.",
      quizCount: 10,
      icon: "ReactIcon",
      color: "blue",
    },
    {
      id: "js-advanced",
      title: "Advanced JavaScript",
      description:
        "Dive deep into asynchronous JavaScript, closures, prototypes, and modern ES6+ features.",
      quizCount: 15,
      icon: "JsIcon",
      color: "yellow",
    },
    {
      id: "css-mastery",
      title: "CSS Mastery",
      description:
        "Learn advanced CSS techniques like Flexbox, Grid, animations, and responsive design.",
      quizCount: 12,
      icon: "CssIcon",
      color: "indigo",
    },
    {
      id: "node-express",
      title: "Node.js & Express",
      description:
        "Build robust and scalable backend APIs with Node.js and the Express framework.",
      quizCount: 8,
      icon: "NodeIcon",
      color: "green",
    },
  ];

  //   states
  const [paths, setPaths] = useState([]);
  const [selectedPathId, setSelectedPathId] = useState(null);

  // useEffects
  useEffect(() => {
    setPaths(learningPathsData);
  }, []);

  //   functions
  const handlePathSelect = (pathId) => {
    console.log("Backend call with ID:", pathId);
    setSelectedPathId(pathId);
    window.location.href = `/student/quizzes/${pathId}`;
  };

  const handleBackToPaths = () => {
    setSelectedPathId(null);
    setCurrentPage("paths");
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
          Your Learning Journey
        </h1>
        <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
          Select a path to test your knowledge and master new skills. Each quiz
          is designed to challenge and educate.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {learningPathsData?.map((path) => (
          <LearningPathCard
            key={path.id}
            path={path}
            onPathSelect={handlePathSelect}
          />
          //   <div
          //     key={path.id}
          //     onClick={() => onPathSelect(path.id)}
          //     className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden flex flex-col"
          //   >
          //     <div
          //       className={`p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white`}
          //     >
          //       <h3 className="text-2xl font-bold">{path.title}</h3>
          //     </div>
          //     <div className="p-6 flex-grow flex flex-col">
          //       <p className="text-gray-600 mb-4 flex-grow">{path.description}</p>
          //       <div className="flex justify-between items-center text-sm text-gray-500 mt-4">
          //         <span className="flex items-center">
          //           <BookOpenIcon className="w-4 h-4 mr-2" />
          //           {path.quizCount} Quizzes
          //         </span>
          //         <span className="font-semibold text-blue-600 group-hover:underline">
          //           Start Learning →
          //         </span>
          //       </div>
          //     </div>
          //   </div>
        ))}
      </div>
    </div>
  );
};

export default LearningPaths;
