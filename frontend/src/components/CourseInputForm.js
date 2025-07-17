import { useState, useEffect } from 'react';

const DAYS_OF_WEEK = [
    {value: "Mon", label: "Monday"},
    {value: "Tue", label: "Tuesday"},
    {value: "Wed", label: "Wednesday"},
    {value: "Thu", label: "Thursday"},
    {value: "Fri", label: "Friday"},
]

function CourseInputForm({ onAddCourse, onUpdateCourse, editingCourse, setEditingCourse }) {
    const [formData, setFormData] = useState({
        courseCode: "",
        meetingTimes: [{ dayOfWeek: "Mon", startTime: "", endTime: "" }],
        section: "",
        type: "",
        instructor: "",
        location: "",
        mandatory: false,
    })

    useEffect(() => {
        if (editingCourse) {
            setFormData({
                courseCode: editingCourse.courseCode,
                meetingTimes: editingCourse.meetingTimes || [{ dayOfWeek: "Mon", startTime: "", endTime: "" }],
                section: editingCourse.section || "",
                type: editingCourse.type || "",
                instructor: editingCourse.instructor || "",
                location: editingCourse.location || "",
                mandatory: editingCourse.mandatory || false,
            })
        }
    }, [editingCourse])

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!formData.courseCode || formData.meetingTimes.some((mt) => !mt.startTime || !mt.endTime)) {
            return
        }

        const courseData = {
            courseCode : formData.courseCode,
            meetingTimes: formData.meetingTimes,
            section: formData.section || undefined,
            type: formData.type || undefined,
            instructor: formData.instructor || undefined,
            location: formData.location || undefined,
            mandatory: formData.mandatory,
        }

        if (editingCourse) {
            onUpdateCourse(editingCourse.id, courseData)
            setEditingCourse(null)
        } else {
            onAddCourse(courseData)
        }

        setFormData({
            courseCode: "",
            meetingTimes: [{ dayOfWeek: "Mon", startTime: "", endTime: "" }],
            section: "",
            type: "",
            instructor: "",
            location: "",
            mandatory: false,
        })
    }

    const handleCancel = () => {
        setEditingCourse(null)
        setFormData({
            courseCode: "",
            meetingTimes: [{ dayOfWeek: "Mon", startTime: "", endTime: "" }],
            section: "",
            type: "",
            instructor: "",
            location: "",
            mandatory: false,
        })
    }

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field] : value })
    }

    const handleMeetingTimeChange = (index, field, value) => {
        const newMeetingTimes = [...formData.meetingTimes]
        newMeetingTimes[index] = { ...newMeetingTimes[index], [field]: value }
        setFormData({ ...formData, meetingTimes: newMeetingTimes })
    }

    const addMeetingTime = () => {
        setFormData({ ...formData, meetingTimes: [...formData.meetingTimes, { dayOfWeek: "Mon", startTime: "", endTime: "" }],
        })
    }

    const removeMeetingTime = (index) => {
        if (formData.meetingTimes.length > 1) {
            const newMeetingTimes = formData.meetingTimes.filter((_, i) => i !== index)
            setFormData({ ...formData, meetingTimes: newMeetingTimes })
        }
    }

    return (
        <div className="card">
            <div className="card-header">
                <h2 className="card-title">{editingCourse ? "Edit Course" : "Add Course"}</h2>
                <p className="card-description">Enter the course details and meeting times.
                    course code and at least one complete meeting time are required. 
                </p>
            </div>
            <div className="card-content">
                <form onSubmit={handleSubmit} className="course-form">
                    {/* Course Code */}
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="courseCode">Course Code *</label>
                            <input 
                                id="courseCode"
                                type="text"
                                placeholder="e.g., CISC 121"
                                value={formData.courseCode}
                                onChange={(e) => handleInputChange("courseCode", e.target.value)}
                                required
                                className="input"
                            />   
                        </div>
                    </div>

                    {/* meeting times */}
                    <div className="meeting-times-section">
                        <div className="meeting-times-header">
                            <label className="section-label">Meeting Times *</label>
                            <button type="button" className="btn btn-outline btn-sm" onClick={addMeetingTime}>+ Add Meeting Time</button>
                        </div>

                        {formData.meetingTimes.map((meetingTime, index) => (
                            <div key={index} className="meeting-time-row">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Day of Week</label>
                                        <select
                                            value={meetingTime.dayOfWeek}
                                            onChange={(e) => handleMeetingTimeChange(index, "dayOfWeek", e.target.value)}
                                            className="select"
                                        >
                                           {DAYS_OF_WEEK.map((day) => (
                                                <option key={day.value} value={day.value}>
                                                    {day.label}
                                                </option>
                                           ))}
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>Start Time</label>
                                        <input 
                                            type="time"
                                            value={meetingTime.startTime}
                                            onChange={(e) => handleMeetingTimeChange(index, "startTime", e.target.value)}
                                            required
                                            className="input"
                                        />  
                                    </div>

                                    <div className="form-group">
                                        <label>End Time</label>
                                        <input 
                                            type="time"
                                            value={meetingTime.endTime}
                                            onChange={(e) => handleMeetingTimeChange(index, "endTime", e.target.value)}
                                            required
                                            className="input"
                                        />  
                                    </div>
                                    
                                    {formData.meetingTimes.length > 1 && (
                                        <div className="form-group">
                                            <label>&nbsp;</label>
                                            <button
                                                type="button"
                                                className="btn btn-outline btn-sm remove-btn"
                                                onClick={() => removeMeetingTime(index)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* section, type */}
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="section">Section</label>
                            <input 
                                id="section"
                                type="text"
                                placeholder="e.g., 001"
                                value={formData.section}
                                onChange={(e) => handleInputChange("section", e.target.value)}
                                className="input"
                            />  
                        </div>

                        <div className="form-group">
                            <label htmlFor="type">Type</label>
                            <select
                                id="type"
                                value={formData.type}
                                onChange={(e) => handleInputChange("type", e.target.value)}
                                className="select"
                            >
                                <option value="">Select Type</option>
                                <option value="Lecture">Lecture</option>
                                <option value="Tutorial">Tutorial</option>
                                <option value="Lab">Lab</option>
                            </select>   
                        </div>
                    </div>

                    {/* instructor, building/room */}
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="instructor">Instructor</label>
                            <input 
                                id="instructor"
                                type="text"
                                placeholder="e.g., Dr. Smith"
                                value={formData.instructor}
                                onChange={(e) => handleInputChange("instructor", e.target.value)}
                                className="input"
                            />   
                        </div>

                        <div className="form-group">
                            <label htmlFor="location">Building/Room</label>
                            <input 
                                id="location"
                                type="text"
                                placeholder="e.g., Goodwin Hall 254"
                                value={formData.location}
                                onChange={(e) => handleInputChange("location", e.target.value)}
                                className="input"
                            />   
                        </div>
                    </div>

                    <div className="checkbox-group">
                        <input
                            id="mandatory"
                            type="checkbox"
                            checked={formData.mandatory}
                            onChange={(e) => handleInputChange("mandatory", e.target.checked)}
                        />
                        <label htmlFor="mandatory">Mark as mandatory (must appear in every 
                            generated schedule)
                        </label>
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn btn-primary">
                            {editingCourse ? "Update Course" : "Add Course"}
                        </button>
                        {editingCourse && (
                            <button 
                                type="button" 
                                className="btn btn-secondary" 
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>
                        )}
                    </div>  
                </form>
            </div>
        </div>   
    )
}

export default CourseInputForm