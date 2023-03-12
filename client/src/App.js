import { Routes, Route, Navigate } from "react-router-dom";

import LandingPage from './Pages/LandingPage/LandingPage';
import GameView from './Pages/GameView/GameView';
import Leaderboard from "./Pages/Leaderboard/Leaderboard";
import { AuthProvider, useAuth } from "./auth/AuthContext"


function RequireAuth({ user, children }) {
  const { currentUser } = useAuth();
  if (!currentUser) return <Navigate to="/" replace />;
  return children;
}

function App() {
  
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/play" element={<RequireAuth ><GameView /></RequireAuth>} />
            <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </ AuthProvider>
    </div>
  );
}

export default App;
