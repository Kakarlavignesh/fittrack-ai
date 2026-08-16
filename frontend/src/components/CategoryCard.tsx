import { ArrowRight, Layers } from 'lucide-react';

interface Props {
  category: {
    id: string;
    name: string;
    description: string;
    image: string;
  };
  exerciseCount: number;
  onClick: () => void;
}

const CategoryCard = ({ category, exerciseCount, onClick }: Props) => {
  return (
    <div 
      onClick={onClick}
      className="group relative h-72 sm:h-80 rounded-3xl overflow-hidden cursor-pointer bg-gray-900 border border-gray-700 hover:border-purple-500/50 transition-all duration-500 shadow-xl"
    >
      <img 
        src={category.image} 
        alt={category.name} 
        className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 group-hover:opacity-60 opacity-40 transition-all duration-700 ease-out"
        onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80'; }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent"></div>
      
      <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-2 bg-purple-500/20 backdrop-blur-md rounded-xl border border-purple-500/30">
            <Layers className="w-5 h-5 text-purple-400" />
          </div>
          <span className="text-purple-300 font-semibold text-sm tracking-wide">
            {exerciseCount} Exercises
          </span>
        </div>
        
        <h3 className="text-3xl font-black text-white mb-2 tracking-tight group-hover:translate-x-2 transition-transform duration-300">
          {category.name}
        </h3>
        
        <p className="text-gray-300 text-sm mb-6 max-w-[80%] line-clamp-2">
          {category.description}
        </p>
        
        <div className="flex items-center gap-2 text-white font-bold text-sm uppercase tracking-wider group-hover:text-purple-400 transition-colors">
          Explore Library 
          <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
