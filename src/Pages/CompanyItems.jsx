import { Link } from 'react-router';
import { use } from 'react';
import { motion } from 'framer-motion';

const fetchData = fetch('/companydata.json').then((res) => res.json());

const CompanyItems = () => {
    const data = use(fetchData);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
        hover: {
            scale: 1.05,
            transition: { duration: 0.3 },
        },
    };

    return (
        <div>
            <div className="w-full max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-8 sm:mb-12">
                    Our Partner Companies
                </h2>
                <motion.div
                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {data.map((company) => (
                        <motion.div
                            key={company.id}
                            variants={cardVariants}
                            whileHover="hover"
                        >
                            <Link
                                to={`/companydetails/${company.id}`}
                                className="flex items-center justify-center w-32 h-32 sm:w-40 sm:h-40 bg-white rounded-lg shadow-md transition-shadow duration-300"
                            >
                                <img
                                    src={company.logo}
                                    alt={`${company.name} logo`}
                                    className="max-w-full max-h-full object-contain p-4"
                                />
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default CompanyItems;