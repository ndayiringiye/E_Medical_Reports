import React, { useState, useContext } from 'react';
import logo from "../../public/images/logo.png";
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { LogOut } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import AuthContext from './AuthContext';
import { ShimmerButton } from "./ShimmerButton";

const NavBar = () => {
    const { isLoggedIn, logout } = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => setMenuOpen(!menuOpen);
    const navbarHeight = "70px";
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.get("https://e-medical-reports-onbackend.onrender.com/api/user/signout", { withCredentials: true });
            logout();
            navigate("/signin");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <>
            <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
                <div className="max-w-screen-2xl mx-auto">
                    <nav className="flex justify-between items-center px-6 py-3 w-full">
                        <div className="flex items-center gap-3">
                            <img src={logo} alt="logo" className="h-14 w-auto" />
                            <h1 className="text-blue-900 font-bold text-xl">E_Medical Reports</h1>
                        </div>
                        <div className="hidden md:flex items-center space-x-6">
                            <a href="/" className="text-cyan-500 hover:text-blue-900 font-medium text-sm">HOME</a>
                            <Link to="/about" className="text-cyan-500 hover:text-blue-900 font-medium text-sm">ABOUT US</Link>
                            <Link to="/signup" className="text-cyan-500 font-medium hover:text-blue-900 text-sm">CLINICAL SERVICES</Link>
                            {isLoggedIn && (
                                <ShimmerButton onClick={handleLogout} className="px-4 py-2 text-sm">
                                    <span className="flex items-center gap-2 text-white font-medium">
                                        <LogOut size={16} />
                                        LOGOUT
                                    </span>
                                </ShimmerButton>
                            )}
                        </div>
                        <div className="md:hidden text-cyan-500 flex items-center">
                            <button onClick={toggleMenu}>
                                {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
                            </button>
                        </div>
                    </nav>
                </div>
                {menuOpen && (
                    <div className="md:hidden bg-white shadow-lg px-6 py-4 space-y-3">
                        <a href="/" className="block text-cyan-500 hover:text-blue-900 text-sm">HOME</a>
                        <Link to="/about" className="block text-cyan-500 hover:text-blue-900 text-sm">ABOUT US</Link>
                        <span className="block text-cyan-500 text-sm">CLINICAL SERVICES</span>
                        {isLoggedIn && (
                            <ShimmerButton onClick={handleLogout} className="w-full px-4 py-2 text-sm">
                                <span className="flex items-center justify-center gap-2 text-white font-medium">
                                    <LogOut size={16} />
                                    LOGOUT
                                </span>
                            </ShimmerButton>
                        )}
                    </div>
                )}
            </div>
            <div style={{ height: navbarHeight }}></div>
        </>
    );
};

export default NavBar;
