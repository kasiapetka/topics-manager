import React, {Component} from 'react';
import PageNavbar from "../../components/layoutComponents/PageNavbar";
import auth from "../../Auth";
import {Button} from 'reactstrap'
import ListTeachersComponent from "../../components/pages/adminPages/listTeachers/ListTeachersComponent";
import EditAccount from "../formsPages/EditAccount";
import TeachersContext from "../../context/listTeachersContext";
import Messages from "../../components/messages/Messages";

class AdminPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            teachers: [],
            error: false,
            showTeachers: true,
            search: '',
            filtered: [],
            condition: 'Email',
            editTeacher: false,
            editTeacherEmail: ''
        };
    }

    componentDidMount = () => {
        const request = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + auth.getToken(),
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        };

        fetch('/api/admin/teachers', request).then(async response => {
            const data = await response.json();
            if (response.status !== 200) {
                this.setState({error: true})
            } else {
                console.log(data)
                let teachers = [...data];
                console.log(teachers)
                this.setState({teachers: teachers});
                this.setState({filtered: teachers});
            }
        })
            .catch(error => {
                console.error('There was an error!', error);
            });
    };

    toggleTeachers = () => {

        this.setState((prevState)=>{
            return {
                showTeachers: !this.state.showTeachers,
                editTeacher: false
            }
        });
    };

    handleChange = (event) => {
        let currentList = [];
        let newList = [];
        console.log(event.target.value);
        const target = event.target;
        const value = target.value;
        let search = value;

        this.setState({search: search});

        if (value !== "") {
            currentList = this.state.teachers;

            newList = currentList.filter(teacher => {
                let lc = '';
                if (this.state.condition === 'Email' && teacher.user)
                    lc = teacher.user.email.toLowerCase();
                if (this.state.condition === 'Surname')
                    lc = teacher.surname.toLowerCase();
                if (this.state.condition === 'Name')
                    lc = teacher.name.toLowerCase();

                const filter = value.toLowerCase();
                return lc.includes(filter);
            });
        } else {
            newList = this.state.teachers;
        }
        this.setState({
            filtered: newList
        });
    };

    onTeacherEdition = (index) => {
        const teacher = this.state.filtered[index];
        if (!teacher.user)
            return;

        console.log(" id "+ index)

        this.setState({
            showTeachers: false
        });
        this.setState({
            editTeacher: true
        });
        this.setState({editTeacherEmail: teacher.user.email})
    };

    onConditionChanged = (event) => {
        this.setState({
            condition: event.currentTarget.value
        });
        this.setState({
            filtered: this.state.teachers
        });
        this.setState({
            search: ''
        });
    };

    render() {
        return (
            <React.Fragment>
                <PageNavbar/>
                <div className="container-fluid h-100 mt-5">
                    <div className="row h-100">
                        <div className="col-md-2 border-right">
                            <p>Admin Options:</p>
                            <Button className="ml-5" onClick={this.toggleTeachers} outline>List Teachers</Button>
                            <Messages/>
                        </div>
                        <div className="col-md-9">
                            <TeachersContext.Provider
                                value={{teachers: this.state.filtered, edit: this.onTeacherEdition}}>
                                {
                                    this.state.showTeachers
                                        ?
                                        <ListTeachersComponent
                                            change={this.handleChange}
                                            search={this.state.search}
                                            condition={this.state.condition}
                                            conditionChange={this.onConditionChanged}
                                        />
                                        :
                                        null
                                }
                            </TeachersContext.Provider>
                            {
                                this.state.editTeacher
                                    ?
                                    <EditAccount
                                        path={"/api/admin/modifyTeacher"}
                                        email={this.state.editTeacherEmail}
                                        token={auth.getToken()}
                                        adminTeacherEdition={true}/>
                                    :
                                    null
                            }
                        </div>
                        <div className="col-md-1 border-left"></div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default AdminPage