import { useState, useEffect } from 'react';
import { Apple, Bot } from 'lucide-react';
import api from '../services/api';
import type { DietPlan } from '../types';
import { Link } from 'react-router-dom';

const DietPage = () => {
  const [plans, setPlans] = useState<DietPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await api.get('/diet');
        setPlans(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white">Diet Plans</h1>
          <p className="text-gray-400 mt-2">View your saved diet plans.</p>
        </div>
        <Link to="/ai-assistant" className="px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-lg flex items-center gap-2 font-medium transition-all shadow-lg">
          <Bot className="w-5 h-5" /> Ask AI for a new plan
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {loading ? (
          <div className="text-gray-500 col-span-2 text-center py-8">Loading...</div>
        ) : plans.length === 0 ? (
          <div className="text-gray-500 col-span-2 text-center py-12 bg-gray-800/30 rounded-2xl border border-gray-700 border-dashed">
            <Apple className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>You haven't saved any diet plans yet. Use the AI Assistant to generate one!</p>
          </div>
        ) : (
          plans.map((plan) => (
            <div key={plan.id} className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 rounded-2xl overflow-hidden shadow-xl">
              <div className="p-6 border-b border-gray-700 bg-gray-800/90">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-white">Goal: {plan.goal}</h3>
                    <p className="text-sm text-gray-400 mt-1">Created on {new Date(plan.createdAt || '').toLocaleDateString()}</p>
                  </div>
                  <div className="bg-green-500/20 text-green-400 px-4 py-2 rounded-xl font-bold">
                    {plan.dailyCalories} kcal
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mt-6 text-center">
                  <div className="bg-gray-900/50 p-3 rounded-lg">
                    <p className="text-xs text-gray-400">Protein</p>
                    <p className="font-semibold text-blue-400">{plan.protein}g</p>
                  </div>
                  <div className="bg-gray-900/50 p-3 rounded-lg">
                    <p className="text-xs text-gray-400">Carbs</p>
                    <p className="font-semibold text-orange-400">{plan.carbohydrates}g</p>
                  </div>
                  <div className="bg-gray-900/50 p-3 rounded-lg">
                    <p className="text-xs text-gray-400">Fats</p>
                    <p className="font-semibold text-yellow-400">{plan.fats}g</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-gray-300 mb-1 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500"></div> Breakfast</h4>
                  <p className="text-gray-400 text-sm ml-4">{plan.breakfast}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-300 mb-1 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-orange-500"></div> Lunch</h4>
                  <p className="text-gray-400 text-sm ml-4">{plan.lunch}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-300 mb-1 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-purple-500"></div> Dinner</h4>
                  <p className="text-gray-400 text-sm ml-4">{plan.dinner}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-300 mb-1 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500"></div> Snacks</h4>
                  <p className="text-gray-400 text-sm ml-4">{plan.snacks}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DietPage;
