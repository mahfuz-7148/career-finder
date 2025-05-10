import { Link, NavLink } from 'react-router'; // Updated import
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';
import { useContext } from "react"; // Updated to useContext
import { AuthContext } from "../Provider/AuthProvider.jsx";

const Nav = () => {
    const { logoutUser, saveUser } = useContext(AuthContext);

    const logoutUserAuth = () => {
        logoutUser()
            .then(() => {
                console.log('out');
            })
            .catch(error => {
                console.log(error);
            });
    };

    const linkVariants = {
        hover: {
            scale: 1.1,
            color: '#1E3A8A',
            transition: { duration: 0.3 },
        },
    };

    const links = (
        <>
            <motion.li
                className="px-3 py-2 relative rounded group overflow-hidden font-medium bg-purple-50 text-purple-600 inline-block"
                whileHover="hover"
                variants={linkVariants}
            >
                <NavLink
                    className={({ isActive }) => (isActive ? 'border-b-2 border-purple-600' : '')}
                    to="/"
                >
                    <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-purple-600 group-hover:h-full opacity-90"></span>
                    <span className="relative group-hover:text-white">Home</span>
                </NavLink>
            </motion.li>


            {saveUser ? (
                <motion.li
                    className="px-3 py-2 relative rounded group overflow-hidden font-medium bg-purple-50 text-purple-600 inline-block"
                    whileHover="hover"
                    variants={linkVariants}
                >
                    <button onClick={logoutUserAuth}>
                        <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-purple-600 group-hover:h-full opacity-90"></span>
                        <span className="relative group-hover:text-white">Logout</span>
                    </button>
                </motion.li>
            ) : (
                <>
                    <motion.li
                        className="px-3 py-2 relative rounded group overflow-hidden font-medium bg-purple-50 text-purple-600 inline-block"
                        whileHover="hover"
                        variants={linkVariants}
                    >
                        <NavLink
                            className={({ isActive }) => (isActive ? 'border-b-2 border-purple-600' : '')}
                            to="/auth/login"
                        >
                            <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-purple-600 group-hover:h-full opacity-90"></span>
                            <span className="relative group-hover:text-white">Login</span>
                        </NavLink>
                    </motion.li>
                    <motion.li
                        className="px-3 py-2 relative rounded group overflow-hidden font-medium bg-purple-50 text-purple-600 inline-block"
                        whileHover="hover"
                        variants={linkVariants}
                    >
                        <NavLink
                            className={({ isActive }) => (isActive ? 'border-b-2 border-purple-600' : '')}
                            to="/auth/register"
                        >
                            <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-purple-600 group-hover:h-full opacity-90"></span>
                            <span className="relative group-hover:text-white">Register</span>
                        </NavLink>
                    </motion.li>
                </>
            )}
        </>
    );

    return (
        <div className="navbar w-full max-w-[90%] mx-auto sticky top-0 z-50 backdrop-blur-md px-4 sm:px-6 lg:px-8">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                    >
                        {links}
                        <div className="avatar">
                            <div className="ring-primary ring-offset-base-100 w-16 rounded-full ring-2 ring-offset-2">
                                <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" alt="Avatar" />
                            </div>
                        </div>
                    </ul>
                </div>
                <img className="w-12 sm:w-16" src={logo} alt="Logo" />
            </div>
            <div className="navbar-end hidden lg:flex">
                <div className="space-x-2">
                    {links}
                </div>
                <ul className="menu menu-horizontal px-1 ml-5">
                    {saveUser && saveUser.email && (
                        <div className="avatar">
                            <Link
                                to="/companydetails/userprofile"
                                className="ring-primary ring-offset-base-100 w-8 sm:w-10 rounded-full ring-2 ring-offset-2"
                            >
                                <img className="rounded-full" src={saveUser.photoURL} alt="Profile" />
                            </Link>
                        </div>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Nav;