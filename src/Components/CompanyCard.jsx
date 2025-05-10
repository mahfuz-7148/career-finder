import React, { useState } from 'react';
import { motion } from 'framer-motion';
import JobModal from "./JobModal.jsx";

const CompanyDetailsPage = ({ company }) => {
    const jobs = company.jobs || [];
    const [selectedJob, setSelectedJob] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const imageVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.2, ease: 'easeOut' } },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
        hover: {
            scale: 1.05,
            boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.2)',
            transition: { duration: 0.3 },
        },
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const textVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    };

    const handleOpenModal = (job) => {
        setSelectedJob({ ...job, website: company.website });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedJob(null);
        setIsModalOpen(false);
    };

    const {logo, name, industry, location} = company

    return (
        <div className="w-[95%] mx-auto py-16 px-10">

            <motion.div
                className="mb-12 text-center"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="flex justify-center">
                    <motion.img
                        src={logo}
                        className="w-32 h-32 object-contain mb-4"
                        variants={imageVariants}
                        initial="hidden"
                        animate="visible"
                    />
                </div>
                <motion.h1
                    className="text-3xl font-bold text-gray-800 mb-4"
                    variants={textVariants}
                >
                    {name}
                </motion.h1>
                <motion.p
                    className="text-gray-600 mb-2"
                    variants={textVariants}
                    transition={{ delay: 0.2 }}
                >
                    <strong>Industry:</strong> {industry}
                </motion.p>
                <motion.p
                    className="text-gray-600 mb-2"
                    variants={textVariants}
                    transition={{ delay: 0.3 }}
                >
                    <strong>Location:</strong> {location}
                </motion.p>
            </motion.div>

            <motion.div
                className="grid grid-cols-1 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {jobs.map((job) => (
                    <motion.div
                        key={job.id}
                        className="p-6 bg-white rounded-lg shadow-md"
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                    >
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">{job.title}</h3>
                        <p className="text-gray-600 mb-2">
                            <strong>Type:</strong> {job.jobType}
                        </p>
                        <p className="text-gray-600 mb-4">
                            <strong>Salary:</strong> {job.salary}
                        </p>
                        <button
                            onClick={() => handleOpenModal(job)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        >
                            Details
                        </button>
                    </motion.div>
                ))}
            </motion.div>

            <JobModal job={selectedJob} isOpen={isModalOpen} onClose={handleCloseModal} />
        </div>
    );
};

export default CompanyDetailsPage;
