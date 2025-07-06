const express = require("express");
const { generateSchedules } = require("../utils/scheduler")

const router = express.Router()

router.post("/", async (req, res) => {
    try {
        const { courses, desiredCourseCount, term } = req.body

        if (!courses || !Array.isArray(courses)) {
            return res.status(400).json({ error: "Invalid courses data"})
        }

        if (!desiredCourseCount || desiredCourseCount < 2) {
            return res.status(400).json({ error: "Invalid desired course count" })
        }

        const result = generateSchedules(courses, desiredCourseCount, term)

        if (result.error) {
            return res.status(400).json(result)
        }

        res.json({
            schedules: result.schedules,
            totalGenerated: result.totalGenerated,
            validCount: result.validCount,
            term: result.term,
        })

    } catch (error) {
        console.error("error generating schedules: ", error)
        res.status(500).json({ error: "internal server error"})
    }
})

module.exports = router


