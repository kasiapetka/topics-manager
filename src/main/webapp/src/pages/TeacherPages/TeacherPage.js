import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import PageNavbar from "../../components/PageNavbar";
import {Badge} from "reactstrap";

class StudentPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>
                <PageNavbar/>
                <div> I am a teacher </div>
            </div>
        );
    }
}

export default StudentPage;