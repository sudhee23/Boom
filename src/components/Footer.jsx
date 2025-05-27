
// components/Footer.jsx
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-pink-500 text-white py-6 mt-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <p className="text-sm">&copy; {new Date().getFullYear()} Boom. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <Link to="/privacy" className="hover:text-yellow-300 transition">Terms & Conditions</Link>
          <Link to="/privacy" className="hover:text-yellow-300 transition">Privacy Policy</Link>
          <Link to="/contact" className="hover:text-yellow-300 transition">Contact</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
