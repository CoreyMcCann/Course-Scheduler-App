import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import "react-big-calendar/lib/css/react-big-calendar.css"

const localizer = momentLocalizer(moment)

function WeeklyCalendar({ schedule, scheduleIndex, isFavorite, onToggleFavorite, onEmailSchedule }) {
  // Convert course meeting times to calendar events
  const events = []
  const colors = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6", "#06b6d4", "#84cc16"]

  schedule.courses.forEach((course, courseIndex) => {
    const color = colors[courseIndex % colors.length]

    course.meetingTimes.forEach((meetingTime) => {
      // Map day names to numbers (0 = Sunday, 1 = Monday, etc.)
      const dayMap = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }
      const dayNum = dayMap[meetingTime.dayOfWeek]

      // Create a date for this week (using current week for display)
      const today = new Date()
      const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()))
      const eventDate = new Date(startOfWeek)
      eventDate.setDate(startOfWeek.getDate() + dayNum)

      // Parse times
      const [startHour, startMin] = meetingTime.startTime.split(":").map(Number)
      const [endHour, endMin] = meetingTime.endTime.split(":").map(Number)

      const startTime = new Date(eventDate)
      startTime.setHours(startHour, startMin, 0, 0)

      const endTime = new Date(eventDate)
      endTime.setHours(endHour, endMin, 0, 0)

      events.push({
        id: `${course.id}-${meetingTime.dayOfWeek}`,
        title: `${course.courseCode}${course.section ? ` (${course.section})` : ""}`,
        start: startTime,
        end: endTime,
        resource: {
          course,
          meetingTime,
          color,
          instructor: course.instructor,
          location: course.location,
          type: course.type,
        },
      })
    })
  })

  const eventStyleGetter = (event) => {
    return {
      style: {
        backgroundColor: event.resource.color,
        borderColor: event.resource.color,
        color: "white",
        fontSize: "11px",
        padding: "2px 4px",
        lineHeight: "1.1",
      },
    }
  }

  const CustomEvent = ({ event }) => {
    // create compact display with all info on fewer lines
    const parts = []

    // Line 1: course code and section
    parts.push(event.title)

    // Line 2: type and location if both exist
    const line2Parts = []
    if (event.resource.type) line2Parts.push(event.resource.type)
    if (event.resource.location) line2Parts.push(event.resource.location)
    if (line2Parts.length > 0)  parts.push(line2Parts.join(" • "))

    // Line 3: instructor if it exists
    // if (event.resource.instructor) parts.push(event.resource.instructor)
    
    return (
      <div className="calendar-event-compact">
        {parts.map((part, index) => (
          <div key={index} className="event-line">
            {part}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={`schedule-card ${isFavorite ? "favorite" : ""}`}>
      <div className="schedule-header">
        <h3 className="schedule-title">Schedule {scheduleIndex + 1}</h3>
        <div className="schedule-actions">
          <button className={`btn btn-sm ${isFavorite ? "btn-primary" : "btn-outline"}`} onClick={onToggleFavorite}>
            {isFavorite ? "❤️ Favorited" : "🤍 Favorite"}
          </button>
          <button className="btn btn-outline btn-sm" onClick={onEmailSchedule}>
            📧 Email
          </button>
        </div>
      </div>

      <div className="calendar-container">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 400 }}
          view="work_week"
          views={["work_week"]}
          toolbar={false}
          min={new Date(2023, 0, 1, 8, 0)} // 8 AM
          max={new Date(2023, 0, 1, 22, 0)} // 10 PM
          eventPropGetter={eventStyleGetter}
          components={{
            event: CustomEvent,
          }}
          formats={{
            timeGutterFormat: "h:mm A",
            eventTimeRangeFormat: ({ start, end }) =>
              `${moment(start).format("h:mm A")} - ${moment(end).format("h:mm A")}`,
          }}
        />
      </div>

      {/* Course Legend */}
      <div className="course-legend">
        <h4>Courses in this schedule:</h4>
        <div className="legend-items">
          {schedule.courses.map((course, index) => (
            <div key={index} className="legend-item">
              <div className="legend-color" style={{ backgroundColor: colors[index % colors.length] }}></div>
              <span className="legend-text">
                {course.courseCode}
                {course.section && ` (${course.section})`}
                {course.mandatory && <span className="legend-mandatory"> - Mandatory</span>}
                {course.type && ` - ${course.type}`}
                {course.instructor && ` with ${course.instructor}`}
                {course.location && ` at ${course.location}`}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WeeklyCalendar