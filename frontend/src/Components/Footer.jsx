import { useState } from "react";
import { FaCaretDown, FaCaretRight } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import istagram from "../../public/images/istagram.png";
import { Link } from "react-router";
import { FaLinkedinIn } from "react-icons/fa";
import pasted from "../../public/images/Pasted_image_33-removebg-preview.png"
const Footer = () => {
  const [isOpen, setIsOpen] = useState(null);
  const data = [
    {
      title: "Covid-19",
      content:
        "But, alongside high COVID vaccination rates since, Rwanda's national response strategy to the pandemic has greatly increased the provision of oxygen to its health facilities. Medical oxygen is central to treatment in neonatal, intensive care, and surgical units.",
    },
    {
      title: "Marburg",
      content:
        "Rwanda successfully prevented the spread of Marburg Virus Disease (MVD) through a swift and comprehensive response, including contact tracing, testing, and public awareness campaigns. The outbreak was officially declared over on December 20, 2024, following the completion of the 42-day incubation period with no new cases reported.",
    },
    {
      title: "Monkeypox",
      content:
        "In Rwanda, monkeypox prevention focuses on personal hygiene, avoiding contact with infected individuals and shared objects, and using hand sanitizer. The Rwanda Biomedical Centre also emphasizes public awareness campaigns, enhanced surveillance, case management, and ring vaccination to combat the spread.",
    },
  ];
  const handleToggle = (index) => {
    setIsOpen(isOpen === index ? null : index);
  };
  return (
    <footer className="bg-gray-900 py-10 text-gray-100 px-6 md:px-20 border-t">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-3 text-cyan-700">E_Medical_Reports</h2>
          <p className="text-sm leading-relaxed">
            Empowering communities through accessible health records,
            medical transparency, and real-time collaboration between
            patients and professionals.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-700 mb-3">Quick Links</h3>
          <ul className="text-sm space-y-2">
            <li><a href="/" className="hover:text-cyan-600 transition">Home</a></li>
            <li><a href="/about" className="hover:text-cyan-600 transition">About Us</a></li>
            <li><a href="/signup" className="hover:text-cyan-600 transition">Services</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-gray-700 mb-3">Contact</h3>
          <ul className="text-sm space-y-2">
            <li>Email: <a href="mailto:info@emedicalreports.com" className="text-cyan-700">info@emedicalreports.com</a></li>
            <li>Phone: <span className="text-gray-400">+250 123 456 789</span></li>
            <li>Location: Rwanda, Eastern, Gatsibo</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-gray-700 mb-3">Epidamic resolved</h3>
          <div className="gap-3">
            {data.map((item, index) => (
              <div key={index}>
                <div
                  className="flex gap-2 items-center cursor-pointer"
                  onClick={() => handleToggle(index)}
                >
                  <span>{isOpen === index ? <FaCaretDown /> : <FaCaretRight />}</span>
                  <h2 className="hover:text-cyan-600">{item.title}</h2>
                </div>
                {isOpen === index && (
                  <div className="mt-2 text-gray-600">{item.content}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center my-2 mt-6 space-y-4 w-full">
          <div className="flex justify-center items-center gap-6">
            <Link to="https://www.facebook.com/alightrwanda/" className="text-2xl text-blue-600 hover:text-blue-800 transition duration-300">
              <FaFacebookF />
            </Link>
            <Link to="https://www.instagram.com/alightrwanda/" className="hover:scale-110 transition duration-300">
              <img src={istagram} alt="Instagram" className="h-6 w-6" />
            </Link>
            <Link to="https://www.linkedin.com/company/alightrwanda/" className="text-2xl text-blue-600 hover:text-blue-800 transition duration-300">
              <FaLinkedinIn />
            </Link>
          </div>
        </div>
        <hr className="w-full border-t-2 border-gray-200" />
          <div className="w-full">
            <div className="w-11/12 mx-auto flex justify-between items-center text-sm text-gray-400 flex-wrap gap-2">
              <p>
                &copy; {new Date().getFullYear()} <span className="font-semibold text-gray-400">E_Medical_Reports</span>. All rights reserved.
              </p>
              <div className="flex items-center gap-2">
                <span>Approved by</span>
               <Link to="/https://www.wearealight.org/rwanda"><img src={pasted} alt="Approved" className="h-12 w-auto" /></Link> 
              </div>
            </div>
          </div>
    </footer>
  );
};

export default Footer;
