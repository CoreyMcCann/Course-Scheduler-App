function CourseSelectionForm({ selectedTerm, setSelectedTerm, courseCount, setCourseCount }) {
    return (
        <div className="card">
            <div className="card-header">
                <h2 className="card-title">Course Selection</h2>
                <p className="card-description">Choose your academic term and the number of 
                    courses you want to schedule.
                </p>
            </div>
            <div className="card-content">
                <div className="form-row">
                    <div className="form-group">
                        <label hmtlFor="term">Academic Term</label>
                        <select 
                            id="term" 
                            value={selectedTerm} 
                            onChange={(e) => setSelectedTerm(e.target.value)} 
                            className="select"
                        >
                            <option value="Fall">Fall Term</option>
                            <option value="Winter">Winter Term</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="count">Number of Courses</label>
                        <select
                            id="count"
                            value={courseCount}
                            onChange={(e) => setCourseCount(Number(e.target.value))}
                            className="select"
                        >
                            {[2, 3, 4, 5, 6, 7].map((num) => (
                                <option key={num} value={num}>{num} courses</option>
                            ))}
                        </select>
                    </div>
                </div> 
            </div>
        </div>
    )
}

export default CourseSelectionForm