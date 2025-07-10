import { useState } from "react"

function EmailScheduleModal({ onClose, schedule, term }) {
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")

    const handleSendEmail = () => {
        if (!schedule || !email) return

        const formatTime = (time) => {
            const [hours, minutes] = time.split(":")
            const hour = Number.parseInt(hours)
            const ampm = hour >= 12 ? "PM" : "AM"
            const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour
            return `${displayHour}:${minutes} ${ampm}`
        }

        const scheduleText = schedule.schedule.courses.map((course) => {
        return `${course.courseCode}${course.section ? ` (${course.section})` : ""} 
        - ${formatTime(course.startTime)} to ${formatTime(course.endTime)}${course.location ? 
        ` at ${course.location}` : ""}${course.instructor ? ` with ${course.instructor}` : ""}`
        })
        .join("\n")

        const subject = `My ${term} Course Schedule - Queen's University`
        const body = `Here's my course schedule for the ${term} term,
        
        ${scheduleText}
        
        ${message ? `\nAdditional notes:\n${message}` : ""}

        Generated using Queen's Course Scheduler` 

        const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
        window.open(mailtoLink)

        onClose()     
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3 className="modal-title">📧 Email Schedule</h3>
                    <button className="modal-close" onClick={onClose}>×</button>
                </div>
                
                <div className="modal-body">
                    <p className="modal-description">
                        Send this schedule to an email address. This will open your default email client.
                    </p>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input 
                            id="email"
                            type="email"
                            placeholder="Enter Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="message">Additional Message (optional)</label>
                        <textarea 
                            id="message"
                            placeholder="Add any additional notes..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows={3}
                            className="text-area"
                        />
                    </div>
                </div>

                <div className="modal-footer">
                    <button 
                        className="btn btn-secondary"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button 
                        className="btn btn-primary" 
                        onClick={handleSendEmail}
                        disabled={!email}
                    >
                        Send Email                       
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EmailScheduleModal