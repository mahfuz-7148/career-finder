import React, { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider.jsx";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
import {Helmet} from "react-helmet-async";

const Register = () => {
    const { createUser, googleAuth, userUpdateProfile } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState("");

    // Function to map Firebase error codes to user-friendly messages
    const getFirebaseErrorMessage = (errorCode) => {
        switch (errorCode) {
            case "auth/email-already-in-use":
                return "This email is already registered. Please use a different email or log in.";
            case "auth/invalid-email":
                return "The email address is not valid. Please enter a valid email.";
            case "auth/weak-password":
                return "The password is too weak. Please use a stronger password.";
            case "auth/operation-not-allowed":
                return "Email/password accounts are not enabled. Please contact support.";
            case "auth/network-request-failed":
                return "Network error. Please check your connection and try again.";
            default:
                return "An error occurred during registration. Please try again.";
        }
    };

    const formRegister = async (e) => {
        e.preventDefault();
        setError("");
        const name = e.target.name.value.trim();
        const photo = e.target.photo.value.trim();
        const email = e.target.email.value.trim();
        const password = e.target.password.value.trim();

        const passRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        if (!passRegex.test(password)) {
            const errorMessage =
                "Password must be at least 6 characters, including a number, a lowercase, and an uppercase letter.";
            setError(errorMessage);
        }

        try {
            const res = await createUser(email, password);
            await userUpdateProfile({
                displayName: name,
                photoURL: photo,
            });

            navigate("/");
        } catch (error) {
            console.error("Firebase Error:", error.code, error.message);
            const firebaseErrorMessage = getFirebaseErrorMessage(error.code);
            setError(firebaseErrorMessage);

        }
    };

    const googleLogin = async () => {
        try {
            await googleAuth();

            navigate("/");
        } catch (error) {
            console.error("Firebase Error:", error.code, error.message);
            const firebaseErrorMessage = getFirebaseErrorMessage(error.code);
            setError(firebaseErrorMessage);

        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-4 font-sans">
            <Helmet>
                <title>
                    Register
                </title>
            </Helmet>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="card bg-white mx-auto w-full max-w-md rounded-xl shadow-lg p-6 transform hover:scale-101 transition-transform duration-300"
            >
                <div className="card-body">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2 tracking-tight text-center">
                        Create Account
                    </h2>
                    <p className="text-gray-500 mb-6 text-sm text-center">
                        Join us by filling in your details
                    </p>

                    {error && (
                        <p
                            className="text-red-500 mb-4 text-sm font-medium bg-red-50 p-3 rounded-lg text-center"
                            role="alert"
                        >
                            {error}
                        </p>
                    )}

                    <form onSubmit={formRegister} className="space-y-5">
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <label className="block relative">
                <span className="text-gray-700 text-sm font-medium mb-2 block">
                  Your Name
                </span>
                                <input
                                    type="text"
                                    name="name"
                                    className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                                    placeholder="Enter your name"
                                    required
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
                  Photo URL
                </span>
                                <input
                                    type="url"
                                    name="photo"
                                    className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                                    placeholder="Enter photo URL"
                                />
                            </label>
                        </motion.div>

                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <label className="block relative">
                <span className="text-gray-700 text-sm font-medium mb-2 block">
                  Your Email
                </span>
                                <input
                                    type="email"
                                    name="email"
                                    className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                                    placeholder="Enter your email"
                                    required
                                />
                            </label>
                        </motion.div>

                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                        >
                            <label className="block relative">
                <span className="text-gray-700 text-sm font-medium mb-2 block">
                  Your Password
                </span>
                                <input
                                    type="password"
                                    name="password"
                                    className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                                    placeholder="Enter your password"
                                    required
                                />
                            </label>
                        </motion.div>

                        <motion.button
                            type="submit"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            className="w-full flex items-center justify-center px-4 py-3 rounded-lg text-white font-medium text-sm bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                        >
                            Register
                        </motion.button>

                        <motion.button
                            type="button"
                            onClick={googleLogin}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.7 }}
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-gray-800 font-medium text-sm bg-white border border-gray-200 hover:bg-gray-50 transition-all duration-300 transform hover:scale-105"
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
                                        d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                                        fill="#34a853"
                                    />
                                    <path
                                        d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                                        fill="#4285f4"
                                    />
                                    <path
                                        d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                                        fill="#fbbc02"
                                    />
                                    <path
                                        d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                                        fill="#ea4335"
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

export default Register;