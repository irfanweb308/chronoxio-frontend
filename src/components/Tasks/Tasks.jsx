import React from 'react';
import { useNavigate } from 'react-router';
 

const Tasks = () => {
    const navigate = useNavigate()

    const handleCreateTask = () => {
         
        navigate('/tasks/create');
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Tasks</h2>

            <button
                onClick={handleCreateTask}
                className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 text-lg"
            >
                + Create a Task
            </button>
        </div>
    );
};

export default Tasks;