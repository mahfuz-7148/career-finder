import React from 'react';
import { motion } from 'framer-motion';
import banner from '../assets/banner.jpg';

const Hero = () => {
    const textVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
    };

    const imageVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.2, ease: 'easeOut' } },
    };

    return (
        <div>
            <div className="flex flex-col md:flex-row items-center justify-between w-full py-8 px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="w-full md:w-1/2 mb-6 md:mb-0 md:pr-8"
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.h1
                        className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4"
                        variants={textVariants}
                    >
                        Welcome to CareerFinder
                    </motion.h1>
                    <motion.p
                        className="text-gray-600 text-base sm:text-lg leading-relaxed"
                        variants={textVariants}
                        transition={{ delay: 0.3 }}
                    >
                        CareerFinder is an innovative and user-friendly website designed to help job seekers explore a wide variety of job opportunities across multiple companies.
                    </motion.p>
                </motion.div>

                <motion.div
                    className="w-full md:w-1/2"
                    variants={imageVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <img
                        src={banner}
                        alt="Job Opportunities"
                        className="w-full h-auto rounded-lg shadow-lg object-cover"
                    />
                </motion.div>
            </div>

            <div className="w-full py-8 px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-8 sm:mb-12">How It Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-10">
                    {['Explore Opportunities', 'Review Criteria', 'Apply Now'].map((title, index) => (
                        <motion.div
                            key={index}
                            className="text-center p-4 sm:p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                        >
                            <svg
                                className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-4 text-blue-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d={
                                        index === 0
                                            ? 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                                            : index === 1
                                                ? 'M9 5l7 7-7 7'
                                                : 'M5 13l4 4L19 7'
                                    }
                                />
                            </svg>
                            <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">{title}</h3>
                            <p className="text-gray-600 text-sm sm:text-base">
                                {index === 0
                                    ? 'Browse through a wide range of job listings from various companies using our powerful search tool.'
                                    : index === 1
                                        ? 'Check the job requirements and qualifications to see if you’re a good fit for the role.'
                                        : 'Submit your application directly through our platform with ease and confidence.'}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Hero;