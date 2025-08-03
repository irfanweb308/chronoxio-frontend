import React from 'react';

const AboutUs = () => {
    return (
        <div className="bg-gray-50 text-gray-800">
           
            <section className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-20 px-6 text-center">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">About Chronoxio</h1>
                <p className="text-lg md:text-xl max-w-3xl mx-auto">
                    We are on a mission to help people manage their time, tasks, and productivity through a smart and intuitive platform.
                </p>
            </section>

           
            <section className="max-w-7xl mx-auto py-16 px-6 grid md:grid-cols-2 gap-12">
                <div>
                    <h2 className="text-3xl font-semibold mb-4 text-indigo-600">Our Mission</h2>
                    <p className="text-lg leading-relaxed">
                        Our mission is to empower individuals and teams to achieve more by providing a seamless productivity experience through thoughtful design and robust features.
                    </p>
                </div>
                <div>
                    <h2 className="text-3xl font-semibold mb-4 text-purple-600">Our Vision</h2>
                    <p className="text-lg leading-relaxed">
                        To become the world’s most trusted time management platform that redefines how people work, collaborate, and thrive.
                    </p>
                </div>
            </section>

           
            <section className="bg-white py-16 px-6">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-10 text-gray-900">Our Core Values</h2>
                    <div className="grid md:grid-cols-3 gap-10">
                        <div className="p-6 border rounded-lg shadow hover:shadow-md transition">
                            <h3 className="text-xl font-semibold text-indigo-600 mb-2">Transparency</h3>
                            <p>We build trust by being open and honest with our users and team.</p>
                        </div>
                        <div className="p-6 border rounded-lg shadow hover:shadow-md transition">
                            <h3 className="text-xl font-semibold text-purple-600 mb-2">Innovation</h3>
                            <p>We constantly explore new ideas and deliver cutting-edge solutions.</p>
                        </div>
                        <div className="p-6 border rounded-lg shadow hover:shadow-md transition">
                            <h3 className="text-xl font-semibold text-blue-600 mb-2">User First</h3>
                            <p>Every decision we make is driven by the needs of our users.</p>
                        </div>
                    </div>
                </div>
            </section>

           
            <section className="bg-gray-100 py-16 px-6">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-12 text-gray-900">Meet the Team</h2>
                    
                    <div className="grid md:grid-cols-4 gap-10">
                        <div>
                            <img className="w-28 aspect-square mx-auto rounded-full shadow-lg object-cover" src="/public/images/CTO.jpeg" alt="" />
                            <h3 className="mt-4 font-semibold text-lg">Abidur Rahman Arko</h3>
                            <p className="text-sm text-gray-500">Chief Technology Officer</p>
                        </div>
                        <div>
                            <img className="w-28 aspect-square  mx-auto rounded-full shadow-lg object-cover" src="/public/images/2.jpg" alt="" />
                            <h3 className="mt-4 font-semibold text-lg">Hr Irfan</h3>
                            <p className="text-sm text-gray-500">Frontend Developer & System Analyst</p>
                        </div>
                        
                        <div>
                            <img className="w-28 h-28 mx-auto rounded-full shadow" src="https://randomuser.me/api/portraits/women/44.jpg " 
                             
                            alt="" />
                            <h3 className="mt-4 font-semibold text-lg">Laura</h3>
                            <p className="text-sm text-gray-500">?????</p>
                        </div>
                        <div>
                            <img className="w-28 h-28 mx-auto rounded-full shadow" src="https://randomuser.me/api/portraits/women/44.jpg " 
                             
                            alt="" />
                            <h3 className="mt-4 font-semibold text-lg">Abyaz Ahmed</h3>
                            <p className="text-sm text-gray-500">?????</p>
                        </div>
                    </div>
                </div>
            </section>

           
            <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center px-6">
                <h2 className="text-3xl font-bold mb-4">Join Us On Our Journey</h2>
                <p className="mb-6 text-lg max-w-xl mx-auto">Be a part of Chronoxio's mission to revolutionize productivity and time management.</p>
                <button className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-full shadow hover:shadow-lg transition">
                    Get Started
                </button>
            </section>
        </div>
    );
};

export default AboutUs;