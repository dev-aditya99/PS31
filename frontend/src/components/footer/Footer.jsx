// import React from 'react'

// const Footer = () => {
//   return (
//     <footer className="bg-gray-800 text-white">
//     <div className="container mx-auto px-6 py-10">
//       <div className="text-center mb-8">
//         <p className="font-semibold text-gray-400 mb-4">Trusted by over 800+ students</p>
//         <div className="flex justify-center items-center space-x-8 grayscale opacity-60">
//             <span>Coursera</span>
//             <span>Udemy</span>
//             <span>LinkedIn</span>
//             <span>Indeed</span>
//         </div>
//       </div>
//       <div className="flex flex-wrap justify-between">
//         <div className="w-full md:w-1/3 mb-6 md:mb-0">
//           <h3 className="text-xl font-bold">LearnX Pro</h3>
//           <p className="text-gray-400 mt-2">Your partner in adaptive learning.</p>
//         </div>
//         {/* Social media icons can be added here */}
//       </div>
//     </div>
//     <div className="bg-gray-900 py-4 text-center text-gray-500 text-sm">
//       <p>&copy; {new Date().getFullYear()} LearnX Pro. All Rights Reserved.</p>
//     </div>
//   </footer>
//   )
// }

// export default Footer;

import { motion } from "framer-motion";
import { Github, Facebook, Linkedin, Twitter } from "lucide-react";
import { FaFacebook, FaLinkedin } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-950 text-gray-700 dark:text-gray-300 border-t border-gray-200 dark:border-gray-800">
      <motion.div
        className="container mx-auto px-6 py-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="lg:flex lg:justify-between lg:items-start">
          {/* Brand + Description */}
          <div className="lg:w-2/5 mb-10 lg:mb-0">
            <motion.div
              className="flex flex-col items-start"
              whileHover={{ scale: 1.02 }}
            >
              <img
                src="https://res.cloudinary.com/duvnw53vd/image/upload/v1760629140/learnXPRO_d949d5.png"
                alt="LearnX Pro Logo"
                className="w-9 h-9 mb-3"
              />
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                LearnX Pro
              </h2>
              <p className="text-gray-500 dark:text-gray-400 max-w-sm">
                AI-powered learning platform with adaptive quizzes, career
                prediction, and real-time analytics — helping students and
                educators achieve better outcomes.
              </p>

              {/* Social Icons */}
              <div className="flex mt-6 space-x-4">
                {[
                  { icon: <FaGithub size={20} />, link: "#" },
                  { icon: <FaLinkedin size={20} />, link: "#" },
                  { icon: <FaFacebook size={20} />, link: "#" },
                  { icon: <BsTwitterX size={20} />, link: "#" },
                ].map((social, idx) => (
                  <motion.a
                    key={idx}
                    href={social.link}
                    whileHover={{ scale: 1.2 }}
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors duration-300"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Links */}
          <div className="lg:flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
            <motion.div whileHover={{ scale: 1.03 }}>
              <h3 className="text-gray-900 dark:text-white font-semibold mb-3 uppercase">
                About
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-blue-500">
                    Company
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500">
                    Community
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500">
                    Careers
                  </a>
                </li>
              </ul>
            </motion.div>

            <motion.div whileHover={{ scale: 1.03 }}>
              <h3 className="text-gray-900 dark:text-white font-semibold mb-3 uppercase">
                Resources
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-blue-500">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500">
                    Tutorials
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500">
                    Help Center
                  </a>
                </li>
              </ul>
            </motion.div>

            <motion.div whileHover={{ scale: 1.03 }}>
              <h3 className="text-gray-900 dark:text-white font-semibold mb-3 uppercase">
                Products
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-blue-500">
                    Adaptive Quiz
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500">
                    Career Predictor
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500">
                    Teacher Dashboard
                  </a>
                </li>
              </ul>
            </motion.div>

            <motion.div whileHover={{ scale: 1.03 }}>
              <h3 className="text-gray-900 dark:text-white font-semibold mb-3 uppercase">
                Contact
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="hover:text-blue-500">+91 98765 43210</li>
                <li className="hover:text-blue-500">support@learnxpro.ai</li>
                <li className="hover:text-blue-500">Bengaluru, India</li>
              </ul>
            </motion.div>
          </div>
        </div>

        <motion.hr
          className="h-px my-8 bg-gray-200 border-none dark:bg-gray-700"
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          transition={{ duration: 0.8 }}
        />

        <motion.p
          className="text-center text-gray-500 dark:text-gray-400 text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          © {new Date().getFullYear()} LearnX Pro — All rights reserved
        </motion.p>
      </motion.div>
    </footer>
  );
}
