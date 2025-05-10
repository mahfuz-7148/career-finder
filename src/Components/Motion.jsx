import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from "react-router";

const Motion = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [suggestion, setSuggestion] = useState('');
    const quizOptions = [
        { id: 1, label: 'Technology', category: 'Software Engineering' },
        { id: 2, label: 'Finance', category: 'Financial Analyst' },
        { id: 3, label: 'Healthcare', category: 'Medical Professional' },
        { id: 4, label: 'Creative', category: 'Graphic Design' },
    ];
    const handleOptionClick = (option) => {
        setSelectedOption(option.id);
        setSuggestion(`Explore ${option.category} roles tailored for you!`);
    };
    return (
        <div className="w-full max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-8 sm:mb-12">Find Your Perfect Job Match</h2>
            <p className="text-gray-600 text-center text-sm sm:text-base mb-6 sm:mb-8">Answer a quick question to discover roles that suit you!</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
                {quizOptions.map((option) => (
                    <motion.button
                        key={option.id}
                        onClick={() => handleOptionClick(option)}
                        className={`p-3 sm:p-4 rounded-lg shadow-md text-center text-sm sm:text-base ${
                            selectedOption === option.id ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-blue-100'
                        } transition-colors duration-300`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {option.label}
                    </motion.button>
                ))}
            </div>
            <AnimatePresence>
                {suggestion && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="mt-6 sm:mt-8 text-center"
                    >
                        <p className="text-base sm:text-lg text-gray-700 mb-4">{suggestion}</p>
                        <Link
                            to="/jobs"
                            className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300 text-sm sm:text-base"
                        >
                            Browse Jobs
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Motion;