import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Progress from './pages/Progress';
import Workouts from './pages/Workouts';
import Diet from './pages/Diet';
import MasterPlan from './pages/MasterPlan';
import ExerciseLibrary from './pages/ExerciseLibrary';
import Profile from './pages/Profile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/diet" element={<Diet />} />
          <Route path="/master-plan" element={<MasterPlan />} />
          <Route path="/exercises" element={<ExerciseLibrary />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
