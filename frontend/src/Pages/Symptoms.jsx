import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User, Mail, Calendar, Globe, HeartPulse, CheckCircle } from "lucide-react";
import surveyPhone from "../../public/images/surveyPhone.png";
import axios from "axios";


const formSteps = [
  { label: "Full Name", name: "fullName", placeholder: "Enter your full name (as on ID)", icon: <User className="text-blue-600" /> },
  { label: "Email", name: "email", placeholder: "Enter your email address", icon: <Mail className="text-blue-600" /> },
  { label: "Gender", name: "gender", placeholder: "Male or Female?", icon: <User className="text-pink-600" /> },
  { label: "Age", name: "age", placeholder: "Your age (10 - 25)", icon: <Calendar className="text-green-600" /> },
  { label: "Nationality", name: "nationality", placeholder: "Your nationality", icon: <Globe className="text-purple-600" /> },
  { label: "Region or Quartier", name: "quartier", placeholder: "Your region or quartier", icon: <Globe className="text-orange-500" /> },
  { label: "How Are You Feeling?", name: "howDoYouFeeling", placeholder: "Describe your symptoms", icon: <HeartPulse className="text-red-600" /> },
  { label: "Duration of Illness", name: "durationOfDiseases", placeholder: "When did it start?", icon: <Calendar className="text-yellow-500" /> },
  { label: "Treatment History", name: "session", placeholder: "Any past treatment?", icon: <HeartPulse className="text-green-700" /> },
  { label: "Other Services Needed", name: "whichOtherSevicesDoYouWant", placeholder: "Any other services needed?", icon: <HeartPulse className="text-cyan-700" /> },
];

const Symptoms = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  const handleNext = async () => {
    const currentField = formSteps[step].name;
    const currentLabel = formSteps[step].label;
    const currentValue = formData[currentField];

    if (!currentValue || currentValue.trim() === "") {
      setErrors((prev) => ({ ...prev, [currentField]: `${currentLabel} is required` }));
      return;
    }

    setErrors((prev) => ({ ...prev, [currentField]: null }));

    if (step < formSteps.length - 1) {
      setStep((prev) => prev + 1);
    } else {
      try {
        const response = await axios.post("http://localhost:4000/api/user/symptoms", formData);
        console.log("Submitted:", response.data);
        setShowPopup(true);
      } catch (error) {
        console.error("Submission error:", error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const { label, name, placeholder, icon } = formSteps[step];

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl mx-auto">
        <div className="flex justify-center items-center">
          <img src={surveyPhone} alt="survey" className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg object-contain" />
        </div>

        <div className="w-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-cyan-700 leading-relaxed">
              Begin your health journey with us — Your wellness is our priority.
            </h1>
          </div>

          <div className="w-full mb-6">
            <div className="text-sm mb-2 text-center font-medium text-gray-700">
              Step {step + 1} of {formSteps.length}
            </div>
            <input
              type="range"
              min="0"
              max={formSteps.length - 1}
              value={step}
              readOnly
              className="w-full accent-cyan-600"
            />
          </div>

          <Card className="shadow-2xl rounded-2xl p-6 bg-white">
            <CardContent className="space-y-5">
              <div className="text-xl font-semibold flex items-center gap-2 text-gray-800">
                {icon} {label}
              </div>

              <div>
                <Input
                  type="text"
                  name={name}
                  placeholder={placeholder}
                  value={formData[name] || ""}
                  onChange={handleChange}
                  className={`border p-2 rounded-lg w-full ${
                    errors[name]
                      ? "border-red-500 ring-red-200"
                      : "border-gray-300 focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100"
                  }`}
                />
                {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name]}</p>}
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={handleNext}
                  className="bg-cyan-700 hover:bg-blue-900 text-white rounded-xl px-6 py-2"
                >
                  {step === formSteps.length - 1 ? "Submit" : "Next"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 text-center space-y-4">
            <CheckCircle className="mx-auto h-14 w-14 text-green-500" />
            <h2 className="text-2xl font-bold text-green-700">Thank you!</h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              Thank you for reaching out to our expert nurse. Your symptoms are being reviewed. Please wait patiently while we observe your condition.
            </p>
            <Button
              onClick={() => setShowPopup(false)}
              className="bg-green-600 hover:bg-green-800 text-white mt-4"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Symptoms;
