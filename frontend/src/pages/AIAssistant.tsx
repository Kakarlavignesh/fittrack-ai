import { useState, useRef, useEffect } from 'react';
import { Bot, Send, Sparkles, AlertTriangle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import api from '../services/api';

const AIAssistant = () => {
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: 'Hi there! I am your personal FitTrack AI assistant. You can ask me anything about fitness, nutrition, or workouts. Or, you can click the button below to generate a personalized plan based on your profile!' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [planLoading, setPlanLoading] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setLoading(true);

    try {
      const res = await api.post('/ai/chat', { message: userMessage });
      setMessages(prev => [...prev, { role: 'ai', text: res.data.response }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', text: 'Sorry, I encountered an error connecting to the AI.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleGeneratePlan = async () => {
    setPlanLoading(true);
    setGeneratedPlan('');
    
    try {
      const res = await api.post('/ai/generate-plan');
      setGeneratedPlan(res.data.plan);
    } catch (err) {
      setGeneratedPlan('Failed to generate plan. Please try again.');
    } finally {
      setPlanLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-8rem)] flex flex-col md:flex-row gap-8">
      {/* Chat Section */}
      <div className="flex-1 flex flex-col bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-xl overflow-hidden h-full">
        <div className="p-4 border-b border-gray-700 bg-gray-800 flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-white">FitTrack AI Coach</h2>
            <p className="text-xs text-gray-400">Powered by Google Gemini</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl px-5 py-3 ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-gray-700 text-gray-100 rounded-tl-none border border-gray-600 prose prose-invert prose-p:leading-snug prose-sm'
              }`}>
                {msg.role === 'ai' ? (
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                ) : (
                  msg.text
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-700 text-gray-400 rounded-2xl rounded-tl-none px-5 py-3 border border-gray-600 flex gap-2 items-center">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 bg-gray-800 border-t border-gray-700">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me about fitness..."
              className="flex-1 bg-gray-900 border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white px-5 rounded-xl transition-colors flex items-center justify-center"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>

      {/* Generator Section */}
      <div className="flex-1 flex flex-col h-full bg-gradient-to-b from-gray-800 to-gray-900 border border-gray-700 rounded-2xl shadow-xl overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative z-10 p-8 flex flex-col h-full">
          <div className="text-center mb-8">
            <div className="inline-flex p-4 bg-purple-500/20 rounded-full mb-4 ring-4 ring-purple-500/10">
              <Sparkles className="w-12 h-12 text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Personalized Master Plan</h2>
            <p className="text-gray-400 text-sm">Generate a customized fitness and diet plan based entirely on your profile metrics and goals.</p>
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
              <p className="text-purple-300 animate-pulse font-medium">Analyzing your profile & generating plan...</p>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto bg-gray-900/80 rounded-xl p-6 border border-gray-700 custom-scrollbar">
              <div className="prose prose-invert prose-purple max-w-none whitespace-pre-wrap">
                {generatedPlan}
              </div>
              <div className="mt-8 pt-4 border-t border-gray-700 flex justify-center">
                <button
                  onClick={handleGeneratePlan}
                  className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm font-medium"
                >
                  Regenerate Plan
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
