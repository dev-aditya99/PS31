import React from "react";

const PlaceholderPage = () => {
  return (
    <div className="container mx-auto px-6 py-16 text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">{title}</h1>
      <div className="max-w-3xl mx-auto">{children}</div>
    </div>
  );
};

export default PlaceholderPage;
