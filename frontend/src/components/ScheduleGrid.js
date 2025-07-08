function ScheduleGrid({ schedule, scheduleIndex, isFavorite, onToggleFavorite, onEmailSchedule }) {
    const formatTime = (time) => {
        const [hours, minutes] = time.split(":")
        const hour = Number.parseInt(hours)
        const ampm = hour >= 12 ? "PM" : "AM"
        const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour
        return `${displayHour}:${minutes} ${ampm}`
    }

    const sortedCourses = [...schedule.courses].sort((a, b) => {
        return a.startTime.localeCompare(b.startTime)
    })

    return (
        <div className={`schedule-card ${isFavorite ? "Favourite" : ""}`}>
            <div className="schedule-header">
                <h3 className="schedule-title">Schedule {scheduleIndex + 1}</h3>
                <div className="schedule-actions">
                    <button className={`btn btn-sm ${isFavorite ? "btn-primary" : "btn-outline"}`}
                        onClick={onToggleFavorite}
                    >
                        {isFavorite ? "❤️ Favourited" : "🤍 Favourite"}
                    </button>
                    <button className="btn btn-outline btn-sm" onClick={onEmailSchedule}>📧 Email</button>
                </div>
            </div>

            <div className="schedule-content">
                {sortedCourses.map((course, courseIndex) => (
                    <div key={courseIndex} className="schedule-course">
                        <div className="course-main">
                            <div className="course-title-row">
                                <span className="course-code">{course.courseCode}</span>
                                {course.section && <span className="badge badge-outline">{course.section}</span>}
                                {course.type && <span className="badge badge-secondary">{course.type}</span>}
                                {course.mandatory && <span className="badge badge-primary">Mandatory</span>}
                            </div>
                            <div className="course-details-row">
                                <div className="detail-item">
                                    <span className="icon">🕒</span>
                                    {formatTime(course.startTime)} - {formatTime(course.endTime)}
                                </div>
                                {course.instructor && (
                                    <div className="detail-item">
                                        <span className="icon">👨‍🏫</span>
                                        {course.instructor}
                                    </div>
                                )}
                                {course.location && (
                                    <div className="detail-item">
                                        <span className="icon">📍</span>
                                        {course.location}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ScheduleGrid