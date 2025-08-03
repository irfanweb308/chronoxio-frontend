import React from 'react';
import { FaChartLine, FaTasks, FaUserShield, FaClock } from 'react-icons/fa';

const Services = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-purple-100 text-gray-800">
            {/* Hero Section */}
            <div className="text-center py-20 px-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
                <p className="max-w-2xl mx-auto text-lg md:text-xl">
                    We provide cutting-edge tools to help you stay productive, organized, and ahead of your goals.
                </p>
            </div>

            {/* Services Grid */}
            <div className="py-16 px-6 md:px-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition p-6 text-center">
                    <div className="text-indigo-600 text-4xl mb-4">
                        <FaTasks />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Smart Task Management</h3>
                    <p className="text-gray-600">
                        Organize your to-dos by category, priority, and time. Never miss a deadline again.
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition p-6 text-center">
                    <div className="text-green-600 text-4xl mb-4">
                        <FaClock />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Time Tracking</h3>
                    <p className="text-gray-600">
                        Keep track of how much time you're spending on tasks and boost your time efficiency.
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition p-6 text-center">
                    <div className="text-yellow-500 text-4xl mb-4">
                        <FaChartLine />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Performance Analytics</h3>
                    <p className="text-gray-600">
                        View detailed reports of your progress and productivity with elegant charts and metrics.
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition p-6 text-center">
                    <div className="text-red-500 text-4xl mb-4">
                        <FaUserShield />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Secure Data</h3>
                    <p className="text-gray-600">
                        Your data is encrypted and protected with top-level security measures.
                    </p>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-indigo-600 py-16 text-white text-center px-6">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to boost your productivity?</h2>
                <p className="text-lg mb-8">
                    Join hundreds of users who trust our platform for better time and task management.
                </p>
                <a
                    href="/app/dashboard"
                    className="inline-block bg-white text-indigo-700 font-bold py-3 px-6 rounded-full shadow hover:shadow-lg transition"
                >
                    Get Started Now
                </a>
            </div>
        </div>
    );
};

export default Services;
