import React, { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider.jsx";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet-async";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const Login = () => {
    const { loginUser, googleAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const auth = getAuth();

    // ফায়ারবেস এরর মেসেজ ম্যাপিং
    const getFirebaseErrorMessage = (errorCode) => {
        switch (errorCode) {
            case "auth/user-not-found":
                return "No account found with this email. Please register or try a different email.";
            case "auth/wrong-password":
                return "Incorrect password. Please try again or reset your password.";
            case "auth/invalid-email":
                return "The email address is not valid. Please enter a valid email.";
            case "auth/invalid-credential":
                return "Invalid credentials. Please check your email and password.";
            case "auth/too-many-requests":
                return "Too many login attempts. Please try again later.";
            case "auth/network-request-failed":
                return "Network error. Please check your connection and try again.";
            default:
                return "An error occurred during login. Please try again.";
        }
    };

    // লগইন ফর্ম হ্যান্ডলার
    const formLogin = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        const password = e.target.password.value.trim();

        if (!email || !password) {
            setError("Please enter both email and password.");
            return;
        }

        try {
            await loginUser(email, password);
            setSuccess("Login successful!");
            navigate("/");
        } catch (error) {
            console.error("Firebase Error:", error.code, error.message);
            setError(getFirebaseErrorMessage(error.code));
        }
    };

    // গুগল লগইন হ্যান্ডলার
    const googleLogin = async () => {
        setError("");
        setSuccess("");
        try {
            await googleAuth();
            setSuccess("Google login successful!");
            navigate("/");
        } catch (error) {
            console.error("Firebase Error:", error.code, error.message);
            setError(getFirebaseErrorMessage(error.code));
        }
    };

    // পাসওয়ার্ড রিসেট হ্যান্ডলার
    const handleResetPassword = async () => {
        setError("");
        setSuccess("");
        if (!email) {
            setError("Please enter your email to reset your password.");
            return;
        }

        try {
            await sendPasswordResetEmail(auth, email);
            setSuccess("Password reset email sent! Please check your inbox.");
            setTimeout(() => {
                window.location.href = "https://mail.google.com";
            }, 2000);
        } catch (error) {
            console.error("Password Reset Error:", error.code, error.message);
            setError(getFirebaseErrorMessage(error.code) || "Failed to send reset email. Please try again.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-4">
            <Helmet>
                <title>Login</title>
            </Helmet>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="card bg-white mx-auto w-full max-w-sm sm:max-w-md rounded-xl shadow-lg p-6 sm:p-8"
            >
                <div className="card-body">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 tracking-tight text-center">
                        Welcome Back
                    </h2>
                    <p className="text-gray-500 mb-6 text-sm sm:text-base text-center">
                        Sign in to your account
                    </p>

                    {error && (
                        <p
                            className="text-red-500 mb-4 text-sm font-medium bg-red-50 p-3 rounded-lg text-center"
                            role="alert"
                        >
                            {error}
                        </p>
                    )}
                    {success && (
                        <p
                            className="text-blue-600 mb-4 text-sm font-medium bg-blue-50 p-3 rounded-lg text-center"
                            role="alert"
                        >
                            {success}
                        </p>
                    )}

                    <form onSubmit={formLogin} className="space-y-5">
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <label className="block relative">
                <span className="text-gray-700 text-sm font-medium mb-2 block">
                  Your Email
                </span>
                                <input
                                    required
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 text-sm sm:text-base"
                                    placeholder="Enter your email"
                                />
                            </label>
                        </motion.div>

                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <label className="block relative">
                <span className="text-gray-700 text-sm font-medium mb-2 block">
                  Your Password
                </span>
                                <input
                                    required
                                    type="password"
                                    name="password"
                                    className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 text-sm sm:text-base"
                                    placeholder="Enter your password"
                                />
                            </label>
                        </motion.div>

                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="text-right"
                        >
                            <button
                                type="button"
                                onClick={handleResetPassword}
                                className="text-sm text-blue-600 hover:text-blue-700 transition-colors duration-200"
                            >
                                Forgot password?
                            </button>
                        </motion.div>

                        <motion.button
                            type="submit"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="w-full flex items-center justify-center px-4 py-3 rounded-lg text-white font-medium text-sm sm:text-base bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                        >
                            Login
                        </motion.button>

                        <motion.button
                            type="button"
                            onClick={googleLogin}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-gray-800 font-medium text-sm sm:text-base bg-white border border-gray-200 hover:bg-gray-50 transition-all duration-300 transform hover:scale-105"
                        >
                            <svg
                                aria-label="Google logo"
                                width="20"
                                height="20"
                                viewBox="0 0 512 512"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g>
                                    <path
                                        fill="#34a853"
                                        d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                                    />
                                    <path
                                        fill="#4285f4"
                                        d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                                    />
                                    <path
                                        fill="#fbbc02"
                                        d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                                    />
                                    <path
                                        fill="#ea4335"
                                        d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                                    />
                                </g>
                            </svg>
                            Sign in with Google
                        </motion.button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;