import React from 'react';
import { Link } from 'react-router-dom';

class StudentPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="col-md-6 col-md-offset-3">
               I am a student
            </div>
        );
    }
}

export default StudentPage;