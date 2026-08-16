import { useState } from 'react';
import { Bot, Sparkles, AlertTriangle, Save, CheckCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import api from '../services/api';

const MasterPlan = () => {
  const [planLoading, setPlanLoading] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState('');
  const [planName, setPlanName] = useState('My AI Master Plan');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleGeneratePlan = async () => {
    setPlanLoading(true);
    setGeneratedPlan('');
    setSaved(false);
    
    try {
      const res = await api.post('/ai/generate-plan');
      setGeneratedPlan(res.data.plan);
    } catch (err) {
      setGeneratedPlan('Failed to generate plan. Please try again.');
    } finally {
      setPlanLoading(false);
    }
  };

  const handleSavePlan = async () => {
    if (!generatedPlan || saved) return;
    setSaving(true);
    
    try {
      await api.post('/diet', {
        name: planName,
        goal: 'AI Generated Master Plan',
        markdownContent: generatedPlan
      });
      setSaved(true);
    } catch (err) {
      console.error('Failed to save plan', err);
      alert('Failed to save plan. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-8rem)]">
      <div className="flex flex-col h-full bg-gradient-to-b from-gray-800 to-gray-900 border border-gray-700 rounded-2xl shadow-xl overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>
        <div className="relative z-10 p-8 flex flex-col h-full">
          <div className="text-center mb-8">
            <div className="inline-flex p-4 bg-purple-500/20 rounded-full mb-4 ring-4 ring-purple-500/10">
              <Sparkles className="w-12 h-12 text-purple-400" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Personalized Master Plan</h2>
            <p className="text-gray-400">Generate a customized fitness and diet plan based entirely on your profile metrics and goals.</p>
          </div>

          {!generatedPlan && !planLoading ? (
            <div className="flex-1 flex flex-col items-center justify-center">
              <button
                onClick={handleGeneratePlan}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-xl shadow-lg shadow-purple-900/50 transition-all transform hover:scale-105 flex items-center gap-3 text-lg"
              >
                <Bot className="w-6 h-6" /> Generate My Fitness Plan
              </button>
              
              <div className="mt-8 flex items-start gap-3 bg-blue-900/30 p-4 rounded-xl border border-blue-500/30 max-w-sm">
                <AlertTriangle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-blue-200">Disclaimer: AI-generated fitness information is general guidance and is not a substitute for professional medical or nutritional advice.</p>
              </div>
            </div>
          ) : planLoading ? (
            <div className="flex-1 flex flex-col items-center justify-center space-y-6">
              <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-purple-300 animate-pulse font-medium text-lg">Analyzing your profile & generating plan...</p>
            </div>
          ) : (
            <div className="flex-1 flex flex-col min-h-0">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4 bg-gray-900/50 p-4 rounded-xl border border-gray-700">
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <input 
                    type="text" 
                    value={planName}
                    onChange={(e) => setPlanName(e.target.value)}
                    className="bg-gray-800 border border-gray-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 w-full md:w-64"
                    placeholder="Name your plan..."
                  />
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                  <button
                    onClick={handleGeneratePlan}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm font-medium flex-1 md:flex-none"
                  >
                    Regenerate
                  </button>
                  <button
                    onClick={handleSavePlan}
                    disabled={saving || saved}
                    className={`px-4 py-2 flex items-center justify-center gap-2 rounded-lg transition-colors text-sm font-medium flex-1 md:flex-none ${
                      saved ? 'bg-green-600 text-white' : 'bg-purple-600 hover:bg-purple-500 text-white'
                    }`}
                  >
                    {saved ? <><CheckCircle className="w-4 h-4" /> Saved!</> : <><Save className="w-4 h-4" /> Save Plan</>}
                  </button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto bg-gray-900/80 rounded-xl p-6 md:p-10 border border-gray-700 custom-scrollbar shadow-inner">
                <div className="prose prose-invert prose-purple max-w-none whitespace-pre-wrap">
                  <ReactMarkdown>{generatedPlan}</ReactMarkdown>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MasterPlan;
