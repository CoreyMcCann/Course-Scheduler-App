const express = require("express");
// const { generateSchedules } = require("../utils/scheduler")

const router = express.Router()

router.post("/", async (req, res) => {
    try {
        const { courses, term } = req.body

        if (!courses || !Array.isArray(courses)) {
            return res.status(400).json({ error : "Invalid courses data"})
        }

        // will generate schedules here a feed them into the response

    } catch (error) {
        console.error("error generating schedules: ", error)
        res.status(500).json({ error : "internal server error"})
    }
})


