import { useState } from 'react';
import { useCourseManager } from './hooks/useCourseManager';
import CourseInputForm from "./components/CourseInputForm";
import CourseSelectionForm from "./components/CourseSelectionForm";
import CourseList from "./components/CourseList";
import { generateSchedules } from "./utils/api"
import './App.css';


function App() {
  const [selectedTerm, setSelectedTerm] = useState("Fall");
  const [courseCount, setCourseCount] = useState(5);
  const [schedules, setSchedules] = useState([]);

  const { courses, addCourse, updateCourse, deleteCourse, editingCourse, setEditingCourse } = useCourseManager();

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

      </main>
    </div> 
  );
}

export default App;
