
import { FcComboChart } from "react-icons/fc";
import { useOutletContext } from 'react-router';
import { BarChart, Bar, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area } from 'recharts';

const Reports = () => {
  const { reportData } = useOutletContext();
  const safeReportData = Array.isArray(reportData) ? reportData : [];



  const processChartData = (data) => {
    if (!Array.isArray(data)) return [];
    const dailyData = {};
    data.forEach(task => {
      const date = new Date(task.startTime).toLocaleDateString();
      if (!dailyData[date]) {
        dailyData[date] = { date, completed: 0, pending: 0, expired: 0, total: 0 };
      }
      dailyData[date].total++;
      if (task.status === 'Completed') dailyData[date].completed++;
      else if (task.status === 'Pending') dailyData[date].pending++;
      else dailyData[date].expired++;
    });
    return Object.values(dailyData).sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  const processPriorityData = (data) => {
    if (!Array.isArray(data)) return [];
    const priorityCount = { High: 0, Medium: 0, Low: 0 };
    data.forEach(task => {
      priorityCount[task.priority]++;
    });
    return Object.entries(priorityCount).map(([name, value]) => ({ name, value }));
  };

  const totalTasks = safeReportData.length;
  const completedTasks = safeReportData.filter(t => t.status === 'Completed').length;
  const overdueTasks = safeReportData.filter(t => t.status === 'Expired').length;

  const chartData = processChartData(safeReportData);
  const priorityData = processPriorityData(safeReportData);



  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen p-8">
      {/* Header */}
      <div className="flex items-center mb-10">
        <FcComboChart className="text-4xl mr-3" />
        <h1 className="text-3xl font-bold text-gray-800">Reports Dashboard</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <h3 className="text-md font-medium text-gray-600 mb-1">Total Tasks</h3>
          <p className="text-4xl font-bold text-indigo-600">{totalTasks}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <h3 className="text-md font-medium text-gray-600 mb-1">Completed Tasks</h3>
          <p className="text-4xl font-bold text-green-600">{completedTasks}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <h3 className="text-md font-medium text-gray-600 mb-1">Overdue Tasks</h3>
          <p className="text-4xl font-bold text-red-500">{overdueTasks}</p>
        </div>
      </div>

      {/* Task Completion Trend Chart */}
      <div className="bg-white p-6 rounded-2xl shadow mb-10">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Task Completion Trend</h2>
        <div className="overflow-x-auto">
          <AreaChart width={900} height={300} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="completed" name="Completed" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
            <Area type="monotone" dataKey="pending" name="Pending" stackId="1" stroke="#ffc658" fill="#ffc658" />
            <Area type="monotone" dataKey="expired" name="Expired" stackId="1" stroke="#ff6b6b" fill="#ff6b6b" />
          </AreaChart>
        </div>
      </div>

      {/* Task Priority Chart */}
      <div className="bg-white p-6 rounded-2xl shadow mb-10">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Task Priority Distribution</h2>
        <BarChart width={500} height={300} data={priorityData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" name="Tasks" fill="#8884d8" />
        </BarChart>
      </div>

      {/* Recent Tasks Table */}
      <div className="bg-white p-6 rounded-2xl shadow overflow-x-auto">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Tasks</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100 text-sm text-gray-600">
            <tr>
              <th className="px-4 py-2 text-left">Task</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Priority</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Duration</th>
            </tr>
          </thead>
          <tbody className="bg-white text-sm text-gray-700">
            {safeReportData.slice(0, 5).map(task => (
              <tr key={task.id} className="border-t hover:bg-gray-50 transition">
                <td className="px-4 py-2">{task.name}</td>
                <td className="px-4 py-2">{task.category}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded-full text-white text-xs ${task.priority === 'High' ? 'bg-red-500' :
                      task.priority === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                    }`}>
                    {task.priority}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded-full text-white text-xs ${task.status === 'Completed' ? 'bg-green-600' :
                      task.status === 'Expired' ? 'bg-red-600' : 'bg-yellow-600'
                    }`}>
                    {task.status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  {task.duration ? `${Math.round(task.duration / (1000 * 60 * 60))}h` : 'N/A'}
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