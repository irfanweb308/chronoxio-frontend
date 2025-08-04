import React, { useState, useRef, useEffect } from 'react';

const Tasks = () => {
    const [showModal, setShowModal] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [activeTimers, setActiveTimers] = useState({});
    const [pausedTimers, setPausedTimers] = useState({});
    const [remainingTimes, setRemainingTimes] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const intervalsRef = useRef({});

    const formatTime = (seconds) => {
        const units = [
            { label: 'y', seconds: 31536000 },
            { label: 'mo', seconds: 2592000 },
            { label: 'w', seconds: 604800 },
            { label: 'd', seconds: 86400 },
            { label: 'h', seconds: 3600 },
            { label: 'm', seconds: 60 },
            { label: 's', seconds: 1 },
        ];

        const parts = [];

        for (let unit of units) {
            const value = Math.floor(seconds / unit.seconds);
            if (value > 0 || parts.length > 0 || unit.label === 's') {
                parts.push(`${value}${unit.label}`);
                seconds %= unit.seconds;
            }
        }

        return parts.join(' ');
    };

    const handleStartCountdown = (taskId, endTime, remainingSecondsOverride = null) => {
        if (activeTimers[taskId] !== undefined) return;

        const due = remainingSecondsOverride !== null
            ? Date.now() + remainingSecondsOverride * 1000
            : new Date(endTime).getTime();

        const updateTime = () => {
            const now = Date.now();
            const remaining = Math.max(0, Math.floor((due - now) / 1000));

            setActiveTimers(prev => {
                if (remaining <= 0) {
                    clearInterval(intervalsRef.current[taskId]);
                    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
                    const updated = { ...prev };
                    delete updated[taskId];
                    return updated;
                }
                return { ...prev, [taskId]: remaining };
            });
        };

        updateTime();
        intervalsRef.current[taskId] = setInterval(updateTime, 1000);
    };

    const handleTogglePause = (taskId) => {
        const isNowPaused = !pausedTimers[taskId];
        setPausedTimers(prev => ({ ...prev, [taskId]: isNowPaused }));

        if (isNowPaused) {
            clearInterval(intervalsRef.current[taskId]);
            setRemainingTimes(prev => ({ ...prev, [taskId]: activeTimers[taskId] }));
        } else {
            const remaining = remainingTimes[taskId];
            handleStartCountdown(taskId, null, remaining);
        }
    };

    useEffect(() => {
        return () => {
            Object.values(intervalsRef.current).forEach(clearInterval);
        };
    }, []);

    const [formData, setFormData] = useState({
        taskName: '',
        category: '',
        startTime: '',
        endTime: '',
        priority: '',
    });

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitSuccess(false);

        setTimeout(() => {
            const newTask = {
                id: Date.now(),
                ...formData,
            };
            setTasks(prev => [...prev, newTask]);
            setFormData({ taskName: '', category: '', startTime: '', endTime: '', priority: '' });
            setIsSubmitting(false);
            setSubmitSuccess(true);

            setTimeout(() => {
                setShowModal(false);
                setSubmitSuccess(false);
            }, 1000);
        }, 2000);
    };

    const bgColor = (priority) => {
        switch (priority) {
            case 'High': return 'bg-red-100 text-red-900';
            case 'Medium': return 'bg-yellow-100 text-yellow-900';
            case 'Low': return 'bg-green-100 text-green-900';
            default: return 'bg-gray-100 text-gray-900';
        }
    };

    const badgeColor = (priority) => {
        return priority === 'High'
            ? 'bg-red-100 text-red-800'
            : priority === 'Medium'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-green-100 text-green-800';
    };

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6">📋 My Tasks</h2>

            <button
                onClick={() => setShowModal(true)}
                className="btn btn-outline btn-accent text-lg mb-8"
            >
                + New Task
            </button>

            {showModal && (
                <div className="fixed inset-0 bg-opacity-70 backdrop-blur-md flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-xl w-full max-w-xl shadow-2xl">
                        <h3 className="text-xl font-bold mb-4">Create New Task</h3>
                        {isSubmitting || submitSuccess ? (
                            <div className="flex flex-col items-center justify-center p-8">
                                {submitSuccess ? (
                                    <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                ) : (
                                    <span className="loading loading-spinner loading-lg text-blue-600"></span>
                                )}
                                <p className="mt-4 text-lg">{submitSuccess ? "Task Added!" : "Adding task..."}</p>
                            </div>
                        ) : (
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
                                        type="datetime-local"
                                        name="startTime"
                                        value={formData.startTime}
                                        onChange={handleChange}
                                        className="input input-bordered w-1/2"
                                        required
                                    />
                                    <input
                                        type="datetime-local"
                                        name="endTime"
                                        value={formData.endTime}
                                        onChange={handleChange}
                                        className="input input-bordered w-1/2"
                                        required
                                    />
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
                        )}
                    </div>
                </div>
            )}

            <div className="w-full px-4">
                {[...tasks]
                    .sort((a, b) => {
                        const priorityOrder = { High: 1, Medium: 2, Low: 3 };
                        return priorityOrder[a.priority] - priorityOrder[b.priority];
                    })
                    .map((task) => (
                        <div
                            key={task.id}
                            className={`relative w-full rounded-3xl p-6 mb-7 shadow-lg flex justify-between items-center transition-transform duration-200 hover:-translate-y-1 ${bgColor(task.priority)}`}
                        >
                            <div className="flex flex-col gap-2 w-full max-w-[70%]">
                                <h3 className="text-xl font-bold">{task.taskName}</h3>
                                <p className="text-sm uppercase tracking-wide opacity-70">{task.category}</p>
                                <div className="flex gap-6 text-sm mt-2 flex-wrap">
                                    <div className="flex items-center gap-1">
                                        🕒 <span className="font-medium">Start: {new Date(task.startTime).toLocaleString()}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        ⌛ <span className="font-medium">End: {new Date(task.endTime).toLocaleString()}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        🔥 <span className="capitalize">Priority: {task.priority}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col items-end gap-2">
                                <div
                                    className={`text-xl font-semibold px-5 py-2.5 rounded-full whitespace-nowrap cursor-pointer shadow-lg ring-1 ring-inset ring-white/10 ${badgeColor(task.priority)}`}
                                    onClick={() => {
                                        if (activeTimers[task.id] === undefined) {
                                            handleStartCountdown(task.id, task.endTime);
                                        }
                                    }}
                                >
                                    {activeTimers[task.id] !== undefined
                                        ? formatTime(activeTimers[task.id])
                                        : "⏱ Ready"}
                                </div>

                                {activeTimers[task.id] !== undefined && (
                                    <button
                                        onClick={() => handleTogglePause(task.id)}
                                        className="text-xl  text-blue-600 border border-blue-600 px-4 py-2 rounded-full hover:bg-blue-50 transition-colors"
                                    >
                                        {pausedTimers[task.id] ? "▶ Resume" : "⏸ Pause"}
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Tasks;
