import React, { useState, useEffect } from 'react';
import logo from "../../public/images/logo.png";
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import axios from 'axios';

const NavBar = () => {
    const [isAboutOpen, setIsAboutOpen] = useState(false);
    const [isServiceOpen, setIsServiceOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => setMenuOpen(!menuOpen);

    const navbarHeight = "70px";

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
                            <div className="relative group">
                                <button
                                    className="text-cyan-500 hover:text-blue-900 font-medium text-sm flex items-center"
                                    onMouseEnter={() => setIsAboutOpen(true)}
                                    onMouseLeave={() => setIsAboutOpen(false)}
                                >
                                    ABOUT US
                                    <svg className="w-3 h-3 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                {isAboutOpen && (
                                    <div className="absolute left-0 mt-2 w-48 bg-white rounded shadow-lg z-10">
                                        <Link to="/about" className="block px-4 py-2 text-cyan-500 hover:bg-gray-100 text-sm">Who We Are</Link>
                                        <Link to="/team" className="block px-4 py-2 text-cyan-500 hover:bg-gray-100 text-sm">Our Team</Link>
                                        <Link to="/mission" className="block px-4 py-2 text-cyan-500 hover:bg-gray-100 text-sm">Mission & Vision</Link>
                                    </div>
                                )}
                            </div>

                            <div className="relative group">
                                <button
                                    className="text-cyan-500 hover:text-blue-900 font-medium text-sm flex items-center"
                                    onMouseEnter={() => setIsServiceOpen(true)}
                                    onMouseLeave={() => setIsServiceOpen(false)}
                                >
                                    CLINICAL SERVICES
                                    <svg className="w-3 h-3 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                {isServiceOpen && (
                                    <div className="absolute left-0 mt-2 w-64 bg-white rounded shadow-lg z-10">
                                        <Link to="/gbv" className="block px-4 py-2 text-cyan-500 hover:bg-gray-100 text-sm">GBV Services</Link>
                                        <Link to="/stis" className="block px-4 py-2 text-cyan-500 hover:bg-gray-100 text-sm">STIs Treatment and Prevention</Link>
                                        <Link to="/reproductive-health" className="block px-4 py-2 text-cyan-500 hover:bg-gray-100 text-sm">Reproductive and Sexual Health</Link>
                                        <Link to="/drug-prevention" className="block px-4 py-2 text-cyan-500 hover:bg-gray-100 text-sm">Drug Abuse Prevention & Counseling</Link>
                                        <Link to="/marriage-counseling" className="block px-4 py-2 text-cyan-500 hover:bg-gray-100 text-sm">Marriage Preparation Counseling</Link>
                                        <Link to="/family-planning" className="block px-4 py-2 text-cyan-500 hover:bg-gray-100 text-sm">Family Planning Services</Link>
                                        <Link to="/life-guidance" className="block px-4 py-2 text-cyan-500 hover:bg-gray-100 text-sm">Life Development Guidance</Link>
                                    </div>
                                )}
                            </div>

                            <a href="/moreinfo" className="text-cyan-500 hover:text-blue-900 font-medium text-sm">MORE INFO</a>
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

                        <div>
                            <button
                                className="w-full text-left text-cyan-500 hover:text-blue-900 text-sm"
                                onClick={() => setIsAboutOpen(!isAboutOpen)}
                            >
                                ABOUT US
                            </button>
                            {isAboutOpen && (
                                <div className="pl-4 mt-1 space-y-1">
                                    <Link to="/about" className="block text-sm text-cyan-500 hover:text-blue-900">Who We Are</Link>
                                    <Link to="/team" className="block text-sm text-cyan-500 hover:text-blue-900">Our Team</Link>
                                    <Link to="/mission" className="block text-sm text-cyan-500 hover:text-blue-900">Mission & Vision</Link>
                                </div>
                            )}
                        </div>

                        <div>
                            <button
                                className="w-full text-left text-cyan-500 hover:text-blue-900 text-sm"
                                onClick={() => setIsServiceOpen(!isServiceOpen)}
                            >
                                CLINICAL SERVICES
                            </button>
                            {isServiceOpen && (
                                <div className="pl-4 mt-1 space-y-1">
                                    <Link to="/gbv" className="block text-sm text-cyan-500 hover:text-blue-900">GBV Services</Link>
                                    <Link to="/stis" className="block text-sm text-cyan-500 hover:text-blue-900">STIs Treatment and Prevention</Link>
                                    <Link to="/reproductive-health" className="block text-sm text-cyan-500 hover:text-blue-900">Reproductive and Sexual Health</Link>
                                    <Link to="/drug-prevention" className="block text-sm text-cyan-500 hover:text-blue-900">Drug Abuse Prevention & Counseling</Link>
                                    <Link to="/marriage-counseling" className="block text-sm text-cyan-500 hover:text-blue-900">Marriage Preparation Counseling</Link>
                                    <Link to="/family-planning" className="block text-sm text-cyan-500 hover:text-blue-900">Family Planning Services</Link>
                                    <Link to="/life-guidance" className="block text-sm text-cyan-500 hover:text-blue-900">Life Development Guidance</Link>
                                </div>
                            )}
                        </div>

                        <a href="/moreinfo" className="block text-cyan-500 hover:text-blue-900 text-sm">MORE INFO</a>
                    </div>
                )}
            </div>
            <div style={{ height: navbarHeight }}></div>
        </>
    );
};
export default NavBar;
