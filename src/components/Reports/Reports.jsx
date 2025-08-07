import React from 'react';
import { FcComboChart } from "react-icons/fc";
import { useOutletContext } from 'react-router';
import { BarChart, Bar,   AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area } from 'recharts';


const Reports = () => {
    const { reportData }=useOutletContext()
     const processChartData = () => {
    const dailyData = {};
    
    reportData.forEach(task => {
      const date = new Date(task.startTime).toLocaleDateString();
      if (!dailyData[date]) {
        dailyData[date] = {
          date,
          completed: 0,
          pending: 0,
          expired: 0,
          total: 0
        };
      }
      
      dailyData[date].total++;
      if (task.status === 'Completed') dailyData[date].completed++;
      else if (task.status === 'Pending') dailyData[date].pending++;
      else dailyData[date].expired++;
    });

    return Object.values(dailyData).sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  const processPriorityData = () => {
    const priorityCount = {
      High: 0,
      Medium: 0,
      Low: 0
    };

    reportData.forEach(task => {
      priorityCount[task.priority]++;
    });

    return Object.entries(priorityCount).map(([name, value]) => ({
      name,
      value
    }));
  };

  const chartData = processChartData();
  const priorityData = processPriorityData();

  // Calculate summary stats
  const totalTasks = reportData.length;
  const completedTasks = reportData.filter(t => t.status === 'Completed').length;
  const overdueTasks = reportData.filter(t => t.status === 'Expired').length;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
       
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Tasks</h3>
          <p className="text-3xl font-bold text-indigo-600">{totalTasks}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Completed Tasks</h3>
          <p className="text-3xl font-bold text-green-600">{completedTasks}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Overdue Tasks</h3>
          <p className="text-3xl font-bold text-red-600">{overdueTasks}</p>
        </div>
      </div>

      {/* Task Trend Chart */}
      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Task Completion Trend</h2>
        <AreaChart width={900} height={300} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Area 
            type="monotone" 
            dataKey="completed" 
            name="Completed" 
            stackId="1" 
            stroke="#82ca9d" 
            fill="#82ca9d" 
          />
          <Area 
            type="monotone" 
            dataKey="pending" 
            name="Pending" 
            stackId="1" 
            stroke="#ffc658" 
            fill="#ffc658" 
          />
          <Area 
            type="monotone" 
            dataKey="expired" 
            name="Expired" 
            stackId="1" 
            stroke="#ff6b6b" 
            fill="#ff6b6b" 
          />
        </AreaChart>
      </div>

       
      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Task Priority Distribution</h2>
        <BarChart width={500} height={300} data={priorityData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" name="Tasks" fill="#8884d8" />
        </BarChart>
      </div>

      {/* Recent Tasks Table */}
      <div className="bg-white p-6 rounded-xl shadow overflow-x-auto">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Recent Tasks</h2>
        <table className="table w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500 border-b">
              <th>Task</th>
              <th>Category</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {reportData.slice(0, 5).map(task => (
              <tr key={task.id} className="hover">
                <td>{task.name}</td>
                <td>{task.category}</td>
                <td>
                  <span className={`badge ${
                    task.priority === 'High' ? 'badge-error' :
                    task.priority === 'Medium' ? 'badge-warning' : 'badge-success'
                  }`}>
                    {task.priority}
                  </span>
                </td>
                <td>
                  <span className={`badge ${
                    task.status === 'Completed' ? 'badge-success' :
                    task.status === 'Expired' ? 'badge-error' : 'badge-warning'
                  }`}>
                    {task.status}
                  </span>
                </td>
                <td>
                  {task.duration ? 
                    `${Math.round(task.duration / (1000 * 60 * 60))}h` : 
                    'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;