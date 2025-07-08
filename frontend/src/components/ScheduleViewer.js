import ScheduleGrid from "./ScheduleGrid"

function ScheduleViewer({ schedules, favoriteSchedules, onToggleFavorite, onEmailSchedule, term, courseCount }) {
    const favoriteCount = favoriteSchedules.size

    return (
        <div className="card">
            <div className="card-header">
                <div className="schedule-header">
                    <div>
                        <h2 className="card-title">Generated {courseCount}-Course Schedules</h2>
                        <p className="card-description">
                            Found {schedules.length} valid {courseCount}-course schedule
                            {schedules.length !== 1 ? "s" : ""} for {term} term
                        </p>
                    </div>
                    {favoriteCount > 0 && (
                        <span className="badge badge-secondary">
                            {favoriteCount} favourite{favoriteCount !== 1 ? "s" : ""}
                        </span>
                    )}
                </div>
            </div>
            <div className="card-content">
                {schedules.length === 0 ? (
                    <div className="no-schedules">
                        <p>
                            No valid {courseCount}-course schedules found. Try adjusting your optional courses
                            to avoid conflicts.
                        </p>
                    </div>
                ) : (
                   <div className="schedules-grid">
                        {schedules.map((schedule, index) => (
                            <ScheduleGrid 
                                key={index}
                                schedule={schedule}
                                scheduleIndex={index}
                                isFavorite={favoriteSchedules.has(index)}
                                onToggleFavorite={() => onToggleFavorite(index)}
                                onEmailSchedule={() => onEmailSchedule(schedule, index)}
                            />
                        ))}
                   </div> 
                )}
            </div>
        </div>        
    )
}

export default ScheduleViewer