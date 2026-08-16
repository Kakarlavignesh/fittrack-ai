import { Dumbbell } from 'lucide-react';
import type { Exercise } from '../data/exercises';

interface Props {
  exercise: Exercise;
  onClick: () => void;
}

const ExerciseCard = ({ exercise, onClick }: Props) => {
  return (
    <div 
      onClick={onClick}
      className="group bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-3xl overflow-hidden cursor-pointer hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-300 flex flex-col h-full"
    >
      <div className="relative h-48 sm:h-56 w-full bg-gray-900 overflow-hidden">
        <img 
          src={exercise.image} 
          alt={exercise.name} 
          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
          onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=80'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-white text-xs font-bold rounded-full border border-gray-600/50">
            {exercise.difficulty}
          </span>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-1">
          {exercise.name}
        </h3>
        <p className="text-blue-400 text-sm font-semibold mb-3">
          {exercise.targetMuscle}
        </p>
        <p className="text-gray-400 text-sm line-clamp-2 mb-4 flex-1">
          {exercise.description}
        </p>
        
        <div className="flex items-center gap-2 text-gray-500 text-xs font-medium bg-gray-900/50 py-2 px-3 rounded-xl border border-gray-700/50">
          <Dumbbell className="w-4 h-4 text-gray-400" />
          <span className="truncate">{exercise.equipment}</span>
        </div>
      </div>
    </div>
  );
};

export default ExerciseCard;
