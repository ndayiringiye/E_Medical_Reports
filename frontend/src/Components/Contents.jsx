import React, { useState } from 'react';
import logo from "../../public/images/logo.png";

const Contents = () => {
    const [isAboutOpen, setIsAboutOpen] = useState(false);

    return (
        <div className="">
            <div className="max-w-screen-2xl mx-auto bg-white">
                <nav className="flex justify-between items-center px-12 py-3 w-11/12 mx-auto">
                    <div className="flex items-center gap-3">
                        <img src={logo} alt="logo" className="h-16 w-auto" />
                        <h1 className="text-blue-900 font-bold text-xl">E_Medical Reports</h1>
                    </div>
                    <div className="flex items-center space-x-6">
                        <a href="/" className="text-cyan-500 hover:text-blue-900 font-medium text-sm transition-colors">
                            HOME
                        </a>
                        <div className="relative group">
                            <button
                                className="text-cyan-500 hover:text-blue-900 font-medium text-sm transition-colors flex items-center"
                                onClick={() => setIsAboutOpen(!isAboutOpen)}
                                onMouseEnter={() => setIsAboutOpen(true)}
                                onMouseLeave={() => setIsAboutOpen(false)}
                            >
                                ABOUT US
                                <svg className="w-3 h-3 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                            {isAboutOpen && (
                                <div
                                    className="absolute left-0 mt-2 w-48 bg-white rounded shadow-lg z-10"
                                    onMouseEnter={() => setIsAboutOpen(true)}
                                    onMouseLeave={() => setIsAboutOpen(false)}
                                >
                                    <a href="/about" className="block px-4 py-2 text-cyan-500 hover:bg-gray-100 text-sm">Who We Are</a>
                                    <a href="/team" className="block px-4 py-2 text-cyan-500 hover:bg-gray-100 text-sm">Our Team</a>
                                    <a href="/mission" className="block px-4 py-2 text-cyan-500 hover:bg-gray-100 text-sm">Mission & Vision</a>
                                </div>
                            )}
                        </div>
                        <a href="/service" className="text-cyan-500 hover:text-blue-900 font-medium text-sm transition-colors">
                            CLINICAL SERVICES
                        </a>
                        <a href="/moreinfo" className="text-cyan-500 hover:text-blue-900 font-medium text-sm transition-colors">
                            MORE INFO
                        </a>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Contents;
