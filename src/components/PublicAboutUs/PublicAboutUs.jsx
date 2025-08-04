import React from 'react';
const PublicAboutUs = () => {
    return (
        <div className="bg-white text-gray-800">
            {/* Hero Section */}
            <section className="bg-slate-800 text-white py-24 px-6 text-center">
                <h1 className="text-5xl font-bold mb-4">About Chronoxio</h1>
                <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-90">
                    Helping people manage their time, tasks, and productivity through a smart and intuitive platform.
                </p>
            </section>

            {/* Mission & Vision */}
            <section className="max-w-7xl mx-auto py-20 px-6 grid md:grid-cols-2 gap-12">
                <div>
                    <h2 className="text-3xl font-semibold mb-4 text-indigo-700">Our Mission</h2>
                    <p className="text-lg leading-relaxed text-gray-700">
                        We empower individuals and teams to achieve more through seamless productivity features, thoughtful design, and robust functionality.
                    </p>
                </div>
                <div>
                    <h2 className="text-3xl font-semibold mb-4 text-rose-600">Our Vision</h2>
                    <p className="text-lg leading-relaxed text-gray-700">
                        To become the world’s most trusted platform for redefining how people work, collaborate, and thrive.
                    </p>
                </div>
            </section>

            {/* Core Values */}
            <section className="bg-slate-100 py-20 px-6">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-12 text-slate-900">Core Values</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Transparency",
                                desc: "We build trust by being open and honest with users and team members.",
                                color: "text-indigo-600",
                            },
                            {
                                title: "Innovation",
                                desc: "We continuously explore bold ideas and deliver cutting-edge solutions.",
                                color: "text-rose-600",
                            },
                            {
                                title: "User First",
                                desc: "Every decision is driven by what serves our users best.",
                                color: "text-teal-600",
                            },
                        ].map((item, i) => (
                            <div key={i} className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
                                <h3 className={`text-xl font-semibold mb-2 ${item.color}`}>{item.title}</h3>
                                <p className="text-gray-700">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Meet the Team */}
            <section className="py-20 px-6 bg-white">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-12 text-slate-900">Meet the Team</h2>
                    <div className="grid md:grid-cols-4 gap-10">
                        {[
                            {
                                name: "Abidur Rahman Arko",
                                role: "Chief Technology Officer",
                                img: "/public/images/CTO.jpeg",
                            },
                            {
                                name: "Hr Irfan",
                                role: "Frontend Developer & System Analyst",
                                img: "/public/images/2.jpg",
                            },
                            {
                                name: "Laura",
                                role: "Product Designer",
                                img: "https://randomuser.me/api/portraits/women/44.jpg",
                            },
                            {
                                name: "Abyaz Ahmed",
                                role: "Marketing Strategist",
                                img: "https://randomuser.me/api/portraits/men/45.jpg",
                            },
                        ].map((member, i) => (
                            <div key={i} className="text-center">
                                <img
                                    className="w-24 h-24 mx-auto rounded-full shadow object-cover"
                                    src={member.img}
                                    alt={member.name}
                                />
                                <h3 className="mt-4 font-semibold text-lg">{member.name}</h3>
                                <p className="text-sm text-gray-500">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            
            <section className="bg-slate-100 py-20 px-6">
                <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg text-center px-8 py-14">
                    <div className="mb-6">
                        <svg
                            className="mx-auto h-12 w-12 text-indigo-500"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Join Us on Our Journey</h2>
                    <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                        Be part of Chronoxio’s vision to revolutionize productivity and time management.
                        Whether you're a developer, designer, or dreamer, we want to hear from you.
                    </p>
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-full shadow transition">
                        Get Started
                    </button>
                </div>
            </section>

        </div>
    );
};

export default PublicAboutUs;
