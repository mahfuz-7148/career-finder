import { motion } from "framer-motion";
import React from "react";

const JobModal = ({ job, isOpen, onClose }) => {
    if (!isOpen) return null;

    const imageVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
    };

    const contentVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    };

    const textVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    };

    return (
        <motion.div
            className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <motion.div
                className="p-4 sm:p-6 bg-white rounded-lg shadow-md w-full max-w-md sm:max-w-lg"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.h3
                    className="text-lg sm:text-xl font-semibold text-gray-700 mb-2"
                    variants={textVariants}
                >
                    {job.title}
                </motion.h3>
                <motion.img
                    src={job.bannerImage}
                    alt={`${job.title} banner`}
                    className="w-full h-32 sm:h-40 object-cover rounded-lg mb-4"
                    variants={imageVariants}
                />
                <motion.p
                    className="text-gray-600 text-sm sm:text-base mb-2"
                    variants={textVariants}
                    transition={{ delay: 0.2 }}
                >
                    <strong>Type:</strong> {job.jobType}
                </motion.p>
                <motion.p
                    className="text-gray-600 text-sm sm:text-base mb-2"
                    variants={textVariants}
                    transition={{ delay: 0.3 }}
                >
                    <strong>Salary:</strong> {job.salary}
                </motion.p>
                <motion.p
                    className="text-gray-600 text-sm sm:text-base mb-2"
                    variants={textVariants}
                    transition={{ delay: 0.4 }}
                >
                    <strong>Location:</strong> {job.location}
                </motion.p>
                <motion.p
                    className="text-gray-600 text-sm sm:text-base mb-2"
                    variants={textVariants}
                    transition={{ delay: 0.5 }}
                >
                    <strong>Description:</strong> {job.description}
                </motion.p>
                <motion.p
                    className="text-gray-600 text-sm sm:text-base mb-4"
                    variants={textVariants}
                    transition={{ delay: 0.6 }}
                >
                    <strong>Requirements:</strong>
                </motion.p>
                <motion.ul
                    className="list-disc pl-5 mb-4 text-gray-600 text-sm sm:text-base"
                    variants={containerVariants}
                >
                    {job.requirements.map((req, index) => (
                        <motion.li
                            key={index}
                            variants={textVariants}
                            transition={{ delay: 0.7 + index * 0.1 }}
                        >
                            {req}
                        </motion.li>
                    ))}
                </motion.ul>
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <motion.a
                        href={job.website}
                        target="_blank"
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 text-sm sm:text-base text-center"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                    >
                        Apply
                    </motion.a>
                    <motion.button
                        onClick={onClose}
                        className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 text-sm sm:text-base"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                    >
                        Close
                    </motion.button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default JobModal;