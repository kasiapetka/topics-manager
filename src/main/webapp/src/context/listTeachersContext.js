import React from 'react'

const teachersContext = React.createContext({
    teachers: [],
    edit: (index)=>{},
    change: (event)=>{},
    search:'',
    condition:'',
    conditionChange: (event)=>{},
});

export default teachersContext;