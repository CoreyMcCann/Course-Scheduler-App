import { useState } from 'react';
import { useCourseManager } from './hooks/useCourseManager';
import CourseInputForm from "./components/CourseInputForm";
import './App.css';


function App() {
  const [selectedTerm, setSelectedTerm] = useState("Fall");
  const [courseCount, setCourseCount] = useState(5);
  const [schedules, setSchedules] = useState([]);

  const { courses, addCourse, updateCourse, deleteCourse, editingCourse, setEditingCourse } = useCourseManager();

  return (
    <CourseInputForm
      onAddCourse={addCourse}
      onUpdateCourse={updateCourse}
      editingCourse={editingCourse}
      setEditingCourse={setEditingCourse}
    />
  );
}

export default App;
