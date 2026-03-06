import { motion as Motion } from "framer-motion";

export default function Footer() {
  return (
    <Motion.footer
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-24 bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-600"
    >
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="rounded-full px-3 py-1 brand-gradient text-white font-semibold shadow">
              TutorConnect
            </div>
          </div>
          <p className="text-sm text-gray-300">
            Connecting passionate tutors with eager learners for personalized
            home education experiences.
          </p>
          <div className="flex gap-3 mt-3">
            {/* <a href="https://x.com" aria-label="Twitter" className="hover:text-yellow-300">
              <svg
                // xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M8 19c7 0 11-5.8 11-10.8v-.5A7.5 7.5 0 0021 5.1a7.3 7.3 0 01-2 .5 3.7 3.7 0 001.6-2A7.4 7.4 0 0016.8 6a3.7 3.7 0 00-6.4 3.4A10.5 10.5 0 013 4.7a3.7 3.7 0 001.1 5A3.6 3.6 0 012.8 9v.1a3.7 3.7 0 002.9 3.6 3.7 3.7 0 01-1 .1 3 3 0 01-.7-.1 3.7 3.7 0 003.4 2.6A7.4 7.4 0 015 17.3 10.6 10.6 0 008 19z" />
              </svg>
            </a> */}
            {/* <a href="#" aria-label="Facebook" className="hover:text-yellow-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M22 12a10 10 0 10-11.5 9.9v-7h-2.2v-2.9h2.2V9.4c0-2.2 1.3-3.4 3.3-3.4.9 0 1.8.1 1.8.1v2h-1c-1 0-1.4.7-1.4 1.4v1.7h2.5l-.4 2.9h-2.1v7A10 10 0 0022 12z" />
              </svg>
            </a> */}
            {/* <a
              href="#"
              aria-label="Instagram"
              className="hover:text-yellow-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 6.2A4.8 4.8 0 1016.8 13 4.8 4.8 0 0012 8.2zM18.4 6.6a1.1 1.1 0 11-1.1-1.1 1.1 1.1 0 011.1 1.1z" />
              </svg>
            </a> */}
          </div>
        </div>

        <div>
          <h5 className="font-semibold text-white">Quick Links</h5>
          <ul className="mt-3 space-y-2 text-lg text-gray-300">
            <li>
              <a href="#" className="hover:text-yellow-300">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-300">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-300">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-300">
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="font-semibold text-white">Services</h5>
          <ul className="mt-3 space-y-2 text-lg text-gray-300">
            <li>
              <a href="#" className="hover:text-yellow-300">
                Home Tutoring
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-300">
                Online Tutoring
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-300">
                Exam Prep
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-300">
                Skill Development
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="font-semibold text-white">Newsletter</h5>
          <p className="text-lg text-gray-300 mt-2">
            Get updates, tips and resources for tutors and students.
          </p>
          {/* <form
            className="mt-3 flex gap-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              aria-label="Email"
              className="flex-1 rounded-md px-3 py-2 text-sm"
              placeholder="Your email"
            />
            <button className="px-3 py-2 rounded-md bg-yellow-300 text-black font-semibold">
              Subscribe
            </button>
          </form> */}
        </div>
      </div>

      <div className="border-t border-white/5 mt-6">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
          <div>©️ 2025 TutorConnect. All rights reserved.</div>
          <div className="mt-3 md:mt-0">
            123 Education St, Learning City • info@tutorconnect.com •
            <a
              href="https://wa.me/919582273806"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 hover:text-green-300 transition-colors duration-200 ml-1"
            >
              +91 95822 73806
            </a>
          </div>
        </div>
      </div>
    </Motion.footer>
  );
}
