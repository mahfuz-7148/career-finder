import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const ForgetPass = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const location = useLocation();
    const auth = getAuth();


    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const emailFromLogin = params.get("email");
        if (emailFromLogin) {
            setEmail(decodeURIComponent(emailFromLogin));
        }
    }, [location]);

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("Please enter a valid email address.");
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
            setError("Failed to send reset email. Please try again.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-4 font-sans">
            <Helmet>
                <title>Forget Password</title>
            </Helmet>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="card bg-white mx-auto w-full max-w-md rounded-xl shadow-lg p-6 transform hover:scale-101 transition-transform duration-300"
            >
                <div className="card-body">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2 tracking-tight text-center">
                        Reset Password
                    </h2>
                    <p className="text-gray-500 mb-6 text-sm text-center">
                        Enter your email to receive a password reset link
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

                    <form onSubmit={handleResetPassword} className="space-y-5">
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
                                    className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                                    placeholder="Enter your email"
                                />
                            </label>
                        </motion.div>

                        <motion.button
                            type="submit"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="w-full flex items-center justify-center px-4 py-3 rounded-lg text-white font-medium text-sm bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                        >
                            Reset Password
                        </motion.button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default ForgetPass;