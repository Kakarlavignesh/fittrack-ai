import { useState, useMemo } from 'react';
import { Search, ArrowLeft, Filter, AlertCircle, Dumbbell } from 'lucide-react';
import { EXERCISE_CATEGORIES, EXERCISES, type Exercise } from '../data/exercises';
import CategoryCard from '../components/CategoryCard';
import ExerciseCard from '../components/ExerciseCard';
import ExerciseModal from '../components/ExerciseModal';

const ExerciseLibrary = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  const activeCategoryName = EXERCISE_CATEGORIES.find(c => c.id === selectedCategory)?.name;

  // Filter exercises based on category, search, and difficulty
  const filteredExercises = useMemo(() => {
    return EXERCISES.filter(ex => {
      const matchesCategory = selectedCategory ? ex.category.toLowerCase() === activeCategoryName?.toLowerCase() : true;
      const matchesSearch = 
        ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ex.targetMuscle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ex.equipment.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDifficulty = difficultyFilter === 'All' ? true : ex.difficulty === difficultyFilter;

      return matchesCategory && matchesSearch && matchesDifficulty;
    });
  }, [selectedCategory, searchQuery, difficultyFilter, activeCategoryName]);

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      
      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
            <Dumbbell className="w-8 h-8 text-blue-500" />
            Beginner Exercise Library
          </h1>
          <p className="text-gray-400 mt-2 text-lg max-w-2xl">
            Master your form with our curated collection of essential gym movements. Perfect for beginners looking to build a strong foundation.
          </p>
        </div>
        
        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text"
              placeholder="Search exercises..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); if(e.target.value && !selectedCategory) { /* Keep searching global if typing */ } }}
              className="pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full shadow-inner"
            />
          </div>
          <div className="relative w-full sm:w-40">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select 
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="pl-9 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full appearance-none shadow-inner"
            >
              <option value="All">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
            </select>
          </div>
        </div>
      </div>

      {/* Educational Disclaimer */}
      <div className="flex items-start gap-3 bg-blue-900/20 p-4 rounded-xl border border-blue-500/30">
        <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-blue-200 leading-relaxed">
          <strong>Safety First:</strong> Exercise demonstrations are for general educational purposes. Beginners should use appropriate weights, prioritize proper form, and seek guidance from a qualified fitness professional when needed.
        </p>
      </div>

      {/* Main Content Area */}
      <div className="relative min-h-[500px]">
        {/* State 1: Category Grid */}
        {!selectedCategory && !searchQuery && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {EXERCISE_CATEGORIES.map(category => (
              <CategoryCard 
                key={category.id} 
                category={category}
                exerciseCount={EXERCISES.filter(e => e.category.toLowerCase() === category.name.toLowerCase()).length}
                onClick={() => setSelectedCategory(category.id)} 
              />
            ))}
          </div>
        )}

        {/* State 2: Expanded Category or Search Results */}
        {(selectedCategory || searchQuery) && (
          <div className="animate-in fade-in slide-in-from-right-8 duration-500">
            {/* Back Button & Title */}
            <div className="flex items-center gap-4 mb-6">
              <button 
                onClick={() => { setSelectedCategory(null); setSearchQuery(''); }}
                className="p-2 hover:bg-gray-800 text-gray-400 hover:text-white rounded-xl transition-colors flex items-center gap-2 font-medium border border-transparent hover:border-gray-700"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Categories
              </button>
              <h2 className="text-2xl font-bold text-white border-l-2 border-gray-700 pl-4">
                {searchQuery ? 'Search Results' : activeCategoryName} Exercises
              </h2>
            </div>

            {/* Exercises Grid */}
            {filteredExercises.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredExercises.map(exercise => (
                  <ExerciseCard 
                    key={exercise.id} 
                    exercise={exercise} 
                    onClick={() => setSelectedExercise(exercise)}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 bg-gray-800/30 rounded-3xl border border-gray-700 border-dashed">
                <Dumbbell className="w-12 h-12 text-gray-600 mb-4" />
                <p className="text-gray-400 text-lg">No exercises found matching your criteria.</p>
                <button 
                  onClick={() => { setSearchQuery(''); setDifficultyFilter('All'); }}
                  className="mt-4 text-blue-400 hover:text-blue-300 font-medium"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Exercise Detail Modal */}
      {selectedExercise && (
        <ExerciseModal 
          exercise={selectedExercise} 
          onClose={() => setSelectedExercise(null)} 
        />
      )}
    </div>
  );
};

export default ExerciseLibrary;
