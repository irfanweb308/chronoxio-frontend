 
import { 
  FiActivity, 
  FiCalendar, 
  FiCheckCircle, 
  FiClock, 
  FiPieChart, 
  FiTrendingUp,
  FiPlus
} from 'react-icons/fi';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const Dashboard = () => {
 
  const productivityData = [
    { name: 'Mon', value: 35 },
    { name: 'Tue', value: 45 },
    { name: 'Wed', value: 60 },
    { name: 'Thu', value: 52 },
    { name: 'Fri', value: 70 },
    { name: 'Sat', value: 40 },
    { name: 'Sun', value: 30 }
  ];

  const taskDistributionData = [
    { name: 'Completed', value: 65 },
    { name: 'Pending', value: 25 },
    { name: 'Overdue', value: 10 }
  ];

  const COLORS = ['#00C49F', '#FFBB28', '#FF8042'];

  const recentActivities = [
    { id: 1, action: 'Completed task', task: 'Morning Run', time: '2 hours ago' },
    { id: 2, action: 'Started task', task: 'Read Book', time: '4 hours ago' },
    { id: 3, action: 'Created task', task: 'Guitar Practice', time: '1 day ago' },
    { id: 4, action: 'Completed task', task: 'Meditation', time: '1 day ago' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 p-6">
       
      <div className="backdrop-blur-sm bg-white/80 rounded-3xl shadow-xl overflow-hidden">
         
        <div className="px-8 pt-8 pb-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold">Dashboard Overview</h1>
              <p className="text-blue-100">Your productivity at a glance</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <select className="appearance-none bg-white/20 border border-white/30 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-white text-black">
                  <option>This Week</option>
                  <option>This Month</option>
                  <option>This Year</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>
              <button className="bg-white/20 hover:bg-white/30 text-black px-4 py-2 rounded-lg transition duration-200 border border-white/30">
                Generate Report
              </button>
            </div>
          </div>
        </div>

         
        <div className="p-6">
           
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm p-6 flex items-center border border-white/20">
              <div className="p-3 rounded-full bg-blue-100/80 text-blue-600 mr-4">
                <FiCheckCircle size={24} />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Completed Tasks</p>
                <p className="text-2xl font-bold text-gray-800">42</p>
                <p className="text-green-500 text-sm flex items-center">
                  <FiTrendingUp className="mr-1" /> 12% from last week
                </p>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm p-6 flex items-center border border-white/20">
              <div className="p-3 rounded-full bg-purple-100/80 text-purple-600 mr-4">
                <FiClock size={24} />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Time Spent</p>
                <p className="text-2xl font-bold text-gray-800">18h 45m</p>
                <p className="text-green-500 text-sm flex items-center">
                  <FiTrendingUp className="mr-1" /> 5% from last week
                </p>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm p-6 flex items-center border border-white/20">
              <div className="p-3 rounded-full bg-green-100/80 text-green-600 mr-4">
                <FiActivity size={24} />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Productivity</p>
                <p className="text-2xl font-bold text-gray-800">78%</p>
                <p className="text-red-500 text-sm flex items-center">
                  <FiTrendingUp className="mr-1 transform rotate-180" /> 3% from last week
                </p>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm p-6 flex items-center border border-white/20">
              <div className="p-3 rounded-full bg-yellow-100/80 text-yellow-600 mr-4">
                <FiCalendar size={24} />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Upcoming Tasks</p>
                <p className="text-2xl font-bold text-gray-800">7</p>
                <p className="text-gray-500 text-sm">Next 3 days</p>
              </div>
            </div>
          </div>

           
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm p-6 border border-white/20">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Weekly Productivity</h2>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-lg">Week</button>
                  <button className="px-3 py-1 text-sm text-gray-500 hover:bg-gray-100 rounded-lg">Month</button>
                </div>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={productivityData}>
                    <Bar 
                      dataKey="value" 
                      fill="#3B82F6" 
                      radius={[4, 4, 0, 0]}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#10B981" 
                      strokeWidth={2} 
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm p-6 border border-white/20">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Task Distribution</h2>
              <div className="h-64 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={taskDistributionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      label
                    >
                      {taskDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

           
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
             
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm p-6 lg:col-span-2 border border-white/20">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivities.map(activity => (
                  <div key={activity.id} className="flex items-start pb-4 border-b border-gray-100 last:border-0">
                    <div className="p-2 rounded-full bg-blue-100 text-blue-600 mr-3">
                      <FiActivity size={18} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{activity.action}: <span className="text-blue-600">{activity.task}</span></p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

             
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm p-6 border border-white/20">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-4 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition border border-blue-100">
                  <span>Create New Task</span>
                  <FiPlus size={18} />
                </button>
                <button className="w-full flex items-center justify-between p-4 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition border border-green-100">
                  <span>Generate Report</span>
                  <FiPieChart size={18} />
                </button>
                <button className="w-full flex items-center justify-between p-4 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition border border-purple-100">
                  <span>View Calendar</span>
                  <FiCalendar size={18} />
                </button>
                <button className="w-full flex items-center justify-between p-4 bg-yellow-50 text-yellow-600 rounded-lg hover:bg-yellow-100 transition border border-yellow-100">
                  <span>Set Reminder</span>
                  <FiClock size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;