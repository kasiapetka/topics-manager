import React from 'react'

const teachersContext = React.createContext({teachers: [], edit: (index)=>{}});

export default teachersContext;