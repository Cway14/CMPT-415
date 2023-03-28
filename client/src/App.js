import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import LandingPage from "./Pages/LandingPage/LandingPage";
import GameView from "./Pages/GameView/GameView";
import Leaderboard from "./Pages/Leaderboard/Leaderboard";
import { useAuth } from "./auth/AuthContext";
import QuestionForm from "components/Question/QuestionForm";

function RequireAuth({ user, children }) {
  const { currentUser } = useAuth();
  if (!currentUser) return <Navigate to="/" replace />;
  return children;
}

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/play"
          element={
            <RequireAuth>
              <GameView />
            </RequireAuth>
          }
        />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/createQuestion" element={<QuestionForm />} />
      </Routes>
    </div>
  );
}

export default App;
