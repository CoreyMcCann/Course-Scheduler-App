const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5001/api"

export async function generateSchedules(courses, desiredCourseCount, selectedTerm) {
    const response = await fetch(`${API_BASE_URL}/schedule`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ courses, desiredCourseCount, selectedTerm }),
    })

    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to generate schedules")
    }
    return response.json()
}