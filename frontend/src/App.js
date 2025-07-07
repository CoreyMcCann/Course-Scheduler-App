import { useState } from 'react';
import { useCourseManager } from './hooks/useCourseManager';
import CourseInputForm from "./components/CourseInputForm";
import CourseSelectionForm from "./components/CourseSelectionForm";
import CourseList from "./components/CourseList";
import { generateSchedules } from "./utils/api";
import GenerateSchedulesButton from "./components/GenerateSchedulesButton";
import './App.css';


function App() {
  const [selectedTerm, setSelectedTerm] = useState("Fall");
  const [courseCount, setCourseCount] = useState(5);
  const [schedules, setSchedules] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const { courses, addCourse, updateCourse, deleteCourse, editingCourse, setEditingCourse } = useCourseManager();

  const handleGenerateSchedules = async () => {
    if (courses.length < courseCount) return

    setIsGenerating(true)
    try {
      const data = await generateSchedules(courses, courseCount, selectedTerm)
      setSchedules(data.schedules)

      // eventually I will track analytics here
    } catch (error) {
      console.error("Error generating schedules: ", error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="app">
      <main className="main-content">
        <CourseSelectionForm 
          selectedTerm={selectedTerm}
          setSelectedTerm={setSelectedTerm}
          courseCount={courseCount}
          setCourseCount={setCourseCount}
        />

        <CourseInputForm
          onAddCourse={addCourse}
          onUpdateCourse={updateCourse}
          editingCourse={editingCourse}
          setEditingCourse={setEditingCourse}
        />

        <CourseList 
          courses={courses}
          onEditCourse={setEditingCourse}
          onDeleteCourse={deleteCourse}        
        />

        {courses.length >= courseCount && (
          <GenerateSchedulesButton 
            onGenerate={handleGenerateSchedules}
            isGenerating={isGenerating}
            courseCount={courseCount}
            totalCourses={courses.length}
          />
        )}

      </main>
    </div> 
  );
}

export default App;
