import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Activity, Dumbbell, Apple, Bot, User, LogOut } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <Home className="w-5 h-5" /> },
    { name: 'Progress', path: '/progress', icon: <Activity className="w-5 h-5" /> },
    { name: 'Workouts', path: '/workouts', icon: <Dumbbell className="w-5 h-5" /> },
    { name: 'Diet Plans', path: '/diet', icon: <Apple className="w-5 h-5" /> },
    { name: 'Master Plan', path: '/master-plan', icon: <Bot className="w-5 h-5" /> },
    { name: 'Profile', path: '/profile', icon: <User className="w-5 h-5" /> },
  ];

  return (
    <div className="flex flex-col w-64 h-screen bg-gray-800 border-r border-gray-700">
      <div className="flex items-center justify-center h-20 border-b border-gray-700">
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
          FitTrack AI
        </h1>
      </div>
      <div className="flex-1 py-6 overflow-y-auto">
        <nav className="flex flex-col gap-2 px-4">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                location.pathname === item.path
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-gray-700 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
