import { FaUserPlus, FaSignInAlt } from "react-icons/fa";
import logo from "../../public/images/logo.png";

const Entry = () => {
  return (
    <div className=" flex items-center justify-center bg-gradient-to-br from-gray-400 via-sky-400 to-green-400 px-4">
      <div className=" p-8 w-full max-w-xl text-center space-y-3">
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center shadow-md bg-white rounded-full">
            <img src={logo} alt="E_Medical Reports Logo" className="w-20 h-20" />
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white font-sans">
            Welcome to E_MedicalReports.com
          </h1>
          <p className="text-black font-medium text-sm md:text-lg">
            Manage and access your medical reports securely and easily.
          </p>
        </div>
        <div className="flex justify-center gap-4 mt-6 flex-wrap">
          <button className="flex items-center gap-2 px-5 py-3 text-gray-800 bg-gray-200 font-semibold rounded-md ">
            <FaUserPlus className="text-blue-400 font-bold" />
            Sign Up
          </button>
          <button className="flex items-center gap-2 px-5 py-3 text-gray-800 font-semibold rounded-md bg-gray-200">
            <FaSignInAlt className="text-blue-400 font-bold" />
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Entry;
