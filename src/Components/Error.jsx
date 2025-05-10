import React from 'react';
import { Link } from 'react-router'; // Updated import
import roboterror from '../assets/error-contact.jpg';

const Error = () => {
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="rounded-lg p-6 sm:p-8 max-w-md sm:max-w-2xl text-center">
                <img
                    src={roboterror}
                    alt="404 Robot"
                    className="mx-auto mb-6 w-48 sm:w-64 rounded-2xl"
                />
                <h1 className="text-2xl sm:text-3xl font-bold text-pink-500 mb-2">
                    404 - Page Not Found
                </h1>
                <p className="text-black text-sm sm:text-base mb-6 font-semibold">
                    OOPS! The page you're looking for doesn't exist.
                </p>
                <Link to="/">
                    <button className="bg-blue-600 cursor-pointer text-white px-4 sm:px-6 py-2 rounded-md hover:bg-blue-700 transition text-sm sm:text-base">
                        Go Back Home
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Error;