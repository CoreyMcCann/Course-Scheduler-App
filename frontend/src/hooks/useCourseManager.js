import { useState } from "react";

export function useCourseManager() {
    const [courses, setCourses] = useState([]);
    const [editingCourse, setEditingCourse] = useState(null);

    const addCourse = (courseData) => {
        const newCourse = {
            ...courseData,
            id: Date.now().toString(),
        }
        setCourses((prev) => [...prev, newCourse]);
    }

    const updateCourse = (id, updatedCourseData) => {
        setCourses((prev) => prev.map((course) => (course.id 
        === id ? {...updatedCourseData, id} : course)));
    }

    const deleteCourse = (id) => {
        setCourses((prev) => prev.filter((course) => course.id !== id));
    }

    return {
        courses,
        addCourse,
        updateCourse,
        deleteCourse,
        editingCourse,
        setEditingCourse,
    }
}