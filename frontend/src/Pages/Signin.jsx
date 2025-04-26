import { useState } from "react";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { LiaEyeSolid, LiaEyeSlashSolid } from "react-icons/lia";
import goog from "../../public/images/google (1).png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDKYhYw-pcB0hx8tL2bxVPXSTOqY7A5uAI",
  authDomain: "authentication-58e4a.firebaseapp.com",
  projectId: "authentication-58e4a",
  storageBucket: "authentication-58e4a.appspot.com",
  messagingSenderId: "228752043403",
  appId: "1:228752043403:web:a04e97b1806aeaad46d38e",
  measurementId: "G-9687K8WP6Z"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

const facebookProvider = new FacebookAuthProvider();
facebookProvider.setCustomParameters({ display: "popup" });

const twitterProvider = new TwitterAuthProvider();
twitterProvider.setCustomParameters({ lang: "en" });

const Signin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:4000/api/user/signin", form);
      const { token, role } = res.data;

      localStorage.setItem("token", token);
      if (role === "admin") {
        navigate("/dashboard");
      } else if(role === "patient"){
        navigate("/symptoms");
      }
    } catch (err) {
      console.error("Login error:", err.response?.data?.message || err.message);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  const handleSocialSignup = async (providerName) => {
    if (isSigningIn) return;
    setIsSigningIn(true);

    let provider;
    switch (providerName) {
      case "google":
        provider = googleProvider;
        break;
      case "facebook":
        provider = facebookProvider;
        break;
      case "twitter":
        provider = twitterProvider;
        break;
      default:
        alert("Unsupported provider");
        setIsSigningIn(false);
        return;
    }

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Social login success:", user);
      localStorage.setItem("token", await user.getIdToken());
      alert(`Welcome, ${user.displayName || user.email}`);
      navigate("/symptoms");
    } catch (error) {
      console.error("Social login error:", error.code, error.message);
      switch (error.code) {
        case "auth/popup-closed-by-user":
          alert("Popup closed before completing login.");
          break;
        case "auth/popup-blocked":
          alert("Popup blocked. Please allow popups.");
          break;
        case "auth/cancelled-popup-request":
          alert("Login already in progress.");
          break;
        case "auth/operation-not-allowed":
          alert("Provider not enabled in Firebase Console.");
          break;
        default:
          alert("Login failed: " + error.message);
      }
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-200 flex justify-center items-center px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <h2 className="text-3xl font-bold text-center text-gray-800">Login With your Account</h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 pr-10 rounded-md border border-gray-300 focus:ring-2 focus:ring-green-400 outline-none text-gray-700"
              />
              <MdOutlineMailOutline className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400" />
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-3 pr-10 rounded-md border border-gray-300 focus:ring-2 focus:ring-green-400 outline-none text-gray-700"
              />
              {showPassword ? (
                <LiaEyeSlashSolid
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <LiaEyeSolid
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                  onClick={() => setShowPassword(true)}
                />
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-green-400 to-sky-400 text-white font-semibold rounded-md hover:opacity-90 transition"
            >
              Sign In
            </button>
          </form>

          <div className="flex items-center gap-4">
            <hr className="flex-1 border-t border-gray-300" />
            <span className="text-sm text-gray-500">or continue with</span>
            <hr className="flex-1 border-t border-gray-300" />
          </div>

          <div className="flex justify-center gap-4">
            <div
              onClick={() => handleSocialSignup("facebook")}
              className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-full cursor-pointer hover:scale-105 transition"
            >
              <FaFacebookF />
            </div>

            <img
              src={goog}
              alt="Google"
              onClick={() => handleSocialSignup("google")}
              className="w-10 h-10 cursor-pointer hover:scale-105 transition"
            />

            <div
              onClick={() => handleSocialSignup("twitter")}
              className="w-10 h-10 flex items-center justify-center text-sky-500 border border-sky-500 rounded-full cursor-pointer hover:scale-105 transition"
            >
              <FaTwitter />
            </div>
          </div>

          <p className="text-center text-sm text-gray-600">
            Don't have an account yet?{" "}
            <a href="/signup" className="text-green-600 font-medium hover:underline">
              Signup
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;

