function CourseItem({ course, onEdit, onDelete }) {
    const formatTime = (time) => {
        const [hours, minutes] = time.split(":")
        const hour = Number.parseInt(hours)
        const ampm = hour >= 12 ? "PM" : "AM"
        const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour
        return `${displayHour}:${minutes} ${ampm}`
    }

    return (
        <div className="course-item">
            <div className="course-info">
                <div className="course-header">
                    <h3 className="course-code">{course.courseCode}</h3>
                    {course.mandatory && <span className="badge badge-mandatory">Mandatory</span>}
                    {course.section && <span className="badge badge-outline">Section {course.section}</span>}
                    {course.type && <span className="badge badge-outline">{course.type}</span>}
                </div>

                <div className="course-details">
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

            <div className="course-actions">
                <button className="btn btn-outline btn-sm" onClick={onEdit}>✏️</button>
                <button className="btn btn-outline btn-sm" onClick={onDelete}>🗑️</button>
            </div>
        </div>
    )
}

export default CourseItem