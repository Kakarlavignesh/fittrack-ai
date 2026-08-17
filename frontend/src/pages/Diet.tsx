import { useState, useEffect } from 'react';
import { Apple, Bot, Search, Edit2, Check, X, ChevronDown, ChevronUp } from 'lucide-react';
import api from '../services/api';
import type { DietPlan } from '../types';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const DietPage = () => {
  const [plans, setPlans] = useState<DietPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState('');
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());

  const toggleExpand = (id: number) => {
    setExpandedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  useEffect(() => {
    fetchPlans();
  }, []);

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

  const handleRename = async (id: number) => {
    if (!editName.trim()) {
      setEditingId(null);
      return;
    }
    try {
      await api.put(`/diet/${id}/rename`, { name: editName });
      setPlans(plans.map(p => p.id === id ? { ...p, name: editName } : p));
      setEditingId(null);
    } catch (err) {
      console.error('Failed to rename plan', err);
      alert('Failed to rename plan');
    }
  };

  const filteredPlans = plans.filter(plan => 
    (plan.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) || 
    (plan.goal?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Diet & Master Plans</h1>
          <p className="text-gray-400 mt-2">View your saved diet plans and AI Master Plans.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text"
              placeholder="Search plans by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
            />
          </div>
          <Link to="/master-plan" className="px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-lg flex items-center justify-center gap-2 font-medium transition-all shadow-lg whitespace-nowrap">
            <Bot className="w-5 h-5" /> Ask AI for a new plan
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {loading ? (
          <div className="text-gray-500 col-span-1 md:col-span-2 text-center py-8">Loading...</div>
        ) : filteredPlans.length === 0 ? (
          <div className="text-gray-500 col-span-1 md:col-span-2 text-center py-12 bg-gray-800/30 rounded-2xl border border-gray-700 border-dashed">
            <Apple className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>{searchTerm ? 'No plans match your search.' : 'You haven\'t saved any diet plans yet. Use the AI Assistant to generate one!'}</p>
          </div>
        ) : (
          filteredPlans.map((plan) => (
            <div key={plan.id} className={`bg-gray-800/70 backdrop-blur-sm border border-gray-700 rounded-2xl overflow-hidden shadow-xl ${plan.markdownContent ? 'md:col-span-2' : ''}`}>
              <div 
                className="p-6 border-b border-gray-700 bg-gray-800/90 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 cursor-pointer hover:bg-gray-700/50 transition-colors"
                onClick={() => toggleExpand(plan.id)}
              >
                <div className="flex-1 w-full">
                  {editingId === plan.id ? (
                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      <input 
                        type="text" 
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="bg-gray-900 border border-gray-600 text-white px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg font-bold w-full sm:w-auto"
                        autoFocus
                      />
                      <button onClick={() => handleRename(plan.id)} className="p-1 text-green-400 hover:bg-gray-700 rounded"><Check className="w-5 h-5" /></button>
                      <button onClick={() => setEditingId(null)} className="p-1 text-red-400 hover:bg-gray-700 rounded"><X className="w-5 h-5" /></button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        {plan.name || plan.goal}
                      </h3>
                      <button 
                        onClick={(e) => { 
                          e.stopPropagation();
                          setEditingId(plan.id); 
                          setEditName(plan.name || plan.goal); 
                        }} 
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                  <p className="text-sm text-gray-400 mt-1">Created on {new Date(plan.createdAt || '').toLocaleDateString()}</p>
                </div>
                {!plan.markdownContent && (
                  <div className="bg-green-500/20 text-green-400 px-4 py-2 rounded-xl font-bold flex-shrink-0">
                    {plan.dailyCalories} kcal
                  </div>
                )}
                {plan.markdownContent && (
                  <div className="bg-purple-500/20 text-purple-400 px-4 py-2 rounded-xl font-bold flex-shrink-0 flex items-center gap-2">
                    <Bot className="w-4 h-4" /> AI Generated
                  </div>
                )}
                <div className="text-gray-400 flex-shrink-0 ml-2">
                  {expandedIds.has(plan.id) ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
                </div>
              </div>
              
              {expandedIds.has(plan.id) && (
                plan.markdownContent ? (
                  <div className="p-6">
                  <div className="prose prose-invert prose-purple max-w-none text-sm md:text-base">
                    <ReactMarkdown>{plan.markdownContent}</ReactMarkdown>
                  </div>
                </div>
              ) : (
                <>
                  <div className="p-6 border-b border-gray-700">
                    <div className="grid grid-cols-3 gap-4 text-center">
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
                </>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DietPage;
