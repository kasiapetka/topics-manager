import React from 'react'

const personsContext = React.createContext({
    persons: [],
    edit: (album)=>{},
    delete: (index)=>{},
    change: (event)=>{},
    search:'',
    condition:'',
    conditionChange: (event)=>{},
});

export default personsContext;