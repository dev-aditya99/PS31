import React from 'react'
import Carousel from './Carousel'


// --- ICONS (Lucide React as SVGs) ---
const BookOpen = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
);
const Users = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);
const Star = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
);
const ChevronDown = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m6 9 6 6 6-6"/></svg>
);
const BarChart = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/></svg>
);
const Target = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12"cy="12" r="2"/></svg>
);

const Home = () => {
  return (
    <div>
      <Carousel/>
     <PopularCourses />
     <StatsSection />
    </div>
  )
}

export default Home;

const CourseCard = ({ img, title, desc, level }) => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
    <img className="h-48 w-full object-cover" src={img} alt={title} />
    <div className="p-6">
      <h3 className="font-bold text-xl mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600 text-base mb-4">{desc}</p>
      <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">{level}</span>
    </div>
  </div>
);

const PopularCourses = () => (
  <section className="py-16 bg-gray-50">
    <div className="container mx-auto px-6">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Discover Our Popular Career Paths</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <CourseCard img="https://placehold.co/600x400/1976d2/ffffff?text=MERN+Stack" title="Full-Stack MERN Development" desc="Master the MERN stack and build real-world applications from scratch." level="Advanced" />
        <CourseCard img="https://placehold.co/600x400/388e3c/ffffff?text=Data+Science" title="Data Science with Python" desc="Unlock insights from data using Python, Pandas, and Scikit-learn." level="Intermediate" />
        <CourseCard img="https://placehold.co/600x400/f57c00/ffffff?text=UI/UX+Design" title="UI/UX Design Fundamentals" desc="Learn the principles of user-centric design with Figma and Adobe XD." level="Beginner" />
      </div>
    </div>
  </section>
);

const StatsSection = () => (
    <section className="py-16">
        <div className="container mx-auto px-6 flex flex-wrap lg:flex-nowrap items-center justify-center gap-12">
            <div className="w-full lg:w-1/2">
                <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070" alt="E-learning institute" className="rounded-xl shadow-lg"/>
            </div>
            <div className="w-full lg:w-1/2 text-center lg:text-left">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Explore Your Career Path</h2>
                <p className="text-gray-600 mb-8">We are committed to providing a world-class learning experience with measurable results and a supportive community.</p>
                <div className="flex justify-center lg:justify-start space-x-8">
                    <div className="text-center">
                        <Users className="w-10 h-10 text-blue-600 mx-auto mb-2"/>
                        <p className="text-3xl font-bold text-gray-800">3.2K+</p>
                        <p className="text-gray-500">Learners</p>
                    </div>
                    <div className="text-center">
                        <BookOpen className="w-10 h-10 text-blue-600 mx-auto mb-2"/>
                        <p className="text-3xl font-bold text-gray-800">600+</p>
                        <p className="text-gray-500">Experts</p>
                    </div>
                    <div className="text-center">
                       <Star className="w-10 h-10 text-blue-600 mx-auto mb-2 fill-current text-yellow-500"/>
                        <p className="text-3xl font-bold text-gray-800">1K+</p>
                        <p className="text-gray-500">Reviews</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
);