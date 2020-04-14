import React, {Component} from 'react';
import PageNavbar from "../../components/UI/Layout/PageNavbar";
import AccountDetailsCard from "../../components/UI/AccountDetailsCard/AccountDetailsCard";
import auth from '../../Auth'
import {Alert} from "reactstrap";
import ListStudentSectionsComponent from "../../components/Pages/StudentPages/ListStudentSections/ListStudentSections";
import Messages from "../../components/Messages/Messages";
import axios from 'axios'

class StudentPage extends Component {


    state = {
        student: '',
        error: false
    };

    componentDidMount() {

        const request = {
            headers: {
                'Authorization': 'Bearer ' + auth.getToken(),
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        };

        axios.get('/api/student/info',request).then(response => {
            if (response.status !== 200) {
                this.setState({error: true})
            } else {
                let student = {...response.data};
                this.setState({student: student})
            }
        })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    render() {

        if (this.state.error) {
            return (
                <Alert color="danger">
                    Server Error, Please Try Again.
                </Alert>
            )
        }

        return (
            <React.Fragment>
                <PageNavbar/>
                <div className="container-fluid h-100 mt-5">
                    <div className="row h-100">
                        <div className="col-md-3">
                            <AccountDetailsCard
                                person={this.state.student}/>
                            <Messages/>
                        </div>
                        <div className="col-md-8 border-right">
                            <ListStudentSectionsComponent/>
                        </div>
                        <div className="col-md-1"></div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default StudentPage;