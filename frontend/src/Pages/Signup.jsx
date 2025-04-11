import { useState } from "react";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { LiaEyeSolid, LiaEyeSlashSolid } from "react-icons/lia";
import { CgProfile } from "react-icons/cg";
import goog from "../../public/images/google (1).png";

const Signup = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    console.log("Signed up with:", form);
  };

  const handleSocialSignup = (provider) => {
    console.log(`Signing up with ${provider}...`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">Create Account</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="relative">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              className="w-full px-4 py-3 pr-10 rounded-md border border-gray-300 focus:ring-2 focus:ring-green-400 outline-none text-gray-700"
            />
            <CgProfile className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400" />
          </div>

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

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 pr-10 rounded-md border border-gray-300 focus:ring-2 focus:ring-green-400 outline-none text-gray-700"
            />
            {showConfirmPassword ? (
              <LiaEyeSlashSolid
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                onClick={() => setShowConfirmPassword(false)}
              />
            ) : (
              <LiaEyeSolid
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                onClick={() => setShowConfirmPassword(true)}
              />
            )}
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-green-400 to-sky-400 text-white font-semibold rounded-md hover:opacity-90 transition"
          >
            Sign Up
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
          Already have an account?{" "}
          <a href="/signin" className="text-green-600 font-medium hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
