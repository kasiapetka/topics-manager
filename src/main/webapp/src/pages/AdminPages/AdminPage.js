import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import PageNavbar from "../../components/PageNavbar";
import {Badge} from "reactstrap";

class AdminPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>
                <PageNavbar/>
                <div> I am a admin </div>
            </div>
        );
    }
}

export default AdminPage;