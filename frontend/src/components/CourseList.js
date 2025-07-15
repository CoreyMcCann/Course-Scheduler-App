import CourseItem from "./CourseItem"

function CourseList({ courses, onEditCourse, onDeleteCourse }) {

    return (
        <div className="card course-list-card">
            <div className="card-header">
                <h2 className="card-title">Added Courses ({courses.length})</h2>
                {courses.length === 0 ? (
                    <p className="card-description">
                        No courses added yet. Use the form on the
                        left to add courses
                    </p>
                ) : (
                    <p className="card-description">
                        Review your courses below. You can edit or delete any course before
                        generating schedules.
                    </p>
                )}
            </div>
            <div className="card-content">
                {courses.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-icon">📚</div>
                        <p className="empty-text">Start by adding your first course</p>
                    </div> 
                ) : (
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
                )}               
            </div>
        </div>
    )
}

export default CourseList