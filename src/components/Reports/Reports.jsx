import React from 'react';
import { LineChart, Line, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area } from 'recharts';


const Reports = () => {
    const data = [
        {
            "name": "Page A",
            "uv": 4000,
            "pv": 2400,
            "amt": 2400
        },
        {
            "name": "Page B",
            "uv": 3000,
            "pv": 1398,
            "amt": 2210
        },
        {
            "name": "Page C",
            "uv": 2000,
            "pv": 9800,
            "amt": 2290
        },
        {
            "name": "Page D",
            "uv": 2780,
            "pv": 3908,
            "amt": 2000
        },
        {
            "name": "Page E",
            "uv": 1890,
            "pv": 4800,
            "amt": 2181
        },
        {
            "name": "Page F",
            "uv": 2390,
            "pv": 3800,
            "amt": 2500
        },
        {
            "name": "Page G",
            "uv": 3490,
            "pv": 4300,
            "amt": 2100
        }
    ]



    return (
        <div>
            <div className="p-8 bg-gray-50 min-h-screen">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">📊 Reports</h1>
                    <p className="text-gray-500 mt-1">View and analyze your task and activity summaries.</p>
                </div>

                {/* Filters */}
                <div className="bg-white p-6 rounded-xl shadow mb-8 flex flex-col md:flex-row gap-4 md:items-center justify-between">
                    <div className="flex gap-4 flex-wrap">
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Start Date</label>
                            <input type="date" className="input input-bordered w-full" />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">End Date</label>
                            <input type="date" className="input input-bordered w-full" />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Category</label>
                            <select className="select select-bordered w-full">
                                <option>All</option>
                                <option>Self Improvement</option>
                                <option>Workout</option>
                                <option>Extra Curricular</option>
                            </select>
                        </div>
                    </div>
                    <button className="btn btn-primary mt-4 md:mt-0">Generate</button>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Tasks</h3>
                        <p className="text-3xl font-bold text-indigo-600">42</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Completed Tasks</h3>
                        <p className="text-3xl font-bold text-green-600">30</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Overdue Tasks</h3>
                        <p className="text-3xl font-bold text-red-600">12</p>
                    </div>
                </div>

                {/* Report Table */}
                <div className="bg-white p-6 rounded-xl shadow overflow-x-auto">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">Recent Task Report</h2>
                    <table className="table w-full">
                        <thead>
                            <tr className="text-left text-sm text-gray-500 border-b">
                                <th>Task</th>
                                <th>Category</th>
                                <th>Priority</th>
                                <th>Status</th>
                                <th>Completed On</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="hover">
                                <td>Read a Book</td>
                                <td>Self Improvement</td>
                                <td><span className="badge badge-warning">Medium</span></td>
                                <td><span className="badge badge-success">Completed</span></td>
                                <td>2025-08-01</td>
                            </tr>
                            <tr className="hover">
                                <td>Morning Run</td>
                                <td>Workout</td>
                                <td><span className="badge badge-error">High</span></td>
                                <td><span className="badge badge-error">Overdue</span></td>
                                <td>—</td>
                            </tr>
                            <tr className="hover">
                                <td>Guitar Practice</td>
                                <td>Extra Curricular</td>
                                <td><span className="badge badge-success">Low</span></td>
                                <td><span className="badge badge-success">Completed</span></td>
                                <td>2025-08-03</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className='grid grid-cols-2 gap-7 items-center justify-center p-4'>
                <AreaChart width={730} height={250} data={data}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                    <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                </AreaChart>
                <AreaChart width={730} height={250} data={data}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                    <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                </AreaChart>
                <AreaChart width={730} height={250} data={data}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                    <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                </AreaChart>
                <AreaChart width={730} height={250} data={data}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                    <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                </AreaChart>
            </div>
        </div>
    );
};

export default Reports;