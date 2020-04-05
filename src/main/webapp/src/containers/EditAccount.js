import React,{Component} from 'react';
import auth from "../Auth";
import {Button, Form, FormGroup, Input, Label, Badge,Alert} from "reactstrap";
import EditAccountInputs from "../components/EditAccountInputs";
import classes from "../css/containers.module.css"
import {Redirect} from "react-router-dom";

class EditAccount extends Component {

    emptyPerson = {
        email: '',
        password: '',
        newEmail:'',
        newPassword: '',
        name:'',
        surname:''
    };

    constructor(props) {
        super(props);
        let token = auth.getToken();
        this.emptyPerson.email = auth.parseJwt(token).sub;
        let path;
        if(auth.getRole()==='S')
            path='/api/student/modify';
        if(auth.getRole()==='T')
            path='/api/teacher/modify';
        if(auth.getRole()==='A')
            path='/api/admin/modify';

        this.state = {
            person: this.emptyPerson,
            token: token,
            serverError: false,
            changed: false,
            passwordChanged: false,
            emailChanged: false,
            path: path,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

     componentDidMount=async()=> {
        if(!this.state.changed) {
            let user={...this.state.person}

            const request = {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + this.state.token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
            };

            fetch(this.state.path, request).then(async response => {
                const data = await response.json();

                if (!response.ok) {
                    this.setState({serverError: true});
                } else {
                    console.log(data);
                        let person = {
                            email: data.email,
                            password: data.password,
                            newEmail: "",
                            newPassword: "",
                            name: data.name,
                            surname: data.surname,
                        };
                        console.log(data)
                        this.setState({person: person});
                    }
            })
                .catch(error => {
                    this.setState({errorMessage: error});
                    console.error('There was an error!', error);
                });
        }
     };

    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let person = {
            email: this.state.person.email,
            password: this.state.person.password,
            newEmail: this.state.person.newEmail,
            newPassword: this.state.person.newPassword,
            name: data.name,
            surname: data.surname,
        };
        person[name] = value;
        console.log(person)
        this.setState({person});
        this.setState({changed: true});
    };

    handleSubmit= async(event) => {
        event.preventDefault();
        let user=[...this.state.person]

        const request = {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + this.state.token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        };

        fetch(this.state.path, request).then(async response => {
            const data = await response.json();

            if (!response.ok) {
                this.setState({serverError: true});
            } else {
                console.log(data);

                    let person = {
                        email: data.email,
                        password: data.password,
                        newEmail: "",
                        newPassword: "",
                        name: data.name,
                        surname: data.surname,
                    };

                    if (data.password !== user.password) {
                        this.setState({passwordChanged: true});
                    }
                    if (data.email !== user.email) {
                        auth.logout();
                        this.setState({emailChanged: true});
                    }
                this.setState({person: person});
                }


        })
            .catch(error => {
                this.setState({errorMessage: error});
                console.error('There was an error!', error);
            });
    };

    render() {
        const {person} = this.state;
        const serverError = this.state.serverError;
        const passwordChanged = this.state.passwordChanged;
        const emailChanged  = this.state.emailChanged;

        let passwordChangedSuccess;
        const classNames = "border rounded pt-4 pb-5 mt-5 pr-3 pl-3 " + classes.formStyle;

        if (serverError) {
            return (
                <div className={classNames}>
                    <Alert color="danger">
                        Server Error, Please Try Again.
                    </Alert>
                </div>
            )
        }

        if (emailChanged) {
            return (
                <Redirect to='/login'/>
            )
        }

        if (passwordChanged) {
            passwordChangedSuccess = (
                <Badge color="success" className="col-12 pt-2 pb-2 pl-2 pr-2 mt-4" pill>
                    Password Changed</Badge>
            )
        }

        return (
            <div className={classNames}>
                <EditAccountInputs
                        passwordChangedSuccess={passwordChangedSuccess}
                        submit={this.handleSubmit}
                        change={this.handleChange}
                        person={person}
                        role={auth.getRole()}/>
            </div>
        );
    }
};

export default EditAccount;