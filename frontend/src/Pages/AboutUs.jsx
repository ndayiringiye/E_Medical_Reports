import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';

const sections = [
  {
    title: 'Who We Are',
    content:
      "E_Medical_Reports is a dedicated platform designed to empower individuals and medical professionals by providing secure, accessible, and transparent health record services. We are a passionate team of developers, health specialists, and innovators committed to improving the way medical data is managed and shared.",
  },
  {
    title: 'Where We Operate',
    content:
      "We are proudly based at Nyabiheke Hospital in Gatsibo District, Eastern Province of Rwanda. From this foundation, we aim to expand our digital health services across Africa and beyond. Our mission is to reach both rural and urban communities, ensuring that no one is left behind in the digital healthcare revolution.",
  },
  {
    title: 'What We Do',
    content:
      "We offer a platform for storing and sharing medical reports, scheduling appointments, and enabling real-time communication between doctors and patients. Our system supports document uploads, role-based access control for medical staff, and secure data protection through advanced authentication methods. We provide screenings for HIV, chlamydia, gonorrhea, trichomoniasis, syphilis, HPV, genital herpes, and more. Available for individuals aged 10 to 25, including both refugees and nationals — completely free of charge. We offer treatment for common STIs like HIV, chlamydia, gonorrhea, and others. This service is available to youth aged 10 to 25 at no cost, regardless of status. We provide counseling on drug abuse prevention, unwanted pregnancy, marriage preparation, STIs, and life development. This is offered free to youth aged 10 to 25, both refugees and nationals",
  },
];

const AboutUs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleSection = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="px-6 md:px-20 py-10 bg-gray-50 text-gray-800">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-cyan-700 mb-8">
        About Us
      </h1>

      <div className="space-y-4">
        {sections.map((section, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-5 cursor-pointer border hover:shadow-lg transition duration-300"
            onClick={() => toggleSection(index)}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-cyan-700">{section.title}</h2>
              {openIndex === index ? (
                <FaChevronDown className="text-cyan-700" />
              ) : (
                <FaChevronRight className="text-cyan-700" />
              )}
            </div>

            <AnimatePresence>
              {openIndex === index && (
                <motion.p
                  className="mt-3 text-sm text-gray-600"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {section.content}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
