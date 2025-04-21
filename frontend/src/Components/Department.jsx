import React from "react";
import unhcr from "../../public/images/unhcr.png";
import rbc from "../../public/images/rbc.png";
import unfpa from "../../public/images/unfpa.png";
import alight from "../../public/images/alight.png";
import director from "../../public/images/director.png";

const Department = () => {
  return (
    <div className="py-16 px-4 bg-gradient-to-br from-blue-50 to-sky-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
        <div>
          <h1 className="text-4xl font-bold text-cyan-600 mb-8">Our Departments & Partners</h1>
          <p className="text-gray-600 text-lg mb-10 leading-relaxed">
            We proudly collaborate with trusted partners to support youth health, protection, and education.
          </p>

          <div className="grid grid-cols-2 gap-6">
            {[unhcr, rbc, unfpa, alight].map((logo, index) => (
              <div
                key={index}
                className="bg-white/30 backdrop-blur-md p-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center"
              >
                <img
                  src={logo}
                  alt={`partner-${index}`}
                  className="h-24 object-contain transform hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="hidden md:flex justify-center items-center">
          <img
            src={director}
            alt="Director"
            className="rounded-3xl shadow-2xl w-full h-[470px] object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Department;
