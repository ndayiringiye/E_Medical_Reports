import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import message from "../../public/images/message.png";
import { FaPaperPlane } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify';

const Response = () => {
  const { symptomId } = useParams();
  const [symptom, setSymptom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const [users, setUsers] = useState([]);
  const [receiverEmail, setReceiverEmail] = useState("");
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/user/getUsers");
        setUsers(res.data.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to load users.");
      }
    };
  
    fetchUsers();
  }, []); 

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    if (!isValidEmail(receiverEmail)) {
      toast.error("Invalid email address");
      setLoading(false);
      return;
    }
    try {
      const payload = {
        from: "ndayiringiyedavid394@gmail.com", 
        to: receiverEmail,
        subject: "Welcome to the E_Medical Reports",
        html: `<p>${text}</p>`,
      };
      const response = await axios.post(
        "http://localhost:4000/api/user/email/send",
        payload
      );
  
      toast.success("Email sent successfully!");
      console.log(response.data);
      setReceiverEmail("");
      setText("");
    } catch (error) {
      console.error("Failed to send email:", error);
      toast.error("Failed to send email.");
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    const fetchSymptom = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/user/getSingleSymptom/${symptomId}`);
        setSymptom(res.data.data);
      } catch (err) {
        console.error("Error fetching symptom:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSymptom();
  }, [symptomId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <span className="text-lg text-gray-700">Loading...</span>
      </div>
    );
  }

  const getFormattedDate = () => {
    const dateToUse = symptom?.createdAt ? new Date(symptom.createdAt) : new Date();
    return dateToUse.toLocaleString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }) + (symptom?.createdAt ? "" : " (estimated)");
  };

  return (
    <div>
      <ToastContainer />
      <div className="min-h-screen bg-gray-100 px-4 py-6 sm:px-6 lg:px-8 flex flex-col items-center">
        <h1 className="text-2xl sm:text-3xl font-semibold text-cyan-700 mb-6 sm:mb-8 text-center">
          Patient Symptom Details
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full max-w-7xl">
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm sm:shadow-md">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">Personal Info</h2>
            <p><strong>Patient names:</strong> {symptom?.fullName}</p>
            <p><strong>Email:</strong> {symptom?.email}</p>
            <p><strong>Gender:</strong> {symptom?.gender}</p>
            <p><strong>Age:</strong> {symptom?.age}</p>
            <p><strong>Nationality:</strong> {symptom?.nationality}</p>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm sm:shadow-md">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">Location & Illness</h2>
            <p><strong>Quartier & Region:</strong> {symptom?.quartier?.join(', ')}</p>
            <p><strong>Symptoms:</strong> {symptom?.howDoYouFeeling}</p>
            <p><strong>Duration of illness:</strong> {symptom?.durationOfDiseases?.join(', ')}</p>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm sm:shadow-md">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">Services & Timing</h2>
            <p><strong>Session:</strong> {symptom?.session}</p>
            <p><strong>Other services:</strong> {symptom?.whichOtherSevicesDoYouWant}</p>
            <p><strong>Date/Time:</strong> {getFormattedDate()}</p>
          </div>
        </div>
        <div className="mt-8 sm:mt-10 max-w-2xl sm:max-w-3xl text-center text-gray-600 text-sm sm:text-base px-4">
          This information helps the admin to better understand the patient's situation and send them a personalized message.
        </div>
        <div className="w-11/12 mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <form
              onSubmit={handleSendMessage}
              className="bg-white shadow-lg rounded-2xl p-6 space-y-4"
            >
              <h1 className="text-2xl font-semibold text-cyan-700 flex items-center gap-2">
                <FaPaperPlane className="text-cyan-500" />
                Respond to Patient
              </h1>
              <div className="mb-4">
                <label htmlFor="receiverEmail" className="block text-gray-700 text-sm font-bold mb-2">
                  Select Recipient Email:
                </label>
                <select
                  id="receiverEmail"
                  value={receiverEmail}
                  onChange={(e) => setReceiverEmail(e.target.value)}
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                  required
                >
                  <option value="">-- Select Patient Email --</option>
                  {users.map((user) => (
                    <option key={user._id} value={user.email}>
                      {user.email}
                    </option>
                  ))}
                </select>
              </div>
              <textarea
                name="text"
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows="6"
                placeholder="Type your response to the patient here..."
                className="w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 p-4 rounded-xl text-gray-700 placeholder-gray-400 resize-none text-base"
              ></textarea>
              <button
                type="submit"
                disabled={loading || !receiverEmail}
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-2 rounded-xl transition duration-300 disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
            <div className="flex justify-center">
              <img
                src={message}
                alt="Send Message Illustration"
                className="w-full max-w-sm lg:max-w-md rounded-xl shadow-md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Response;
