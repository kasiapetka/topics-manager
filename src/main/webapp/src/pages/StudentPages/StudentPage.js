import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import PageNavbar from "../../components/PageNavbar";
import {Badge, Button} from "reactstrap";

const StudentPage =()=> {

        return (
            <div>
                <PageNavbar/>
                <div> I am a student </div>
                <Link to="/student/modifyAccount">
                    <Button className="btn btn-primary mt-2">Modify</Button>
                </Link>
            </div>
        );
};

export default StudentPage;