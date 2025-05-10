import React from 'react';

const Footer = () => {
    return (
        <footer className="footer bg-slate-500 text-white p-4 sm:p-6 lg:p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <nav>
                <h6 className="footer-title text-base sm:text-lg">Services</h6>
                <a className="link link-hover text-sm sm:text-base">Branding</a>
                <a className="link link-hover text-sm sm:text-base">Design</a>
                <a className="link link-hover text-sm sm:text-base">Marketing</a>
                <a className="link link-hover text-sm sm:text-base">Advertisement</a>
            </nav>
            <nav>
                <h6 className="footer-title text-base sm:text-lg">Company</h6>
                <a className="link link-hover text-sm sm:text-base">About us</a>
                <a className="link link-hover text-sm sm:text-base">Contact</a>
                <a className="link link-hover text-sm sm:text-base">Jobs</a>
                <a className="link link-hover text-sm sm:text-base">Press kit</a>
            </nav>
            <nav>
                <h6 className="footer-title text-base sm:text-lg">Legal</h6>
                <a className="link link-hover text-sm sm:text-base">Terms of use</a>
                <a className="link link-hover text-sm sm:text-base">Privacy policy</a>
                <a className="link link-hover text-sm sm:text-base">Cookie policy</a>
            </nav>
            <form>
                <h6 className="footer-title text-base sm:text-lg">Newsletter</h6>
                <fieldset className="w-full sm:w-64">
                    <label className="text-sm sm:text-base">Enter your email address</label>
                    <div className="join mt-2">
                        <input
                            type="text"
                            placeholder="username@site.com"
                            className="input input-bordered join-item w-full text-gray-800 text-sm sm:text-base"
                        />
                        <button className="btn btn-primary join-item text-sm sm:text-base">Subscribe</button>
                    </div>
                </fieldset>
            </form>
        </footer>
    );
};

export default Footer;