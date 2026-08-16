import { useState, useEffect } from 'react';
import { Dumbbell, Plus, Trash2 } from 'lucide-react';
import api from '../services/api';
import type { Workout } from '../types';

const WorkoutsPage = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    workoutName: '',
    workoutType: 'Strength Training',
    duration: '',
    caloriesBurned: ''
  });

  const fetchWorkouts = async () => {
    try {
      const res = await api.get('/workouts');
      setWorkouts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/workouts', {
        workoutName: formData.workoutName,
        workoutType: formData.workoutType,
        duration: parseInt(formData.duration),
        caloriesBurned: parseInt(formData.caloriesBurned)
      });
      setFormData({ workoutName: '', workoutType: 'Strength Training', duration: '', caloriesBurned: '' });
      fetchWorkouts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/workouts/${id}`);
      fetchWorkouts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Workouts</h1>
        <p className="text-gray-400 mt-2">Log your workouts to keep track of your efforts.</p>
      </div>

      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2 mb-6">
          <Plus className="w-5 h-5 text-orange-400" /> Add Workout
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">Workout Name</label>
            <input type="text" required value={formData.workoutName} onChange={e => setFormData({...formData, workoutName: e.target.value})} className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white" placeholder="e.g. Upper Body Power" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
            <select value={formData.workoutType} onChange={e => setFormData({...formData, workoutType: e.target.value})} className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white">
              <option value="Strength Training">Strength Training</option>
              <option value="Cardio">Cardio</option>
              <option value="HIIT">HIIT</option>
              <option value="Yoga/Flexibility">Yoga/Flexibility</option>
              <option value="Sports">Sports</option>
            </select>
          </div>
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-300 mb-2">Duration (mins)</label>
            <input type="number" required value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white" />
          </div>
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-300 mb-2">Calories Burned</label>
            <input type="number" required value={formData.caloriesBurned} onChange={e => setFormData({...formData, caloriesBurned: e.target.value})} className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white" />
          </div>
          <div className="md:col-span-2 flex items-end justify-end">
            <button type="submit" className="px-6 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-lg transition-colors font-medium w-full md:w-auto">
              Save Workout
            </button>
          </div>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="text-gray-500 col-span-3 text-center py-8">Loading...</div>
        ) : workouts.length === 0 ? (
          <div className="text-gray-500 col-span-3 text-center py-8 bg-gray-800/30 rounded-2xl border border-gray-700 border-dashed">No workouts logged yet.</div>
        ) : (
          workouts.map((workout) => (
            <div key={workout.id} className="bg-gray-800/80 border border-gray-700 rounded-2xl p-6 relative group hover:border-orange-500/50 transition-colors">
              <button onClick={() => handleDelete(workout.id!)} className="absolute top-4 right-4 text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all">
                <Trash2 className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-orange-500/20 rounded-xl">
                  <Dumbbell className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{workout.workoutName}</h3>
                  <p className="text-sm text-gray-400">{workout.workoutType}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-gray-900/50 p-3 rounded-lg">
                  <p className="text-xs text-gray-400">Duration</p>
                  <p className="font-semibold text-white mt-1">{workout.duration} mins</p>
                </div>
                <div className="bg-gray-900/50 p-3 rounded-lg">
                  <p className="text-xs text-gray-400">Calories Burned</p>
                  <p className="font-semibold text-orange-400 mt-1">{workout.caloriesBurned} kcal</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4 text-center">{new Date(workout.workoutDate || '').toLocaleDateString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default WorkoutsPage;
