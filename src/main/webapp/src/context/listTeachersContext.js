import React from 'react'

const teachersContext = React.createContext({
    teachers: [],
    edit: (index)=>{},
    change: (index)=>{},
    search:'',
    condition:'',
    conditionChange: (index)=>{},
});

export default teachersContext;