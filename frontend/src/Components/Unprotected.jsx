import React, { useState } from "react";
import condom from "../../public/images/condom.png";
import ibinini from "../../public/images/ibinini.png";
import screening from "../../public/images/sreening.png";
import testing from "../../public/images/testing.png";
import peer from "../../public/images/peers.png";
import concs from "../../public/images/concs.png";

const cards = [
  {
    title: "Supportive Services",
    images: [condom, ibinini],
  },
  {
    title: "Health Checkup",
    images: [screening, testing],
  },
  {
    title: "Youth Counseling",
    images: [peer, concs],
  },
];

export const Unprotected = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [showFirstImage, setShowFirstImage] = useState(true);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
    setShowFirstImage(false);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setShowFirstImage(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg p-4 text-center cursor-pointer transform hover:scale-105 transition duration-300"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <h3 className="text-xl font-semibold text-cyan-600 mb-4">{card.title}</h3>
            <div className="h-48 flex justify-center items-center overflow-hidden">
              <img
                src={
                  hoveredIndex === index && !showFirstImage
                    ? card.images[1]
                    : card.images[0]
                }
                alt={card.title}
                className="h-40 object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
