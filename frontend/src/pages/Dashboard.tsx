import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Flame, Target, Trophy } from 'lucide-react';
import api from '../services/api';
import type { User, Progress } from '../types';

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [progressData, setProgressData] = useState<Progress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await api.get('/users/me');
        setUser(userRes.data);
        
        const progRes = await api.get('/progress');
        // Sort by date ascending for chart
        const sortedData = progRes.data.sort((a: any, b: any) => 
          new Date(a.recordedDate).getTime() - new Date(b.recordedDate).getTime()
        );
        setProgressData(sortedData);
      } catch (err) {
        console.error('Failed to fetch dashboard data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="flex h-full items-center justify-center"><div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div></div>;
  }

  const latestProgress = progressData.length > 0 ? progressData[progressData.length - 1] : null;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white">Good morning, {user?.name?.split(' ')[0] || 'Athlete'} 👋</h1>
          <p className="text-gray-400 mt-2">Here's a summary of your fitness journey.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-6 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Current Weight</p>
              <h3 className="text-3xl font-bold text-white mt-1">{user?.currentWeight || '--'} <span className="text-lg text-gray-500">kg</span></h3>
            </div>
            <div className="p-3 bg-blue-500/20 rounded-xl">
              <Activity className="w-6 h-6 text-blue-400" />
            </div>
          </div>
          <p className="text-sm text-gray-400 mt-4">Target: {user?.targetWeight || '--'} kg</p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-6 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Calories Burned</p>
              <h3 className="text-3xl font-bold text-white mt-1">{latestProgress?.caloriesBurned || '0'} <span className="text-lg text-gray-500">kcal</span></h3>
            </div>
            <div className="p-3 bg-orange-500/20 rounded-xl">
              <Flame className="w-6 h-6 text-orange-400" />
            </div>
          </div>
          <p className="text-sm text-gray-400 mt-4">Today</p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-6 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Daily Steps</p>
              <h3 className="text-3xl font-bold text-white mt-1">{latestProgress?.steps || '0'}</h3>
            </div>
            <div className="p-3 bg-green-500/20 rounded-xl">
              <Target className="w-6 h-6 text-green-400" />
            </div>
          </div>
          <p className="text-sm text-gray-400 mt-4">Goal: 10,000</p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-6 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Fitness Goal</p>
              <h3 className="text-xl font-bold text-white mt-1">{user?.fitnessGoal || 'Not Set'}</h3>
            </div>
            <div className="p-3 bg-purple-500/20 rounded-xl">
              <Trophy className="w-6 h-6 text-purple-400" />
            </div>
          </div>
          <p className="text-sm text-gray-400 mt-4">Keep pushing!</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-6 rounded-2xl shadow-lg">
        <h3 className="text-xl font-bold text-white mb-6">Weight Progress</h3>
        
        {progressData.length > 0 ? (
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <Line type="monotone" dataKey="weight" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6' }} activeDot={{ r: 8 }} />
                <CartesianGrid stroke="#374151" strokeDasharray="5 5" vertical={false} />
                <XAxis dataKey="recordedDate" stroke="#9ca3af" tick={{fill: '#9ca3af'}} tickMargin={10} />
                <YAxis stroke="#9ca3af" tick={{fill: '#9ca3af'}} domain={['dataMin - 2', 'dataMax + 2']} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#f3f4f6', borderRadius: '0.5rem' }}
                  itemStyle={{ color: '#60a5fa' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-80 flex flex-col items-center justify-center text-gray-400">
            <Activity className="w-12 h-12 mb-4 opacity-50" />
            <p>No progress data yet. Add some records to see your chart!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
