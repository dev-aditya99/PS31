import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
    <div className="container mx-auto px-6 py-10">
      <div className="text-center mb-8">
        <p className="font-semibold text-gray-400 mb-4">Trusted by over 800+ students</p>
        <div className="flex justify-center items-center space-x-8 grayscale opacity-60">
            <span>Coursera</span>
            <span>Udemy</span>
            <span>LinkedIn</span>
            <span>Indeed</span>
        </div>
      </div>
      <div className="flex flex-wrap justify-between">
        <div className="w-full md:w-1/3 mb-6 md:mb-0">
          <h3 className="text-xl font-bold">LearnX Pro</h3>
          <p className="text-gray-400 mt-2">Your partner in adaptive learning.</p>
        </div>
        {/* Social media icons can be added here */}
      </div>
    </div>
    <div className="bg-gray-900 py-4 text-center text-gray-500 text-sm">
      <p>&copy; {new Date().getFullYear()} LearnX Pro. All Rights Reserved.</p>
    </div>
  </footer>
  )
}

export default Footer;