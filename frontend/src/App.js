import { useState } from 'react';
import { useCourseManager } from './hooks/useCourseManager';
import './App.css';


function App() {
  const [selectedTerm, setSelectedTerm] = useState("Fall");
  const [courseCount, setCourseCount] = useState(5);
  const [schedules, setSchedules] = useState([]);

  const { courses, addCourse, updateCourse, deleteCourse, editingCourse, setEditingCourse } = useCourseManager();

  return (
    <div >
     <h1>hello</h1>
    </div>
  );
}

export default App;
