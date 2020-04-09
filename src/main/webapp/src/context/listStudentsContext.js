import React from 'react'

const studentsContext = React.createContext({students: [], editStudent: (index)=>{}});

export default studentsContext;