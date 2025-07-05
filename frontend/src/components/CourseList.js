import CourseItem from "./CourseItem"

function CourseList({ courses, onEditCourse, onDeleteCourse }) {
    if (courses.length === 0) {
        return null
    }

    return (
        <div className="card">
            <div className="card-header">
                <h2 className="card-title">Added Courses ({courses.length})</h2>
                <p className="card-description">
                    Review your courses below. You can edit or delete any course before
                    generating schedules.
                </p>
            </div>
            <div className="card-content">
                <div className="course-list">
                    {courses.map((course) => (
                        <CourseItem 
                        key={course.id}
                        course={course}
                        onEdit={() => onEditCourse(course)}
                        onDelete={() => onDeleteCourse(course.id)} 
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CourseList