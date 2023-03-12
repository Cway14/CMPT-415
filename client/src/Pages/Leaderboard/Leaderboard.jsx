import React, {useEffect} from 'react'
import { useNavigate } from "react-router-dom";

import "./Leaderboard.css"

const Leaderboard = () => {
    const [scores, setScores] = React.useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        fetch(process.env.REACT_APP_API + "/leaderboard")
            .then((res) => res.json())
            .then((data) => {
                setScores(data);
            });
    }, []);

    
    return (
        <div className='leaderBoardModal modal'>
            <div className="leaderBoardHeader">
                <h2>Leaderboard</h2>
                <div className='leaderBoardItem leaderBoardLabels'>
                        <strong><p>Rank</p></strong>
                        <strong><p>Name</p></strong>
                        <strong><p>Score</p></strong>
                </div>
            </div>
            {
                scores.length > 0 &&
                scores.map((score, index) => {
                    return (
                        <div key={index} className='leaderBoardItem'>
                            <p>{index + 1}</p>
                            <p>{score.name}</p>
                            <p>{score.score}</p>
                        </div>
                    )
                })
            }
            {
                scores.length === 0 &&
                <div className='leaderBoardItem'>
                        <p>No scores yet!</p>
                </div>
            }
            <div className="leaderBoardFooter">
                <button onClick={() => navigate('/')}>Return Home</button>
            </div>
        </div>
    )
}

export default Leaderboard