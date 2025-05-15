import { useEffect, useState } from "react";
import { FaHospitalAlt, FaStethoscope, FaAmbulance } from "react-icons/fa";
import userhospital from "../../public/images/usahospitality.png";
import service from "../../public/images/services.png";
import emergency from "../../public/images/emergency.png";
import Entry from "./Entry";

const slides = [
    {
        image: userhospital,
        title: "Welcome to Nyabiheke Hospital Center",
        description:
            "Check your health status and receive expert medical advice from our experienced nurses.",
        icon: <FaHospitalAlt className="text-4xl text-white" />,
    },
    {
        image: service,
        title: "Our Hospital Services",
        description:
            "Visit our service rooms and start your check-up guided by our professional nursing staff.",
        icon: <FaStethoscope className="text-4xl text-white" />,
    },
    {
        image: emergency,
        title: "Emergency & Advanced Support",
        description:
            "For severe conditions, our hospital ensures proper care or transfers to advanced medical centers.",
        icon: <FaAmbulance className="text-4xl text-white" />,
    },
];

const Home = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000); 
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full min-h-screen flex flex-col md:flex-row bg-gray-100">
            <div className="w-full md:w-1/2 h-[400px] md:h-screen relative overflow-hidden">
                <div
                    className="w-full h-full bg-cover bg-center transition-all duration-700 ease-in-out"
                    style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
                >
                    <div className="bg-black bg-opacity-60 h-full flex items-center justify-center text-center px-4 md:px-10">
                        <div className="text-white space-y-4 rounded-xl p-6 backdrop-blur-sm bg-opacity-50 bg-gray-800">
                            <div className="flex justify-center">{slides[currentSlide].icon}</div>
                            <h1 className="text-3xl md:text-5xl font-bold">{slides[currentSlide].title}</h1>
                            <p className="text-md md:text-xl">{slides[currentSlide].description}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full md:w-1/2 flex justify-center items-center p-4 bg-gradient-to-br from-gray-400 via-sky-400 to-green-400">
                <div className="w-full max-w-md shadow-lg rounded-2xl p-6 border bg-gray-50">
                    <Entry />
                </div>
            </div>
        </div>
    );
};

export default Home;
