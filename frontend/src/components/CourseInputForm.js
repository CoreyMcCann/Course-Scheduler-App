import { useState, useEffect } from 'react';

function CourseInputForm({ onAddCourse, onUpdateCourse, editingCourse, setEditingCourse }) {
    const [formData, setFormData] = useState({
        courseCode: "",
        startTime: "",
        endTime: "",
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
                startTime: editingCourse.startTime,
                endTime: editingCourse.endTime,
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

        if (!formData.courseCode || !formData.startTime || !formData.endTime) {
            return
        }

        const courseData = {
            courseCode : formData.courseCode,
            startTime: formData.startTime,
            endTime: formData.endTime,
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
            startTime: "",
            endTime: "",
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
            startTime: "",
            endTime: "",
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

    return (
        <div className="cord">
            <div className="card-header">
                <h2 className="card-title">{editingCourse ? "Edit Course" : "Add Course"}</h2>
                <p className="card-description">Enter the course details. Course code, 
                    start time, and end time are required.
                </p>
            </div>
            <div className="card-content">
                <form onSubmit={handleSubmit} className="course-form">

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

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="startTime">Start Time *</label>
                            <input 
                                id="startTime"
                                type="time"
                                value={formData.startTime}
                                onChange={(e) => handleInputChange("startTime", e.target.value)}
                                required
                                className="input"
                            />  
                        </div>

                        <div className="form-group">
                            <label htmlFor="endTime">End Time *</label>
                            <input 
                                id="endTime"
                                type="time"
                                value={formData.endTime}
                                onChange={(e) => handleInputChange("endTime", e.target.value)}
                                required
                                className="input"
                            />  
                        </div>
                    </div>

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