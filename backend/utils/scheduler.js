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

function generateCombinations(courses, count) {
    if (count === 0) return [[]]
    if (courses.length === 0 || count > courses.length) return []

    const combinations = []

    for (let i = 0; i <= courses.length - count; i++) {
        const current = courses[i]
        const remaining = courses.slice(i + 1)
        const subCombinations = generateCombinations(remaining, count - 1)

        for (const subCombination of subCombinations) {
            combinations.push([current, ...subCombination])
        }
    }

    return combinations
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

function generateSchedules(courses, desiredCourseCount, term) {
    const mandatoryCourses = courses.filter((course) => course.mandatory)
    const optionalCourses = courses.filter((course) => !course.mandatory)

    // validate inputs
    if (desiredCourseCount < mandatoryCourses.length) {
        return {
           schedules: [],
           totalGenerated: 0,
           validCount: 0,
           error: `cannot create ${desiredCourseCount}-course schedules with 
           ${mandatoryCourses.length} mandatory courses}`,
        }
    }

    // I think this never happens because the "generate schedules" button will not appear
    if (desiredCourseCount > courses.length) {
        return {
            schedules: [],
            totalGenerated: 0,
            validCount: 0,
            error: `cannot create ${desiredCourseCount}-course schedules from
            only ${courses.length} available courses`,
        }
    }

    // check if mandatory courses conflict with eachother
    if (mandatoryCourses.length > 0 && !validateSchedule(mandatoryCourses)) {
        return {
            schedules: [],
            totalGenerated: 0,
            validCount: 0,
            error: "Mandatory courses have conflicts with each other",
        }
    }

    let validSchedules = []
    let totalGenerated = 0

    // calculate how many optional courses we need 
    const optionalCoursesNeeded = desiredCourseCount - mandatoryCourses.length

    if (optionalCoursesNeeded === 0) {
        // only mandatory courses needed 
        totalGenerated = 1
        validSchedules = [
            {
                courses: mandatoryCourses,
            },
        ]
    // this else if block may not be needed, isn't there always enough optional courses?
    } else if (optionalCoursesNeeded > optionalCourses.length) { 
        // not enough optional courses available
        return {
            schedules: [],
            totalGenerated: 0,
            validCount: 0,
            error: `Need ${optionalCoursesNeeded} optional courses but 
            there are only ${optionalCourses.length} available`,
        }
    } else {
        // generate combinations of optional courses
        const optionalCombinations = generateCombinations(optionalCourses, optionalCoursesNeeded)
        totalGenerated = optionalCombinations.length

        for (const optionalCombination of optionalCombinations) {
            // combine mandatory courses with this optional courses combination
            fullSchedule = [...mandatoryCourses, ...optionalCombination]

            // validate complete schedule
            if (validateSchedule(fullSchedule)) {
                validSchedules.push({ courses: fullSchedule, })
            }
        }
    }

    return {
        schedules: validSchedules,
        totalGenerated,  // this isn't necessarily all valid schedules, just schedules in general
        validCount: validSchedules.length, 
        term: term,  // not sure I need this yet, may be useful in the future 
    }
}

module.exports = {
    generateSchedules,
    timeToMinutes,
    hasTimeConflict,
    validateSchedule,
  }