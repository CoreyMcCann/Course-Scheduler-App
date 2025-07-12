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
    for (let i = 0; i < courses.length; i++) {
        for (let j = i + 1; j < courses.length; j++) {
            if (hasTimeConflict(courses[i], courses[j])) {
                return false
            }
        }
    }
    return true
}

function generateMandatoryGroupCombinations(mandatoryGroups) {
    if (mandatoryGroups.length === 0) return [[]]

    const [firstGroup, ...remainingGroups] = mandatoryGroups
    const remainingCombinations = generateMandatoryGroupCombinations(remainingGroups)

    const combinations = []

    // for each course in the first group
    for (const course of firstGroup) {
        // combine with each combination from remaining Groups
        for (const remainingCombination of remainingCombinations) {
            combinations.push([course, ...remainingCombination])
        }
    }
    return combinations
}

function generateSchedules(courses, desiredCourseCount, term) {
    const mandatoryCourses = courses.filter((course) => course.mandatory)
    const optionalCourses = courses.filter((course) => !course.mandatory)

    // Group mandatory courses by course code 
    const mandatoryGroups = {}
    for (const course of mandatoryCourses) {
        if (!mandatoryGroups[course.courseCode]) {
            mandatoryGroups[course.courseCode] = []
        }
        mandatoryGroups[course.courseCode].push(course)
    }

    // convert to array of groups
    const mandatoryGroupsArray = Object.values(mandatoryGroups)
    const numMandatoryGroups = mandatoryGroupsArray.length

    // validate inputs
    if (desiredCourseCount < numMandatoryGroups) {
        return {
           schedules: [],
           totalGenerated: 0,
           validCount: 0,
           error: `cannot create ${desiredCourseCount}-course schedules with 
           ${numMandatoryGroups} mandatory course groups}`,
        }
    }

    // I think this never happens because the "generate schedules" button will not appear
    if (desiredCourseCount > numMandatoryGroups + optionalCourses.length) {
        return {
            schedules: [],
            totalGenerated: 0,
            validCount: 0,
            error: `cannot create ${desiredCourseCount}-course schedules from
            only ${numMandatoryGroups} mandatory groups + ${optionalCourses.length} optional courses`,
        }
    }

    // Generate all combinations of picking one course from each mandatory group
    const mandatoryCombinations = generateMandatoryGroupCombinations(mandatoryGroupsArray)

    // check if any valid mandatory combination exists
    const validMandatoryCombinations = mandatoryCombinations.filter((combination) => validateSchedule(combination))

    if (mandatoryCombinations.length > 0 && validMandatoryCombinations.length === 0) {
        return {
            schedules: [],
            totalGenerated: 0,
            validCount: 0,
            error: "No valid combinations of mandatory courses exist - all combinations have time conflicts",
        }
    }

    let validSchedules = []
    let totalGenerated = 0

    // calculate how many optional courses we need 
    const optionalCoursesNeeded = desiredCourseCount - numMandatoryGroups

    if (optionalCoursesNeeded === 0) {
        // only mandatory courses needed 
        totalGenerated = optionalCourses.length

        for (const mandatoryCombination of mandatoryCombinations) {
            if (validateSchedule(mandatoryCombination)) {
                validSchedules.push({
                    courses: mandatoryCombination,
                })
            }
        }
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
        totalGenerated = mandatoryCombinations.legth * optionalCombinations.length

        for (const mandatoryCombination of mandatoryCombinations) {
            // first check if the mandatory combinations itself is valid
            if (!validateSchedule(mandatoryCombination)) {
                continue // skip this mandatory combination entirely
            }

            for (const optionalCombination of optionalCombinations) {
                // combine mandatory courses with this optional combination
                fullSchedule = [...mandatoryCombination, ...optionalCombination]
    
                // validate complete schedule
                if (validateSchedule(fullSchedule)) {
                    validSchedules.push({ courses: fullSchedule, })
                }
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