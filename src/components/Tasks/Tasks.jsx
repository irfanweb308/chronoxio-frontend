import React, { useState, useRef, useEffect } from 'react';
import { MdDeleteForever } from "react-icons/md";
import { useOutletContext } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Tasks = () => {

    const { setReportData, showTaskModal, setShowTaskModal } = useOutletContext()


    const [tasks, setTasks] = useState([]);
    const [activeTimers, setActiveTimers] = useState({});
    const [pausedTimers, setPausedTimers] = useState({});
    const [remainingTimes, setRemainingTimes] = useState({});
    const [completedTasks, setCompletedTasks] = useState({});
    const [expiredTasks, setExpiredTasks] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [completedCount, setCompletedCount] = useState(0);
    const [taskStartTimes, setTaskStartTimes] = useState({});
    const [activities, setActivities] = useState([]);

    const notificationRef = useRef({});
    const longTaskTimers = useRef({});

    const generateReportData = () => {
        return {
            tasks: tasks.map(task => ({
                id: task.id,
                name: task.taskName,
                category: task.category,
                priority: task.priority,
                startTime: task.startTime,
                endTime: task.endTime,
                status: completedTasks[task.id]
                    ? 'Completed'
                    : expiredTasks[task.id]
                        ? 'Expired'
                        : 'Pending',
                duration: completedTasks[task.id]
                    ? new Date(task.endTime) - new Date(task.startTime)
                    : null,
                completionTime: task.completionTime || null,
                completedOn: completedTasks[task.id] ? new Date().toISOString() : null
            })),
            activities: activities
        };
    };

    useEffect(() => {
        if (setReportData) {
            setReportData(generateReportData());
        }
    }, [tasks, completedTasks, expiredTasks]);

    useEffect(() => {

        return () => {
            Object.values(intervalsRef.current).forEach(clearInterval);
            Object.values(notificationRef.current).forEach(clearTimeout);
            Object.values(longTaskTimers.current).forEach(clearTimeout);
        };
    }, []);


    useEffect(() => {
        const checkForUpcomingTasks = () => {
            tasks.forEach(task => {
                const taskId = task.id;
                const now = new Date();
                const startTime = new Date(task.startTime);
                const timeUntilStart = startTime - now;


                if (notificationRef.current[taskId]) {
                    clearTimeout(notificationRef.current[taskId]);
                    delete notificationRef.current[taskId];
                }


                if (timeUntilStart > 0 && timeUntilStart <= 5 * 60 * 1000) {
                    notificationRef.current[taskId] = setTimeout(() => {
                        toast.info(`"${task.taskName}" will start in 5 minutes. Get ready!`, {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                        });
                    }, timeUntilStart - (5 * 60 * 1000));
                }
            });
        };


        checkForUpcomingTasks();
        const interval = setInterval(checkForUpcomingTasks, 60 * 1000);

        return () => clearInterval(interval);
    }, [tasks]);

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
        clearInterval(intervalsRef.current[taskId]);


        if (longTaskTimers.current[taskId]) {
            clearTimeout(longTaskTimers.current[taskId]);
            delete longTaskTimers.current[taskId];
        }

        const initialRemaining = remainingSecondsOverride !== null
            ? remainingSecondsOverride
            : Math.floor((new Date(endTime).getTime() - Date.now()) / 1000);

        setActiveTimers(prev => ({ ...prev, [taskId]: initialRemaining }));
        setTaskStartTimes(prev => ({ ...prev, [taskId]: Date.now() }));


        longTaskTimers.current[taskId] = setTimeout(() => {
            const task = tasks.find(t => t.id === taskId);
            if (task && !pausedTimers[taskId] && !completedTasks[taskId]) {
                toast.warning(`You've been working on "${task.taskName}" for 3 hours. Consider taking a short break!`, {
                    position: "top-center",
                    autoClose: 10000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
        }, 3 * 60 * 60 * 1000);

        intervalsRef.current[taskId] = setInterval(() => {
            setActiveTimers(prev => {
                const newRemaining = (prev[taskId] || 0) - 1;
                if (newRemaining <= 0) {
                    clearInterval(intervalsRef.current[taskId]);
                    const { [taskId]: _, ...rest } = prev;
                    setExpiredTasks(e => ({ ...e, [taskId]: true }));
                    return rest;
                }
                return { ...prev, [taskId]: newRemaining };
            });
        }, 1000);
    };

    const handleTogglePause = (taskId) => {
        const isNowPaused = !pausedTimers[taskId];
        setPausedTimers(prev => ({ ...prev, [taskId]: isNowPaused }));

        if (isNowPaused) {
            clearInterval(intervalsRef.current[taskId]);

            if (longTaskTimers.current[taskId]) {
                clearTimeout(longTaskTimers.current[taskId]);
                delete longTaskTimers.current[taskId];
            }
            setRemainingTimes(prev => ({
                ...prev,
                [taskId]: activeTimers[taskId]
            }));
        } else {
            const remaining = remainingTimes[taskId];
            if (remaining > 0) {
                handleStartCountdown(taskId, null, remaining);
            }
        }
    };

    const handleCompleteTask = (taskId) => {
        clearInterval(intervalsRef.current[taskId]);
        const completionTimeInSeconds = Math.floor((Date.now() - (taskStartTimes[taskId] || new Date(tasks.find(t => t.id === taskId).startTime).getTime())) / 1000);


        setTasks(prev => prev.map(task =>
            task.id === taskId
                ? { ...task, completionTime: completionTimeInSeconds }
                : task
        ));






        setCompletedTasks(prev => ({ ...prev, [taskId]: true }));
        setCompletedCount(prev => prev + 1);
        setActiveTimers(prev => {
            const { [taskId]: _, ...rest } = prev;
            return rest;
        });

        const completedActivity = {
            id: taskId,
            taskName: tasks.find(t => t.id === taskId).taskName,
            priority: tasks.find(t => t.id === taskId).priority,
            action: 'Completed',
            timestamp: Date.now()
        };
        setActivities(prev => [completedActivity, ...prev].slice(0, 5));
    };

    const handleDeleteTask = (taskId) => {
        clearInterval(intervalsRef.current[taskId]);
        setTasks(prev => prev.filter(task => task.id !== taskId));
        setActiveTimers(prev => {
            const updated = { ...prev };
            delete updated[taskId];
            return updated;
        });
        setPausedTimers(prev => {
            const updated = { ...prev };
            delete updated[taskId];
            return updated;
        });
        setCompletedTasks(prev => {
            const updated = { ...prev };
            delete updated[taskId];
            return updated;
        });
        setExpiredTasks(prev => {
            const updated = { ...prev };
            delete updated[taskId];
            return updated;
        });
    };

    useEffect(() => {
        return () => {
            Object.values(intervalsRef.current).forEach(clearInterval);
        };
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            tasks.forEach(task => {
                const now = Date.now();
                const taskId = task.id;
                const start = new Date(task.startTime).getTime();
                const end = new Date(task.endTime).getTime();

                if (
                    now >= start &&
                    now < end &&
                    activeTimers[taskId] === undefined &&
                    !pausedTimers[taskId] &&
                    !completedTasks[taskId] &&
                    !expiredTasks[taskId]
                ) {
                    const remaining = Math.floor((end - now) / 1000);
                    handleStartCountdown(taskId, null, remaining);
                }
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [tasks, activeTimers, pausedTimers, completedTasks, expiredTasks]);

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


            const newActivity = {
                id: newTask.id,
                taskName: newTask.taskName,
                priority: newTask.priority,
                action: 'Created',
                timestamp: Date.now()
            };


            setActivities(prev => [newActivity, ...prev].slice(0, 5));

            setIsSubmitting(false);
            setSubmitSuccess(true);

            setTimeout(() => {
                setShowTaskModal(false);
                setSubmitSuccess(false);
            }, 1000);
        }, 1000);
    };
    console.log(tasks);



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



    const pendingCount = tasks.filter(
        task => !completedTasks[task.id] && !expiredTasks[task.id]
    ).length;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
            <ToastContainer
                position="top-center"

                autoClose={7000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className="max-w-6xl mx-auto">

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                    <div>
                        <h2 className="text-4xl font-bold text-gray-800 mb-2">📋 My Tasks</h2>
                        <p className="text-gray-600">Manage your daily tasks and boost productivity</p>
                    </div>
                    <button
                        onClick={() => setShowTaskModal(true)}
                        className="btn btn-primary text-lg mt-4 md:mt-0 bg-gradient-to-r from-purple-500 to-blue-500 border-none text-white hover:from-purple-600 hover:to-blue-600 shadow-lg hover:shadow-xl transition-all"
                    >
                        + New Task
                    </button>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-green-500 transform hover:scale-[1.02] transition-transform">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-green-100 mr-4">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-800">{completedCount}</h3>
                                <p className="text-gray-600">Completed Tasks</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-yellow-500 transform hover:scale-[1.02] transition-transform">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-yellow-100 mr-4">
                                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-800">{pendingCount}</h3>
                                <p className="text-gray-600">Pending Tasks</p>
                            </div>
                        </div>
                    </div>


                </div>


                <div className="space-y-6">
                    {[...tasks].sort((a, b) => {
                        const priorityOrder = { High: 1, Medium: 2, Low: 3 };
                        return priorityOrder[a.priority] - priorityOrder[b.priority];
                    }).map((task) => (
                        <div key={task.id} className={`relative w-full rounded-2xl p-6 shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center transition-all duration-300 hover:shadow-xl ${bgColor(task.priority)}`}>
                            <div className="flex flex-col gap-2 w-full md:max-w-[70%]">
                                <div className="flex items-center gap-3">
                                    <h3 className="text-xl font-bold text-gray-800">{task.taskName}</h3>
                                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${badgeColor(task.priority)}`}>
                                        {task.priority}
                                    </span>
                                </div>
                                <p className="text-sm uppercase tracking-wide text-gray-600">{task.category}</p>
                                <div className="flex flex-col sm:flex-row gap-4 text-sm mt-2">
                                    <div className="flex items-center gap-2">
                                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                        <span className="font-medium">Start: {new Date(task.startTime).toLocaleString()}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                        <span className="font-medium">End: {new Date(task.endTime).toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col items-end gap-3 mt-4 md:mt-0 w-full md:w-auto">
                                {completedTasks[task.id] ? (
                                    <>
                                        <div className="flex items-center gap-2 text-green-700 font-semibold">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            Task Completed
                                        </div>
                                        <button
                                            className="btn btn-ghost hover:bg-red-100 text-red-500 rounded-full p-2 transition-colors"
                                            onClick={() => handleDeleteTask(task.id)}
                                        >
                                            <MdDeleteForever className="text-xl" />
                                        </button>
                                    </>
                                ) : expiredTasks[task.id] ? (
                                    <>
                                        <div className="flex items-center gap-2 text-red-700 font-semibold">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                            </svg>
                                            Task Expired
                                        </div>
                                        <button
                                            className="btn btn-ghost hover:bg-red-100 text-red-500 rounded-full p-2 transition-colors"
                                            onClick={() => handleDeleteTask(task.id)}
                                        >
                                            <MdDeleteForever className="text-xl" />
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <div className={`text-xl font-semibold px-5 py-2.5 rounded-full whitespace-nowrap shadow-md ${badgeColor(task.priority)}`}>
                                            {activeTimers[task.id] !== undefined ? formatTime(activeTimers[task.id]) : "⏱ Ready"}
                                        </div>

                                        {activeTimers[task.id] !== undefined && (
                                            <div className="flex gap-3">
                                                <button
                                                    onClick={() => handleTogglePause(task.id)}
                                                    className="btn btn-outline btn-sm border-blue-500 text-blue-500 hover:bg-blue-50 flex items-center gap-1"
                                                >
                                                    {pausedTimers[task.id] ? (
                                                        <>
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                            </svg>
                                                            Resume
                                                        </>
                                                    ) : (
                                                        <>
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                            </svg>
                                                            Pause
                                                        </>
                                                    )}
                                                </button>
                                                <button
                                                    onClick={() => handleCompleteTask(task.id)}
                                                    className="btn btn-outline btn-sm border-green-500 text-green-500 hover:bg-green-50 flex items-center gap-1"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                                    </svg>
                                                    Complete
                                                </button>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>


            {showTaskModal && (
                <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white p-8 rounded-2xl w-full max-w-xl shadow-2xl border border-gray-100">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-bold text-gray-800">Create New Task</h3>
                            <button
                                onClick={() => setShowTaskModal(false)}
                                className="btn btn-ghost btn-circle"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                        {isSubmitting || submitSuccess ? (
                            <div className="flex flex-col items-center justify-center p-8">
                                {submitSuccess ? (
                                    <div className="mb-4 p-4 rounded-full bg-green-100">
                                        <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                    </div>
                                ) : (
                                    <div className="mb-4 p-4 rounded-full bg-blue-100">
                                        <span className="loading loading-spinner loading-lg text-blue-600"></span>
                                    </div>
                                )}
                                <p className="mt-4 text-lg font-medium text-gray-700">
                                    {submitSuccess ? "Task Added Successfully!" : "Adding task..."}
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-medium">Task Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="taskName"
                                        placeholder="Enter task name"
                                        value={formData.taskName}
                                        onChange={handleChange}
                                        className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-medium">Category</span>
                                    </label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className="select select-bordered w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    >
                                        <option value="">Select category</option>
                                        <option>Self Improvement</option>
                                        <option>Workout</option>
                                        <option>Extra Curricular</option>
                                        <option>Others</option>
                                    </select>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-medium">Start Time</span>
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="datetime-local"
                                                name="startTime"
                                                value={formData.startTime}
                                                onChange={handleChange}
                                                className="input input-bordered w-full pl-10 pr-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                required
                                            />
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-medium">End Time</span>
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="datetime-local"
                                                name="endTime"
                                                value={formData.endTime}
                                                onChange={handleChange}
                                                className="input input-bordered w-full pl-10 pr-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                required
                                            />
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-medium">Priority</span>
                                    </label>
                                    <div className="grid grid-cols-3 gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setFormData(prev => ({ ...prev, priority: 'High' }))}
                                            className={`btn ${formData.priority === 'High' ? 'bg-red-100 text-red-800 border-red-300' : 'btn-ghost'}`}
                                        >
                                            High
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setFormData(prev => ({ ...prev, priority: 'Medium' }))}
                                            className={`btn ${formData.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800 border-yellow-300' : 'btn-ghost'}`}
                                        >
                                            Medium
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setFormData(prev => ({ ...prev, priority: 'Low' }))}
                                            className={`btn ${formData.priority === 'Low' ? 'bg-green-100 text-green-800 border-green-300' : 'btn-ghost'}`}
                                        >
                                            Low
                                        </button>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowTaskModal(false)}
                                        className="btn btn-ghost hover:bg-gray-100"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-primary bg-gradient-to-r from-purple-500 to-blue-500 border-none text-white hover:from-purple-600 hover:to-blue-600"
                                    >
                                        Add Task
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Tasks;