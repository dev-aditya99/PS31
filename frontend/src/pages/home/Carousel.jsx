import React, { useCallback, useEffect, useState } from 'react'

const Carousel = () => {
  
  const slides = [
    {
      url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop',
      title: 'Get Started Digital Learning',
      buttonText: 'Get Started'
    },
    {
      url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop',
      title: 'Explore Our Expert-Led Courses',
      buttonText: 'View Courses'
    },
    {
      url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop',
      title: 'Unlock Your Full Potential',
      buttonText: 'Join Now'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = useCallback(() => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, slides.length]);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(slideInterval); 
  }, [nextSlide]);

  return (
    <div className="my-3 relative w-[99%] h-[32rem] m-auto rounded-2xl overflow-hidden group shadow-lg">
      {/* Background Image */}
      <div
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
        className="w-full h-full bg-center bg-cover transition-all duration-1000"
        key={currentIndex}
      ></div>
       {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center text-white p-4">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-shadow-lg animate-fade-in-down">{slides[currentIndex].title}</h2>
          <button className="mt-4 px-8 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition-transform hover:scale-105 duration-300 shadow-md animate-fade-in-up">
            {slides[currentIndex].buttonText}
          </button>
      </div>

      {/* Left Arrow */}
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute top-[50%] -translate-y-1/2 left-5 text-2xl rounded-full p-2 bg-black/40 hover:bg-black/60 text-white cursor-pointer select-none">
        <svg onClick={prevSlide} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </div>
      {/* Right Arrow */}
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute top-[50%] -translate-y-1/2 right-5 text-2xl rounded-full p-2 bg-black/40 hover:bg-black/60 text-white cursor-pointer select-none">
        <svg onClick={nextSlide} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </div>
    </div>
  );
}

export default Carousel;
