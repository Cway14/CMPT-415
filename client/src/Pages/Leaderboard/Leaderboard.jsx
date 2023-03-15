import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./Leaderboard.css";

const Leaderboard = () => {
  const [players, setPlayers] = React.useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(process.env.REACT_APP_API + "/leaderboard")
      .then((res) => res.json())
      .then((data) => {
        setPlayers(data);
      });
  }, []);

  return (
    <div className="leaderBoardModal modal">
      <div className="leaderBoardHeader">
        <h2>Leaderboard</h2>
        <div className="leaderBoardItem leaderBoardLabels">
          <strong>
            <p>Rank</p>
          </strong>
          <strong>
            <p>Name</p>
          </strong>
          <strong>
            <p>Score</p>
          </strong>
        </div>
      </div>
      {players.length > 0 &&
        players.map((player, index) => {
          return (
            <div key={index} className="leaderBoardItem">
              <p>{index + 1}</p>
              <div className="center-row">
                <div className="leaderBoardProfilePic">
                  <svg
                    width="50"
                    height="50"
                    dangerouslySetInnerHTML={{ __html: player.profile_picture }}
                  />
                </div>
                <h3>{player.name}</h3>
              </div>
              <h4>{player.score}</h4>
            </div>
          );
        })}
      {players.length === 0 && (
        <div className="leaderBoardItem">
          <p>No scores yet!</p>
        </div>
      )}
      <div className="leaderBoardFooter">
        <button onClick={() => navigate("/")}>Return Home</button>
      </div>
    </div>
  );
};

export default Leaderboard;
