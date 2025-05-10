import React, { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider.jsx";
import {Helmet} from "react-helmet-async";

const UserProfile = () => {
    const { saveUser, userUpdateProfile } = useContext(AuthContext);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [photoPreview, setPhotoPreview] = useState(saveUser?.photoURL || "");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setIsLoading(true);

        const name = e.target.fullName.value.trim();
        const photoUrl = e.target.photoUrl.value.trim();

        if (!name) {
            setError("Full name is required");
            setIsLoading(false);
            return;
        }

        try {
            await userUpdateProfile({
                displayName: name,
                photoURL: photoUrl || null,
            });
            setSuccess("Profile updated successfully!");
            setPhotoPreview(photoUrl || "");
        } catch (err) {
            setError("Failed to update profile. Please try again.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePhotoUrlChange = (e) => {
        setPhotoPreview(e.target.value.trim() || "");
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 p-4 font-sans">
            <Helmet>
                <title>
                    My Profile
                </title>
            </Helmet>
            <div className="flex flex-col md:flex-row gap-6 max-w-5xl w-full">
                {/* Profile Card */}
                <div className="bg-white rounded-xl shadow-lg p-6 w-full md:w-1/3 transform hover:scale-105 transition-transform duration-300">
                    <div className="h-28 bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-xl"></div>
                    <div className="flex justify-center -mt-16">
                        <img
                            src={saveUser?.photoURL || "https://via.placeholder.com/150?text=User"}
                            alt={saveUser?.displayName || "User"}
                            className="w-28 h-28 rounded-full border-4 border-white object-cover shadow-md"
                        />
                    </div>
                    <div className="text-center mt-4">
                        <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
                            {saveUser?.displayName || "Anonymous"}
                        </h2>
                        <p className="text-gray-500 flex items-center justify-center gap-2 mt-2 text-sm">
                            <span className="text-blue-600">✉️</span>
                            {saveUser?.email || "No email provided"}
                        </p>
                    </div>
                </div>

                {/* Edit Profile Card */}
                <div className="bg-white rounded-xl shadow-lg p-8 w-full md:w-2/3 transform hover:scale-101 transition-transform duration-300">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2 tracking-tight">
                        Edit Profile
                    </h2>
                    <p className="text-gray-500 mb-6 text-sm">Update your profile information</p>

                    {error && (
                        <p
                            className="text-red-500 mb-4 text-sm font-medium bg-red-50 p-3 rounded-lg"
                            role="alert"
                        >
                            {error}
                        </p>
                    )}
                    {success && (
                        <p
                            className="text-blue-600 mb-4 text-sm font-medium bg-blue-50 p-3 rounded-lg"
                            role="alert"
                        >
                            {success}
                        </p>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-5">
                            <label
                                className="block text-gray-700 mb-2 text-sm font-medium"
                                htmlFor="fullName"
                            >
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="fullName"
                                defaultValue={saveUser?.displayName || ""}
                                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-800 placeholder-gray-400 transition duration-200"
                                placeholder="Enter your full name"
                                required
                            />
                        </div>
                        <div className="mb-5">
                            <label
                                className="block text-gray-700 mb-2 text-sm font-medium"
                                htmlFor="photoUrl"
                            >
                                Profile Photo URL
                            </label>
                            <input
                                type="url"
                                name="photoUrl"
                                defaultValue={saveUser?.photoURL || ""}
                                onChange={handlePhotoUrlChange}
                                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-800 placeholder-gray-400 transition duration-200"
                                placeholder="Enter photo URL"
                            />
                        </div>
                        <div className="mt-5">
                            <p className="text-gray-700 mb-2 text-sm font-medium">
                                Profile image preview
                            </p>
                            <img
                                src={photoPreview || "https://via.placeholder.com/150?text=Preview"}
                                alt="Profile preview"
                                className="w-24 h-24 rounded-full object-cover shadow-sm"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`mt-6 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-white font-medium text-sm bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 ${
                                isLoading ? "opacity-70 cursor-not-allowed" : ""
                            }`}
                        >
                            {isLoading ? (
                                <span className="flex items-center gap-2">
                                    <svg
                                        className="animate-spin h-5 w-5 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
                                        ></path>
                                    </svg>
                                    Updating...
                                </span>
                            ) : (
                                "Update Profile"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;