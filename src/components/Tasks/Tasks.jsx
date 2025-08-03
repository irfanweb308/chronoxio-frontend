import React, { useState } from 'react';

const Tasks = () => {
    const [showModal, setShowModal] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [activeTimers, setActiveTimers] = useState({});

    const convertToSeconds = (value, type) => {
        const timeMap = {
            minute: 60,
            hour: 3600,
            day: 86400,
            week: 604800,
            month: 2592000,
            year: 31536000
        };
        return value * (timeMap[type] || 60);
    };

    const formatTime = (seconds, dueType) => {
        const units = [
            { label: 'y', seconds: 31536000 },
            { label: 'm', seconds: 2592000 },
            { label: 'w', seconds: 604800 },
            { label: 'd', seconds: 86400 },
            { label: 'h', seconds: 3600 },
            { label: 'm', seconds: 60 },
            { label: 's', seconds: 1 },
        ];

        const startIndex = {
            year: 0,
            month: 1,
            week: 2,
            day: 3,
            hour: 4,
            minute: 5,
        }[dueType];

        const parts = [];

        for (let i = startIndex; i < units.length; i++) {
            const value = Math.floor(seconds / units[i].seconds);
            seconds %= units[i].seconds;
            parts.push(`${value}${units[i].label}`);
        }

        return parts.join(' ');
    };

    const handleStartCountdown = (taskId, dueValue, dueType) => {
        if (activeTimers[taskId]) return; // already started

        const totalSeconds = convertToSeconds(dueValue, dueType);
        let remaining = totalSeconds;

        setActiveTimers(prev => ({ ...prev, [taskId]: remaining }));

        const intervalId = setInterval(() => {
            setActiveTimers(prev => {
                if (prev[taskId] <= 1) {
                    clearInterval(intervalId);
                    const updated = { ...prev };
                    delete updated[taskId];
                    return updated;
                }
                return { ...prev, [taskId]: prev[taskId] - 1 };
            });
        }, 1000);
    };

    const [formData, setFormData] = useState({
        taskName: '',
        category: '',
        dueValue: '',
        dueType: 'minute',
        priority: '',
    });

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleCreateTask = () => {
        setShowModal(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTask = {
            id: Date.now(),
            ...formData
        };

        setTasks(prev => [...prev, newTask]);
        setFormData({ taskName: '', category: '', dueValue: '', dueType: 'minute', priority: '' });
        setShowModal(false);
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Tasks</h2>

            <button
                onClick={handleCreateTask}
                className="btn btn-outline btn-accent text-2xl hover:text-black"
            >
                + New Task
            </button>

            {showModal && (
                <div className="fixed inset-0 bg-opacity-70 backdrop-blur-md flex items-center justify-center z-50">
                    <div className="border border-blue-200 bg-gradient-to-r from-purple-50 to-purple-100 bg-opacity-80 backdrop-blur-md p-8 rounded-2xl w-full max-w-xl shadow-lg animate-fadeInScale">
                        <h3 className="text-xl font-bold mb-4">New Task</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                name="taskName"
                                placeholder="Task Name"
                                value={formData.taskName}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                                required
                            />

                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="select select-bordered w-full"
                                required
                            >
                                <option value="">Select category</option>
                                <option>Self Improvement</option>
                                <option>Workout</option>
                                <option>Extra Curricular</option>
                                <option>Others</option>
                            </select>

                            <div className="flex gap-4">
                                <input
                                    type="number"
                                    name="dueValue"
                                    placeholder="Due"
                                    value={formData.dueValue}
                                    onChange={handleChange}
                                    className="input input-bordered w-1/2"
                                    required
                                />
                                <select
                                    name="dueType"
                                    value={formData.dueType}
                                    onChange={handleChange}
                                    className="select select-bordered w-1/2"
                                >
                                    <option>minute</option>
                                    <option>hour</option>
                                    <option>day</option>
                                    <option>week</option>
                                    <option>month</option>
                                    <option>year</option>
                                </select>
                            </div>

                            <select
                                name="priority"
                                value={formData.priority}
                                onChange={handleChange}
                                className="select select-bordered w-full"
                                required
                            >
                                <option value="">Select priority</option>
                                <option>High</option>
                                <option>Medium</option>
                                <option>Low</option>
                            </select>

                            <div className="flex justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="btn btn-ghost"
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    Add Task
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...tasks].sort((a, b) => {
                    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
                    return priorityOrder[a.priority] - priorityOrder[b.priority];
                }).map((task) => (
                    <div
                        key={task.id}
                        className={`p-4 rounded-lg shadow-lg transition ${task.priority === 'High'
                                ? 'shadow-red-400'
                                : task.priority === 'Medium'
                                    ? 'shadow-yellow-400'
                                    : 'shadow-green-400'
                            }`}
                    >
                        <h3 className="text-2xl font-bold mb-3 text-blue-700">{task.taskName}</h3>
                        <p className="font-bold text-gray-600">Category: {task.category}</p>
                        <p className="font-bold text-gray-600">Due in: {task.dueValue} {task.dueType}</p>
                        <p className="font-bold text-gray-600">Priority: {task.priority}</p>

                        {activeTimers[task.id] !== undefined ? (
                            <p className="mt-2 text-lg font-bold text-purple-700">
                                ⏳ Remaining: {formatTime(activeTimers[task.id], task.dueType)}
                            </p>
                        ) : (
                            <button
                                className="mt-4 btn btn-sm btn-accent"
                                onClick={() => handleStartCountdown(task.id, task.dueValue, task.dueType)}
                            >
                                ▶️ Start
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Tasks;
