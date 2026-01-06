import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">

          {/* Social Icons (DESKTOP ONLY) */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="#" className="hover:text-white transition">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2V12h2.3l-.4 3h-1.9v7A10 10 0 0 0 22 12z"/>
              </svg>
            </a>

            <a href="#" className="hover:text-white transition">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.43.36a9 9 0 0 1-2.86 1.1A4.5 4.5 0 0 0 16.11 0c-2.63 0-4.67 2.44-4.06 5a12.94 12.94 0 0 1-9.39-4.76 4.49 4.49 0 0 0 1.39 6A4.41 4.41 0 0 1 .96 6v.06a4.5 4.5 0 0 0 3.61 4.41 4.52 4.52 0 0 1-2 .08 4.51 4.51 0 0 0 4.2 3.12A9 9 0 0 1 0 19.54 12.7 12.7 0 0 0 6.92 22c8.3 0 12.84-7 12.54-13.3A9.18 9.18 0 0 0 23 3z"/>
              </svg>
            </a>

            <a href="#" className="hover:text-white transition">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.3c-1 0-1.8-.8-1.8-1.8s.8-1.8 1.8-1.8 1.8.8 1.8 1.8-.8 1.8-1.8 1.8zm13.5 11.3h-3v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7h-3v-10h2.9v1.4h.1c.4-.8 1.4-1.7 3-1.7 3.2 0 3.8 2.1 3.8 4.8v5.5z"/>
              </svg>
            </a>
          </div>

          {/* COPYRIGHT (MOBILE + DESKTOP) */}
          <p className="text-sm text-gray-400 text-center md:text-left">
            © 2026{" "}
            <span className="font-medium text-gray-300">
              SociallyConnect - All Rights Reserved
            </span>
          </p>

          {/* LINKS (DESKTOP ONLY) */}
          <div className="hidden md:flex items-center space-x-4 text-sm">
            <a href="#" className="hover:text-white transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition">
              Terms of Service
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
