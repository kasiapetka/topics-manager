import React from 'react'
import Student from "../components/Lists/ListStudents/Student";

const personsContext = React.createContext({
    persons: [],
    edit: (album)=>{},
    delete: (index)=>{},
    change: (event)=>{},
    search:'',
    condition:'',
    conditionChange: (event)=>{},
    personRole:'',
    addStudentToSection: false,
    addToSection: (index)=>{},
    removeFromSection: (index)=>{},
});

export default personsContext;