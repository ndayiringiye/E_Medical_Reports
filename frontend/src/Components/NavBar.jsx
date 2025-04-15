import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import userProfile from "../../public/images/userprofile.png";

function NavBar() {
  const [showSearch, setShowSearch] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Live time updater
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval); // cleanup
  }, []);

  return (
    <nav className="w-full bg-white shadow-md px-4 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center flex-wrap">
        <div className="flex items-center flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div
              onClick={() => {
                setShowSearch(!showSearch);
                setShowProfile(false);
              }}
              className="flex items-center gap-2 cursor-pointer hover:text-green-600 transition"
            >
              <FiSearch className="text-2xl" />
              <span className="hidden sm:inline font-semibold text-lg">Search</span>
            </div>

            {showSearch && (
              <input
                type="search"
                placeholder="Search any service you want here..."
                className="w-[250px] sm:w-[300px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              />
            )}
          </div>
          <div
            onClick={() => {
              setShowProfile(!showProfile);
              setShowSearch(false);
            }}
            className="flex items-center gap-2 cursor-pointer hover:text-green-600 transition"
          >
            <FaUserCircle className="text-2xl" />
            <span className="hidden sm:inline font-semibold text-lg">My Account</span>
          </div>
        </div>

        <div className="text-sm sm:text-base font-medium text-gray-600 mt-3 sm:mt-0">
          <p>{currentTime.toLocaleTimeString()}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-3">
        {showProfile && (
          <div className="flex items-center gap-3">
            <img
              src={userProfile}
              alt="User Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold">My Account</p>
              <p className="text-sm text-gray-500">user@email.com</p>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
