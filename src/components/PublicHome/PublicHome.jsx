import React from 'react';
import { Link } from 'react-router';

const PublicHome = () => {
    return (
        <div>

            <div
                className="min-h-screen bg-cover bg-center bg-no-repeat p-8"
                style={{
                    backgroundImage:
                        "url('/images/business-owner-working-their-strategy.jpg')",
                }}
            >
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between">
                    <div className="lg:w-1/2 space-y-6 mb-10 lg:mb-0">
                        <span className="text-purple-600 font-bold">#1 Productivity App</span>
                        <h1 className="text-5xl font-extrabold leading-tight text-white" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.7)' }}>
                            See why teams choose <br />
                            <span className="text-blue-600">Chronoxio</span> for Task Management.
                        </h1>
                        <p className="text-white text-lg" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                            Chronoxio’s flexible, user-friendly task boards help individuals and teams track tasks, monitor progress, and optimize time.
                        </p>
                        <div className="flex gap-4">
                            <Link
                                to="/app"
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                            >
                                Get Started
                            </Link>
                            <Link
                                to="/about-us"
                                className="px-6 py-3 bg-white border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-100"
                            >
                                Learn More
                            </Link>
                        </div>
                    </div>
                </div>



            </div>
            <div className='bg-gradient-to-br from-blue-100 via-purple-100 to-orange-100'>

                <div className="flex flex-col gap-6 p-8 max-w-7xl mx-auto">

                    <div className="hero bg-white rounded-2xl shadow-md hover:shadow-2xl transform transition-all duration-300 hover:-translate-y-2 p-6 h-[350px]">
                        <div className="hero-content flex-col lg:flex-row w-full">
                            <img
                                src="your-image-url-1.jpg"
                                className="w-1/2 h-full object-cover rounded-lg shadow-xl"
                                alt="Feature"
                            />
                            <div className="lg:ml-8 mt-6 lg:mt-0 flex-1">
                                <h1 className="text-4xl font-bold text-blue-700 mb-4">Create Tasks Effortlessly</h1>
                                <p className="text-gray-700 text-lg">
                                    Plan your day in seconds. With intuitive forms and built-in priority settings, Chronoxio lets you create and organize tasks faster than ever.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="hero bg-white rounded-2xl shadow-md hover:shadow-2xl transform transition-all duration-300 hover:-translate-y-2 p-6 h-[350px]">
                        <div className="hero-content flex-col lg:flex-row-reverse w-full">
                            <img
                                src="your-image-url-2.jpg"
                                className="w-1/2 h-full object-cover rounded-lg shadow-xl"
                                alt="Feature"
                            />
                            <div className="lg:mr-8 mt-6 lg:mt-0 flex-1">
                                <h1 className="text-4xl font-bold text-blue-700 mb-4">Track Time in Real-Time</h1>
                                <p className="text-gray-700 text-lg">
                                    Stay on top of your productivity. Chronoxio automatically records how long you spend on tasks so you can focus on what matters.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="hero bg-white rounded-2xl shadow-md hover:shadow-2xl transform transition-all duration-300 hover:-translate-y-2 p-6 h-[350px]">
                        <div className="hero-content flex-col lg:flex-row w-full">
                            <img
                                src="your-image-url-3.jpg"
                                className="w-1/2 h-full object-cover rounded-lg shadow-xl"
                                alt="Feature"
                            />
                            <div className="lg:ml-8 mt-6 lg:mt-0 flex-1">
                                <h1 className="text-4xl font-bold text-blue-700 mb-4">Visualize Your Progress</h1>
                                <p className="text-gray-700 text-lg">
                                    From daily logs to yearly reports, get clear, actionable insights with beautiful charts and stats that help you grow every day.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="hero bg-white rounded-2xl shadow-md hover:shadow-2xl transform transition-all duration-300 hover:-translate-y-2 p-6 h-[350px]">
                        <div className="hero-content flex-col lg:flex-row-reverse w-full">
                            <img
                                src="your-image-url-4.jpg"
                                className="w-1/2 h-full object-cover rounded-lg shadow-xl"
                                alt="Feature"
                            />
                            <div className="lg:mr-8 mt-6 lg:mt-0 flex-1">
                                <h1 className="text-4xl font-bold text-blue-700 mb-4">Compete. Climb. Celebrate.</h1>
                                <p className="text-gray-700 text-lg">
                                    Turn productivity into a game. Earn points, beat your records, and see where you stand on the leaderboard — alone or with your team.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>


        </div>
    );
};

export default PublicHome;
