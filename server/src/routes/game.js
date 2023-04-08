const express = require("express");
const router = express.Router();

const db = require("../db");

router.get("/context", async (req, res) => {
    const { id } = req.query;
    try {
        // get users current room, levers completed, and rooms entered
        // return format: {current_room: "room_name", levers_completed: [1, 2, 3], rooms_entered: [1, 2, 3]}
        const query = "";
    } catch (error) {
        console.error("ERROR: ", error);
        res.sendStatus(500);
    }
});

router.post("/current_room", async (req, res) => {
    const { id, room } = req.query;
    try {
        const query = {
            text: "UPDATE current_room SET room_id = (select id from rooms where name = $1) WHERE user_id = $2 RETURNING *",
            values: [room, id],
        };
        const response = await db.query(query);
        res.json(response.rows);
    } catch (error) {
        console.error("ERROR: ", error);
        res.sendStatus(500);
    }
});

router.post("/entered_room", async (req, res) => {
    const { id, room } = req.query;
    try {
        const query = {
            text: "INSERT INTO rooms_entered (room_id, user_id) VALUES ((select id from rooms where name = $1), $2) RETURNING *",
            values: [room, id],
        };
        const response = await db.query(query);
        res.json(response.rows);
    } catch (error) {
        console.error("ERROR: ", error);
        res.sendStatus(500);
    }
});

router.post("/lever_completed", async (req, res) => {
    const { id, lever_id } = req.query;
    try {
        const query = {
            text: "INSERT INTO levers_completed VALUES ($1, $2) RETURNING *",
            values: [lever_id, id],
        };
    } catch (error) {
        console.error("ERROR: ", error);
        res.sendStatus(500);
    }
});

module.exports = router;
