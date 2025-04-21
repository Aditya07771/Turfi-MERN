import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import logo from "../../assets/logo.svg";

const Login = () => {
  const navigate = useNavigate();
  const { backendUrl, setIsloggedin, setIsAdmin, getUserData } =
    useContext(AppContext);

  const [state, setState] = useState("Sign Up");
  const [userType, setUserType] = useState("user"); // 'user', 'owner', or 'admin'
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      axios.defaults.withCredentials = true;

      let endpoint = "";
      let successMessage = "";
      let redirectPath = "/";

      switch (userType) {
        case "admin":
          endpoint = "/api/owner/admin/login";
          successMessage = "Admin login successful!";
          redirectPath = "/admin-dashboard";
          break;
        case "owner":
          endpoint =
            state === "Sign Up" ? "/api/owner/signup" : "/api/owner/login";
          successMessage =
            state === "Sign Up"
              ? "Business registration submitted. Awaiting admin approval."
              : "Business login successful!";
          redirectPath = state === "Sign Up" ? "/waiting-approval" : "/owner"; // New route for pending approval
          break;
        case "user":
        default:
          endpoint =
            state === "Sign Up" ? "/api/auth/register" : "/api/auth/login";
          successMessage =
            state === "Sign Up"
              ? "Registration successful! Please verify your email."
              : "Login successful! Welcome back.";
          redirectPath = state === "Sign Up" ? "/email-verify" : "/";
          break;
      }

      const requestBody =
        userType === "owner"
          ? state === "Sign Up"
            ? { fullName: name, email, password, companyName }
            : { email, password }
          : userType === "admin"
          ? { email, password }
          : state === "Sign Up"
          ? { name, email, password }
          : { email, password };

      const { data } = await axios.post(
        `${backendUrl}${endpoint}`,
        requestBody
      );

      if (data.success) {
        if (userType === "admin") {
          localStorage.setItem("adminToken", data.token);
          setTimeout(() => {
            setIsAdmin(true);
            setIsloggedin(true);
            toast.success(successMessage);
            navigate("/admin-dashboard");
          }, 100);
          return;
        }

        // In Login.jsx - onSubmitHandler function
        // In Login.jsx - update the onSubmitHandler function for owner login case
        if (userType === "owner") {
          if (state === "Sign Up") {
            // For signup, just show success message and redirect
            toast.success(successMessage);
            navigate("/waiting-approval");
          } else {
            // For login, save the token explicitly if it's returned
            if (data.token) {
              document.cookie = `ownerToken=${data.token}; path=/; max-age=${
                24 * 60 * 60
              }; SameSite=Lax`;
            }
            setIsloggedin(true);
            getUserData();
            toast.success(successMessage);
            navigate("/owner");
          }
          return;
        }

        // For regular users
        toast.success(successMessage);
        setIsloggedin(true);
        getUserData();
        navigate(redirectPath);
      }
    } catch (error) {
      if (userType === "admin") {
        if (error.response?.status === 401) {
          toast.error("Invalid admin credentials");
        } else {
          toast.error(error.response?.data?.message || "Admin login failed");
        }
      } else {
        toast.error(error.response?.data?.message || "An error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-sky-950 relative overflow-hidden mt-16 ">
      <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 top-0">
        <motion.div
          className="bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-2xl w-full max-w-md text-white border border-white/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent">
            {userType === "user"
              ? state === "Sign Up"
                ? "Create User Account"
                : "User Login"
              : userType === "owner"
              ? state === "Sign Up"
                ? "Register Business"
                : "Business Login"
              : state === "Login"
              ? "Admin Login"
              : "Admin Signup"}
          </h2>

          {/* Toggle between user, business owner, and admin */}
          <div className="flex rounded-full bg-sky-900/50 p-1 mb-6">
            <button
              className={`flex-1 py-2 rounded-full transition-all ${
                userType === "user"
                  ? "bg-gradient-to-r from-teal-500 to-green-500 text-white"
                  : "text-white/70 hover:text-white"
              }`}
              onClick={() => setUserType("user")}
            >
              User
            </button>
            <button
              className={`flex-1 py-2 rounded-full transition-all ${
                userType === "owner"
                  ? "bg-gradient-to-r from-teal-500 to-green-500 text-white"
                  : "text-white/70 hover:text-white"
              }`}
              onClick={() => setUserType("owner")}
            >
              Owner
            </button>
            <button
              className={`flex-1 py-2 rounded-full transition-all ${
                userType === "admin"
                  ? "bg-gradient-to-r from-teal-500 to-green-500 text-white"
                  : "text-white/70 hover:text-white"
              }`}
              onClick={() => setUserType("admin")}
            >
              Admin
            </button>
          </div>

          <form onSubmit={onSubmitHandler}>
            {userType !== "admin" && state === "Sign Up" && (
              <div className="mb-4">
                <label className="block text-white/70 mb-2 text-sm">
                  Full Name
                </label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg outline-none focus:border-green-400 transition-all"
                  type="text"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}

            <div className="mb-4">
              <label className="block text-white/70 mb-2 text-sm">Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg outline-none focus:border-green-400 transition-all"
                type="email"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-white/70 mb-2 text-sm">
                Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg outline-none focus:border-green-400 transition-all"
                type="password"
                placeholder="Create a password"
                required
              />
            </div>

            {userType === "owner" && state === "Sign Up" && (
              <div className="mb-4">
                <label className="block text-white/70 mb-2 text-sm">
                  Company Name
                </label>
                <input
                  onChange={(e) => setCompanyName(e.target.value)}
                  value={companyName}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg outline-none focus:border-green-400 transition-all"
                  type="text"
                  placeholder="Enter your company name"
                  required
                />
              </div>
            )}

            {state === "Login" && (
              <p
                onClick={() => navigate("/reset-password")}
                className="mb-4 text-green-400 hover:text-green-300 cursor-pointer text-sm text-right"
              >
                Forgot password?
              </p>
            )}

            <motion.button
              className="w-full py-3 rounded-lg bg-gradient-to-r from-teal-500 to-green-500 text-white font-medium mt-2 relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing...
                </div>
              ) : (
                state
              )}
            </motion.button>
          </form>

          {userType !== "admin" &&
            (state === "Sign Up" ? (
              <p className="text-white/70 text-center text-sm mt-6">
                Already have an account?{" "}
                <span
                  onClick={() => setState("Login")}
                  className="text-green-400 cursor-pointer hover:underline"
                >
                  Login here
                </span>
              </p>
            ) : (
              <p className="text-white/70 text-center text-sm mt-6">
                Don't have an account?{" "}
                <span
                  onClick={() => setState("Sign Up")}
                  className="text-green-400 cursor-pointer hover:underline"
                >
                  Sign up
                </span>
              </p>
            ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
