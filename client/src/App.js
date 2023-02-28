import { useEffect, useState } from "react";

import { Routes, Route, Navigate } from "react-router-dom";

import { initializeFirebase } from './auth/firebase';
import LandingPage from './Pages/LandingPage/LandingPage';
import GameView from './Pages/GameView/GameView';
import Leaderboard from "./Pages/Leaderboard/Leaderboard";


function RequireAuth({ user, children }) {
  if (!user) return <Navigate to="/" replace />;
  return children;
}

function App() {
  initializeFirebase();
  const [user, setUser] = useState()

  useEffect(() => {
    fetch('/api').then(
      res => res.json()
    ).then(
      data => {
        setUser(data)
      }
    )
  }, [])
  
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage user={user}  setUser={setUser} />} />
        <Route path="/play" element={<RequireAuth user={user}><GameView /></RequireAuth>} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </div>
  );
}

export default App;
