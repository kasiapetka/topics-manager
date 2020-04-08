import React,{Component} from 'react';
import auth from "../../Auth";
import {Badge,Alert} from "reactstrap";
import EditAccountInputs from "../../components/forms/EditAccountInputs";
import classes from "./forms.module.css"
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
        this.emptyPerson.email = props.email;

        this.state = {
            person: this.emptyPerson,
            token: props.token,
            serverError: false,
            changed: false,
            passwordChanged: false,
            wrongPassword: false,
            emailChanged: false,
            wrongEmail: false,
            path: props.path,
            adminTeacherEdition: props.adminTeacherEdition
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    createRequest=()=> {
        let user = {...this.state.person};
        let token = this.state.token;
        return (
            {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
            }
        )
    };

     componentDidMount=async()=> {
        if(!this.state.changed) {
            const request = this.createRequest();

            fetch(this.props.path, request).then(async response => {
                const data = await response.json();

                if (!response.ok) {
                    this.setState({serverError: true});
                } else {
                    let person = {...data};
                    this.setState({person: person});
                    console.log(this.state.person)
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
        let person = {...this.state.person};
        person[name] = value;
        this.setState({person: person});
        this.setState({changed: true});
    };

    handleSubmit= async(event) => {
            event.preventDefault();
            this.setState({
                wrongEmail: false,
                wrongPassword: false
            });

            const request = this.createRequest();
            let user = {...this.state.person};

            fetch(this.props.path, request).then(async response => {
                const data = await response.json();

                if (!response.ok) {
                    if (response.status === 406) {
                        this.setState({wrongPassword: true});
                    } else if (response.status === 409) {
                        this.setState({wrongEmail: true});
                    } else this.setState({serverError: true});
                } else {
                    console.log(data);

                    let person = {...data};
                    this.setState({person: person});

                    this.setState({person: person});
                    if (data.email !== user.email) {
                        this.setState({emailChanged: true});
                    }
                    if (data !== user) {
                        this.setState({passwordChanged: true});
                    }
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

        let credentialsChangedSuccess;
        const classNames = "border rounded pt-4 pb-4 mt-5 pr-3 pl-3 mb-3 " + classes.formStyle;

        if (serverError) {
            return (
                <div className={classNames}>
                    <Alert color="danger">
                        Server Error, Please Try Again.
                    </Alert>
                </div>
            )
        }

        if (emailChanged && !this.state.adminTeacherEdition) {
            auth.logout();
            return (
                <Redirect to='/login'/>
            )
        }

        if (passwordChanged && this.state.adminTeacherEdition) {
            credentialsChangedSuccess = (<Badge color="success" className="col-12 pt-2 pb-2 pl-2 pr-2 mt-4">
                Credentails Changed</Badge>)
        }

        if (passwordChanged && !this.state.adminTeacherEdition) {
            credentialsChangedSuccess = (
                <Badge color="success" className="col-12 pt-2 pb-2 pl-2 pr-2 mt-4">
                    Password Changed</Badge>
            )
        }

        return (
            <div className={classNames}>
                <EditAccountInputs
                        credentialsChangedSuccess={credentialsChangedSuccess}
                        submit={this.handleSubmit}
                        change={this.handleChange}
                        person={person}
                        role={auth.getRole()}
                        credsChanged={this.state.changed}
                        wrongPassword={this.state.wrongPassword}
                        wrongEmail={this.state.wrongEmail}
                        adminTeacherEdition={this.state.adminTeacherEdition}/>
            </div>
        );
    }
};

export default EditAccount;