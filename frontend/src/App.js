import { useState } from 'react';
import { useCourseManager } from './hooks/useCourseManager';
import CourseInputForm from "./components/CourseInputForm";
import CourseSelectionForm from "./components/CourseSelectionForm";
import CourseList from "./components/CourseList";
import { generateSchedules } from "./utils/api";
import GenerateSchedulesButton from "./components/GenerateSchedulesButton";
import ScheduleViewer from "./components/ScheduleViewer";
import EmailScheduleModal from "./components/EmailScheduleModal";
import Header from "./components/Header";
import Footer from "./components/Footer";
import './App.css';


function App() {
  const [selectedTerm, setSelectedTerm] = useState("Fall");
  const [courseCount, setCourseCount] = useState(5);
  const [schedules, setSchedules] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [favoriteSchedules, setFavoriteSchedules] = useState(new Set());
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [selectedScheduleForEmail, setSelectedScheduleForEmail] = useState(null);
  const [error, setError] = useState(null);
  const [generationInfo, setGenerationInfo] = useState(null);
  const [hasGeneratedSchedules, setHasGeneratedSchedules] = useState(false);

  const { courses, addCourse, updateCourse, deleteCourse, editingCourse, setEditingCourse } = useCourseManager();

  const handleGenerateSchedules = async () => {
    if (courses.length < courseCount) return

    setIsGenerating(true)
    setError(null)
    setSchedules([])
    setFavoriteSchedules(new Set())
    setGenerationInfo(null)
    setHasGeneratedSchedules(false)

    try {
      const data = await generateSchedules(courses, courseCount, selectedTerm)
      setSchedules(data.schedules)
      // the following is added
      setGenerationInfo({
        totalGenerated: data.totalGenerated,
        validCount: data.validCount,
        courseCount,
        totalCourses: courses.length,
      })
      setHasGeneratedSchedules(true)
      // eventually I will track analytics here

    } catch (error) {
      console.error("Error generating schedules: ", error)
      setError(error.message || "Failed to generate schedules. Please try again.")
      setHasGeneratedSchedules(false)
    } finally {
      setIsGenerating(false)
    }
  }

  const toggleFavorite = (scheduleIndex) => {
    const newFavorites = new Set(favoriteSchedules)
    if (newFavorites.has(scheduleIndex)) {
      newFavorites.delete(scheduleIndex)
    } else {
      newFavorites.add(scheduleIndex)
    }
    setFavoriteSchedules(newFavorites)
  }

  const handleEmailSchedule = (schedule, index) => {
    setSelectedScheduleForEmail({ schedule, index})
    setShowEmailModal(true)
  }

  const handleAddCourse = (courseData) => {
    addCourse(courseData)
    setSchedules([])
    setError(null)
    setGenerationInfo(null)
    setFavoriteSchedules(new Set())
    setHasGeneratedSchedules(false)
  }

  const handleUpdateCourse = (id, courseData) => {
    updateCourse(id, courseData)
    setSchedules([])
    setError(null)
    setGenerationInfo(null)
    setFavoriteSchedules(new Set())
    setHasGeneratedSchedules(false)
  }

  const handleDeleteCourse = (id) => {
    deleteCourse(id)
    setSchedules([])
    setError(null)
    setGenerationInfo(null)
    setFavoriteSchedules(new Set())
    setHasGeneratedSchedules(false)
  }

  return (
    <div className="app">
      <Header />

      <main className="main-content">
        <div className="layout-grid">
          {/* Left Column - Input Forms */}
          <div className="left-column">
            <CourseSelectionForm 
              selectedTerm={selectedTerm}
              setSelectedTerm={setSelectedTerm}
              courseCount={courseCount}
              setCourseCount={setCourseCount}
            />

            <CourseInputForm
              onAddCourse={handleAddCourse}
              onUpdateCourse={handleUpdateCourse}
              editingCourse={editingCourse}
              setEditingCourse={setEditingCourse}
            />
          </div>
          {/* Right Column - Course List and Generate Button */}
          <div className="right-column">
            <CourseList 
              courses={courses}
              onEditCourse={setEditingCourse}
              onDeleteCourse={handleDeleteCourse}        
            />

            {courses.length >= courseCount && (
              <GenerateSchedulesButton 
                onGenerate={handleGenerateSchedules}
                isGenerating={isGenerating}
                courseCount={courseCount}
                totalCourses={courses.length}
                hasGeneratedSchedules={hasGeneratedSchedules}
              />
            )}
          </div>
        </div>
        
        {/* Full Width Results Section */}
        <div className="results-section">
          {error && (
            <div className="card error-card">
              <div className="card-content">
                <div className="error-content">
                  <h3 className="error-title">⚠️ Schedule Generation Failed</h3>
                  <p className="error-message">{error}</p>
                  <div className="error-suggestions">
                    <p>
                      <strong>Suggestions:</strong>
                    </p>
                    <ul>
                      <li>Check for time conflicts between courses</li>
                      <li>Ensure mandatory courses don't conflict with each other</li>
                      <li>verify you have enough courses for the desired shedule size</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {generationInfo && schedules.length === 0 && !error && (
            <div className="card info-card">
              <div className="card-content">
                <div className="info-content">
                  <h3 className="info-title">Generation Results</h3>
                  <p className="info-message">
                    Generated {generationInfo.totalGenerated} possible {generationInfo.courseCount}-course
                    combinations from {generationInfo.totalCourses} courses, but none were valid due to time conflicts
                  </p>
                  <div className="info-suggestions">
                    <p>
                      <strong>Try:</strong>
                    </p>
                    <ul>
                      <li>Adjusting course times to avoid overlaps</li>
                      <li>Removing conflicting courses</li>
                      <li>Choosing a different number of courses per schedule</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {schedules.length > 0 && (
            <ScheduleViewer 
              schedules={schedules}
              favoriteSchedules={favoriteSchedules}
              onToggleFavorite={toggleFavorite}
              onEmailSchedule={handleEmailSchedule}
              term={selectedTerm}
              courseCount={courseCount}
              generationInfo={generationInfo}
            />
          )}
        </div>
        
        {showEmailModal && (
          <EmailScheduleModal 
            onClose={() => setShowEmailModal(false)}
            schedule={selectedScheduleForEmail}
            term={selectedTerm}
          />
        )}

      </main>

      <Footer /> 
    </div> 
  );
}

export default App;
