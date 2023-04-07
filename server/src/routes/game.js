const express = require("express");
const router = express.Router();

const db = require("../db");

router.get("/context", async (req, res) => {
    const { id } = req.query;
    try {
        res.json({
            room: "keyroom",
            leversCompleted: [0, 1, 2, 3, 4, 6, 7, 8, 9],
            roomsEntered: ["bedroom"],
        });
    } catch (error) {
        console.error("ERROR: ", error);
        res.sendStatus(500);
    }
});

module.exports = router;
