import { useState, useEffect } from 'react';
import { Activity, Plus, Trash2 } from 'lucide-react';
import api from '../services/api';
import type { Progress } from '../types';

const ProgressPage = () => {
  const [progressList, setProgressList] = useState<Progress[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    weight: '',
    caloriesConsumed: '',
    caloriesBurned: '',
    steps: '',
    notes: '',
    workoutCompleted: false
  });

  const fetchProgress = async () => {
    try {
      const res = await api.get('/progress');
      setProgressList(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProgress();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/progress', {
        weight: parseFloat(formData.weight),
        caloriesConsumed: parseInt(formData.caloriesConsumed),
        caloriesBurned: parseInt(formData.caloriesBurned),
        steps: parseInt(formData.steps),
        notes: formData.notes,
        workoutCompleted: formData.workoutCompleted
      });
      setFormData({ weight: '', caloriesConsumed: '', caloriesBurned: '', steps: '', notes: '', workoutCompleted: false });
      fetchProgress();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/progress/${id}`);
      fetchProgress();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Daily Progress</h1>
        <p className="text-gray-400 mt-2">Track your daily metrics and stay consistent.</p>
      </div>

      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2 mb-6">
          <Plus className="w-5 h-5 text-blue-400" /> Log Today's Progress
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Weight (kg)</label>
            <input type="number" step="0.1" required value={formData.weight} onChange={e => setFormData({...formData, weight: e.target.value})} className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Calories Consumed</label>
            <input type="number" required value={formData.caloriesConsumed} onChange={e => setFormData({...formData, caloriesConsumed: e.target.value})} className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Calories Burned</label>
            <input type="number" required value={formData.caloriesBurned} onChange={e => setFormData({...formData, caloriesBurned: e.target.value})} className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Steps</label>
            <input type="number" required value={formData.steps} onChange={e => setFormData({...formData, steps: e.target.value})} className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">Notes</label>
            <input type="text" value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white" placeholder="Felt great today!" />
          </div>
          <div className="md:col-span-3 flex items-center justify-between">
            <label className="flex items-center gap-3 text-gray-300">
              <input type="checkbox" checked={formData.workoutCompleted} onChange={e => setFormData({...formData, workoutCompleted: e.target.checked})} className="w-5 h-5 rounded border-gray-600 text-blue-500 focus:ring-blue-500 bg-gray-900" />
              Workout Completed Today?
            </label>
            <button type="submit" className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors font-medium">
              Save Progress
            </button>
          </div>
        </form>
      </div>

      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-green-400" /> Recent Progress Logs
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-gray-300">
            <thead className="bg-gray-900/50 text-gray-400 text-sm uppercase">
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Weight</th>
                <th className="px-6 py-4">Calories (In/Out)</th>
                <th className="px-6 py-4">Steps</th>
                <th className="px-6 py-4">Workout</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="px-6 py-8 text-center text-gray-500">Loading...</td></tr>
              ) : progressList.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-8 text-center text-gray-500">No progress logged yet.</td></tr>
              ) : (
                progressList.map((prog) => (
                  <tr key={prog.id} className="border-b border-gray-700 hover:bg-gray-750">
                    <td className="px-6 py-4">{new Date(prog.recordedDate || '').toLocaleDateString()}</td>
                    <td className="px-6 py-4 font-medium text-white">{prog.weight} kg</td>
                    <td className="px-6 py-4">{prog.caloriesConsumed} / {prog.caloriesBurned}</td>
                    <td className="px-6 py-4">{prog.steps}</td>
                    <td className="px-6 py-4">
                      {prog.workoutCompleted ? <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">Yes</span> : <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded-full text-xs">No</span>}
                    </td>
                    <td className="px-6 py-4">
                      <button onClick={() => handleDelete(prog.id!)} className="text-red-400 hover:text-red-300 transition-colors">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;
