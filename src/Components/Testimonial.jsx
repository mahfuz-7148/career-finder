import React from 'react';
import { motion } from 'framer-motion';
import { use } from 'react';

const fetchData = fetch('/testimonial.json').then((res) => res.json());

const Testimonial = () => {
    const data = use(fetchData);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
        hover: {
            scale: 1.05,
            boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.2)',
            transition: { duration: 0.3 },
        },
    };

    return (
        <div className="w-full max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-8 sm:mb-12">
                What Our Users Say
            </h2>
            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {data.map((testimonial, index) => (
                    <motion.div
                        key={index}
                        className="p-4 sm:p-6 bg-white rounded-lg shadow-md transition-shadow duration-300 text-center"
                        variants={cardVariants}
                        whileHover="hover"
                    >
                        <p className="text-gray-600 italic text-sm sm:text-base mb-4">"{testimonial.testimonial}"</p>
                        <h3 className="text-base sm:text-lg font-semibold text-gray-700">{testimonial.name}</h3>
                        <p className="text-gray-500 text-sm">{testimonial.role}</p>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default Testimonial;