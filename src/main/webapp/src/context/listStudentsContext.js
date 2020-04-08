import React from 'react'

const studentsContext = React.createContext({students: [], edit: (index)=>{}});

export default studentsContext;