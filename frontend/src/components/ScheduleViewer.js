import WeeklyCalendar from "./WeeklyCalendar"

function ScheduleViewer({
  schedules,
  favoriteSchedules,
  onToggleFavorite,
  onEmailSchedule,
  term,
  courseCount,
  generationInfo,
}) {
  const favoriteCount = Array.from(favoriteSchedules).length

  return (
    <div className="card">
      <div className="card-header">
        <div className="schedule-header">
          <div>
            <h2 className="card-title">✅ Generated {courseCount}-Course Weekly Schedules</h2>
            <p className="card-description">
              Found {schedules.length} valid {courseCount}-course schedule{schedules.length !== 1 ? "s" : ""} for {term}{" "}
              term
              {generationInfo && (
                <span className="generation-stats"> (from {generationInfo.totalGenerated} possible combinations)</span>
              )}
            </p>
          </div>
          {favoriteCount > 0 && (
            <span className="badge badge-secondary">
              {favoriteCount} favorite{favoriteCount !== 1 ? "s" : ""}
            </span>
          )}
        </div>
      </div>
      <div className="card-content">
        <div className="schedules-grid">
          {schedules.map((schedule, index) => (
            <WeeklyCalendar
              key={index}
              schedule={schedule}
              scheduleIndex={index}
              isFavorite={favoriteSchedules.has(index)}
              onToggleFavorite={() => onToggleFavorite(index)}
              onEmailSchedule={() => onEmailSchedule(schedule, index)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ScheduleViewer
