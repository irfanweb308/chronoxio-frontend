import React from 'react';
import { FaChartLine, FaTasks, FaUserShield, FaClock } from 'react-icons/fa';

const Services = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-white text-gray-800 mb-5">
            {/* Hero Section */}
            <section className="text-center py-24 px-6 bg-white shadow-sm">
                <h1 className="text-5xl font-extrabold mb-4 text-slate-800">What We Offer</h1>
                <p className="max-w-xl mx-auto text-lg text-gray-600">
                    Explore a suite of powerful tools designed to keep you productive, focused, and secure.
                </p>
            </section>

            {/* Services Grid */}
            <section className="py-20 px-6 md:px-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    {[
                        {
                            icon: <FaTasks />,
                            title: "Smart Task Management",
                            color: "text-indigo-600",
                            desc: "Easily organize tasks with categories, deadlines, and reminders.",
                        },
                        {
                            icon: <FaClock />,
                            title: "Time Tracking",
                            color: "text-emerald-500",
                            desc: "Measure time spent and stay accountable across your projects.",
                        },
                        {
                            icon: <FaChartLine />,
                            title: "Performance Analytics",
                            color: "text-amber-500",
                            desc: "Track progress with visual reports and goal-based analytics.",
                        },
                        {
                            icon: <FaUserShield />,
                            title: "Secure Data",
                            color: "text-rose-500",
                            desc: "Your privacy is protected with enterprise-grade encryption.",
                        },
                    ].map((item, index) => (
                        <div
                            key={index}
                            className="bg-white backdrop-blur-sm border border-gray-200 rounded-2xl p-8 shadow-md hover:shadow-xl transition duration-300 text-center"
                        >
                            <div className={`text-4xl mb-4 ${item.color}`}>{item.icon}</div>
                            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                            <p className="text-gray-600">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-slate-900 py-24 text-white text-center px-6 relative overflow-hidden">
                <div className="relative z-10 max-w-4xl mx-auto">
                    <h2 className="text-4xl font-bold mb-4">Start Smarter. Work Better.</h2>
                    <p className="mb-8 text-lg text-slate-300">
                        Whether you're managing tasks solo or leading a team — Chronoxio makes it simple and powerful.
                    </p>
                    <a
                        href="/app/dashboard"
                        className="inline-block bg-white text-slate-900 font-semibold px-8 py-3 rounded-full hover:bg-slate-100 transition shadow-lg"
                    >
                        Get Started Now
                    </a>
                </div>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-indigo-700/30 via-rose-700/30 to-transparent blur-2xl opacity-10 z-0"></div>
            </section>
        </div>
    );
};

export default Services;
