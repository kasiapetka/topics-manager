import React , {Component} from 'react';
import PageNavbar from "../../components/layoutComponents/PageNavbar";
import AccountDetailsCard from "../../components/accountCard/AccountDetailsCard";
import auth from '../../Auth'
import {Alert} from "reactstrap";
import ListStudentSectionsComponent from "../../components/pages/studentPages/listStudentSections/ListStudentSectionsComponent";
import Messages from "../../components/messages/Messages";

class StudentPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            student: '',
            error: false
        };
    }

    componentDidMount() {

        const request = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + auth.getToken(),
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        };

        fetch('/api/student/info', request).then(async response => {
            const data = await response.json();
            if (response.status !== 200) {
                this.setState({error: true})
            } else {
                let student = {...data};
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