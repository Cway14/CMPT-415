import React from 'react'
import { useNavigate } from "react-router-dom";

import "./Leaderboard.css"

const Leaderboard = () => {

    const navigate = useNavigate();

    // populate with 20 scores
    const mockScores = [
        { name: "John", score: 100 },
        { name: "Jane", score: 90 },
        { name: "Joe", score: 80 },
        { name: "Jill", score: 70 },
        { name: "Jack", score: 60 },
        { name: "Jen", score: 50 },
        { name: "Jenny", score: 40 },
        { name: "Jim", score: 30 },
        { name: "Jimmy", score: 20 },
        { name: "Jenny", score: 10 },
    ]
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
                mockScores.map((score, index) => {
                    return (
                        <div key={index} className='leaderBoardItem'>
                            <p>{index + 1}</p>
                            <p>{score.name}</p>
                            <p>{score.score}</p>
                        </div>
                    )
                })
            }
            <div className="leaderBoardFooter">
                <button onClick={() => navigate('/')}>Return Home</button>
            </div>
        </div>
    )
}

export default Leaderboard