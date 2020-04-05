import React , {Component} from 'react';
import {Link} from 'react-router-dom';
import PageNavbar from "../../components/PageNavbar";
import {Button} from "reactstrap";
import AccountDetailsCard from "../../components/AccountDetailsCard";
import auth from '../../Auth'
import {Badge,Alert} from "reactstrap";

class StudentPage extends Component {

    constructor(props){
        super(props)
        this.state = {
            student: '',
            error: false
        };
    }

    componentDidMount() {
        console.log("useEffect")
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
                console.log("ififi")
                this.setState({error:true})
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

        if(this.state.error){
            return (
                <Alert color="danger">
                Server Error, Please Try Again.
            </Alert>
            )
        }
        
        return (
            <div>
                <PageNavbar/>
                <div> I am a student</div>
                <AccountDetailsCard
                    person={student}/>
            </div>
        );
    }
}
export default StudentPage;