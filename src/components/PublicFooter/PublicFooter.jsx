import { useState } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSuccessMessage("Thank you for subscribing!");
      setEmail("");
    } else {
      setSuccessMessage("Please enter a valid email address.");
    }
  };

  return (
    <footer className="bg-gray-950 pt-12 pb-4 relative overflow-hidden mt-auto">
      {/* Decorative Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-900/10 to-transparent transform rotate-45" />

      <div className="max-w-7xl mx-auto px-4 lg:px-0 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">BookShop</h2>
            <p className="text-sm text-gray-400">
              Your one-stop destination for the best books. Discover, learn, and
              grow with us.
            </p>
            <div className="flex space-x-4">
              {[
                {
                  icon: <FaFacebook />,
                  color: "hover:text-blue-500",
                  href: "https://facebook.com",
                },
                {
                  icon: <FaTwitter />,
                  color: "hover:text-blue-400",
                  href: "https://twitter.com",
                },
                {
                  icon: <FaInstagram />,
                  color: "hover:text-pink-500",
                  href: "https://instagram.com",
                },
                {
                  icon: <FaLinkedin />,
                  color: "hover:text-blue-600",
                  href: "https://linkedin.com",
                },
              ].map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-400 ${item.color} transition duration-300 transform hover:scale-110`}
                >
                  <span className="text-2xl">{item.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { text: "Home", to: "/" },
                { text: "About Us", to: "/about" },
                
                { text: "Contact", to: "/contact" },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.to}
                    className="text-sm text-gray-400 hover:text-blue-400 transition duration-300 hover:underline"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-white">Contact Us</h3>
            {[
              { text: "Email: support@bookshop.com" },
              { text: "Phone: +123 456 7890" },
              { text: "Address: 123 Book Street, Knowledge City" },
            ].map((info, index) => (
              <p
                key={index}
                className="text-sm text-gray-400 hover:text-blue-400 transition duration-300"
              >
                {info.text}
              </p>
            ))}
          </div>

          {/* Newsletter Subscription */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Newsletter</h3>
            <p className="text-sm text-gray-400">
              Subscribe to our newsletter for the latest updates and offers.
            </p>
            <form className="flex space-x-2" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-700"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-blue-600 transition duration-300"
              >
                Subscribe
              </button>
            </form>
            {successMessage && (
              <p className="text-green-400 mt-2">{successMessage}</p>
            )}
          </div>
        </div>

        {/* Copyright */}
        <div className=" border-gray-700 pt-2 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} BookShop. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;