import React from 'react'

const studentsContext = React.createContext({
    students: [],
    edit: (index)=>{},
    change: (event)=>{},
    search:'',
    condition:'',
    conditionChange: (event)=>{},
});

export default studentsContext;