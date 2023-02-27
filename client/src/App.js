import { useEffect, useState } from "react";

import LandingPage from './Pages/LandingPage/LandingPage';
import { initializeFirebase } from './auth/firebase';

function App() {
  initializeFirebase();
  const [users, setUsers] = useState([{}])

  useEffect(() => {
    fetch('/api').then(
      res => res.json()
    ).then(
      data => {
        setUsers(data)
      }
    )
  }, [])

  return (
    <div className="App">
      <LandingPage />
    </div>
  );
}

export default App;
