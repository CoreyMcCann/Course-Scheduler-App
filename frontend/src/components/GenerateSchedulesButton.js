function GenerateSchedulesButton({ onGenerate, isGenerating, courseCount, totalCourses }) {
    return (
        <div className="card">
            <div className="card-content generate-section">
                <div className="generate-content">
                    <h3 className="generate-title">Ready to Generate Schedules</h3>
                    <p className="generate-description">
                        You have added {totalCourses} courses. click below to generate all
                        possible {courseCount}-course schedules.
                    </p>
                    <button
                        onClick={onGenerate}
                        disabled={isGenerating}
                        className="btn btn-primary btn-lg"
                    >
                        {isGenerating ? "⏳ Generating Schedules..." : `📅 Generate ${courseCount}-Course Schedules`}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default GenerateSchedulesButton