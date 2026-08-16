import { X, Play, Target, Shield, AlertTriangle } from 'lucide-react';
import type { Exercise } from '../data/exercises';

interface Props {
  exercise: Exercise;
  onClose: () => void;
}

const ExerciseModal = ({ exercise, onClose }: Props) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-gray-900 border border-gray-700 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header Image */}
        <div className="relative h-64 sm:h-80 w-full bg-gray-800 flex-shrink-0">
          <img 
            src={exercise.image} 
            alt={exercise.name} 
            className="w-full h-full object-cover object-center"
            onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent"></div>
          
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full backdrop-blur-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-6 left-6 right-6">
            <div className="inline-block px-3 py-1 bg-blue-600/90 text-white text-xs font-bold uppercase tracking-wider rounded-lg mb-2 backdrop-blur-sm">
              {exercise.category}
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white">{exercise.name}</h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-gray-800/50 p-4 rounded-2xl border border-gray-700/50">
              <p className="text-gray-400 text-xs font-semibold uppercase mb-1">Difficulty</p>
              <p className="text-white font-bold text-sm">{exercise.difficulty}</p>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-2xl border border-gray-700/50">
              <p className="text-gray-400 text-xs font-semibold uppercase mb-1">Equipment</p>
              <p className="text-white font-bold text-sm">{exercise.equipment}</p>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-2xl border border-gray-700/50 col-span-2 sm:col-span-2">
              <p className="text-gray-400 text-xs font-semibold uppercase mb-1">Target Muscle</p>
              <p className="text-blue-400 font-bold text-sm">{exercise.targetMuscle}</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <Play className="w-5 h-5 text-purple-400" /> How to perform
            </h3>
            <p className="text-gray-300 leading-relaxed bg-gray-800/30 p-5 rounded-2xl border border-gray-700/50">
              {exercise.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Beginner Tip */}
            <div>
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-400" /> Beginner Tip
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed bg-green-900/10 border border-green-500/20 p-4 rounded-2xl">
                {exercise.tips}
              </p>
            </div>

            {/* Common Mistake */}
            <div>
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-400" /> Common Mistake
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed bg-orange-900/10 border border-orange-500/20 p-4 rounded-2xl">
                {exercise.mistakes}
              </p>
            </div>
          </div>

          {/* Suggested Sets */}
          <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-purple-500/30 p-6 rounded-2xl text-center">
            <h3 className="text-sm font-bold text-purple-300 uppercase tracking-widest mb-2 flex items-center justify-center gap-2">
              <Target className="w-4 h-4" /> Suggested Routine
            </h3>
            <p className="text-2xl font-black text-white">{exercise.suggestedSets}</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ExerciseModal;
