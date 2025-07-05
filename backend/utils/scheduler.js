function timeToMinutes(time) {
    const [hours, minutes] = time.split(":").map(Number)
    return hours * 60 + minutes
}

function hasTimeConflict(course1, course2) {
    start1 = timeToMinutes(course1.startTime)
    end1 = timeToMinutes(course1.endTime)
    start2 = timeToMinutes(course2.startTime)
    end2 = timeToMinutes(course2.endTime)

    return !(end1 <= start2 || end2 <= start1)
}

function validateSchedule(courses) {
    for (let i = 0; i < len(courses); i++) {
        for (let j = i + 1; j < len(courses); j++) {
            if (hasTimeConflict(courses[i], courses[j])) {
                return false
            }
        }
    }
    return true
}