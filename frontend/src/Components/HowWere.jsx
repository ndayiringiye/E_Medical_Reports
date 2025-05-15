import React, { useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export const HowWere = () => {
  const ourServices = [
    {
      title: "Free Sexual Health Screenings for Youth",
      description:
        "We provide screenings for HIV, chlamydia, gonorrhea, trichomoniasis, syphilis, HPV, genital herpes, and more. Available for individuals aged 10 to 25, including both refugees and nationals — completely free of charge.",
    },
    {
      title: "Treatment for Sexually Transmitted Infections",
      description:
        "We offer treatment for common STIs like HIV, chlamydia, gonorrhea, and others. This service is available to youth aged 10 to 25 at no cost, regardless of status.",
    },
    {
      title: "Counseling & Guidance for Youth Development",
      description:
        "We provide counseling on drug abuse prevention, unwanted pregnancy, marriage preparation, STIs, and life development. This is offered free to youth aged 10 to 25, both refugees and nationals.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % ourServices.length);
  };

  return (
    <div className="w-full px-4 py-10 bg-gray-50">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl font-extrabold text-blue-900 mb-6 font-serif">
          Our Youth Impact Services
        </h1>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white shadow-xl p-6 rounded-2xl"
            >
              <h2 className="text-xl font-bold text-cyan-600 mb-2 font-sans">
                {ourServices[currentIndex].title}
              </h2>
              <p className="text-gray-900 text-md font-light">
                {ourServices[currentIndex].description}
              </p>
            </motion.div>
          </AnimatePresence>

          <button
            onClick={handleNext}
            className="mt-6 text-cyan-600 hover:text-cyan-800 transition duration-300 text-3xl"
            aria-label="Next Service"
          >
            <FaLongArrowAltRight />
          </button>
        </div>
      </div>
    </div>
  );
};
