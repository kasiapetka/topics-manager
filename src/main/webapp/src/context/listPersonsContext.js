import React from 'react'

const personsContext = React.createContext({
    persons: [],
    edit: (album)=>{},
    delete: (index)=>{},
    change: (event)=>{},
    search:'',
    condition:'',
    conditionChange: (event)=>{},
    personRole:'',
    addStudentsToSection: false,
    addToSection: (index)=>{},
    removeFromSection: (index)=>{},
});

export default personsContext;