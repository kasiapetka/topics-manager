import React, {Component} from "react";
import ModifySectionForm
    from "../../../../../components/Forms/FormsTemplates/SectionForms/ModifySectionForm/ModifySectionForm";
import axios from "axios";
import {Alert} from "reactstrap";
import Spinner from "../../../../../components/UI/Spinner/Spinner";
import PrivateAdminRoute from "../../../../../components/PrivateRoutes/PrivateAdminRoute";
import PrivateTeacherRoute from "../../../../../components/PrivateRoutes/PrivateTeacherRoute";
import IssuePresence from "./IssuePresence/IssuePresence";
import ViewPresence from "./ViewPresence/ViewPresence";
import AddStudentToSectionForm
    from "../../../../../components/Forms/FormsTemplates/SectionForms/AddStudentsToSectionForm/AddStudentsToSectionForm";
import ViewGrades from "./ViewGrades/ViewGrades";
import IssueGrades from "./IssueGrades/IssueGrades";


class ModifySection extends Component {
    _isMounted = false;

    state = {
        section: null,
        students: null,
        modifyMembers: false,
        loading: false,
        dates: null,
        error: null
    };

    componentDidMount() {
        this._isMounted = true;
        if (this._isMounted) {
            this.setState({loading: true});
            const sectionId = this.props.match.params.id;

            axios.all([
                axios.get('/api/adminteacher/sections/section/' + sectionId),
                axios.get('/api/adminteacher/sections/' + sectionId + '/dates'),
                axios.get('/api/adminteacher/students/' + sectionId + '/members')
            ])
                .then(axios.spread((sectionResponse, datesResponse, membersResponse) => {
                    const section = {...sectionResponse.data};
                    section.size = section.sizeOfSection;
                    let dates = [...datesResponse.data];
                    const students = [...membersResponse.data];
                    students.forEach(student => student.present = true);
                    this.setState({
                        section: section,
                        dates: dates,
                        students: students,
                        loading: false
                    })
                }))
                .catch(error => {
                    this.setState({
                        error: error,
                        loading: false
                    })
                });
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    onStateChangeHandler = (event) => {
        if (this._isMounted) {
            this.setState({loading: true});
            const state = event.target.value;

            axios.put('/api/adminteacher/sections/' + this.state.section.id + '/state',
                JSON.stringify(state)).then(response => {
                const section = {...this.state.section};
                section.state = state;

                this.setState({
                    section: section,
                    loading: false
                })
            }).catch(error => {
                this.setState({
                    error: error,
                    loading: false
                })
            })
        }
    };

    addStudentToSectionHandler = (student) => {
        let students = this.state.students ? [...this.state.students] : [];
        students.push(student);
        this.setState((prevState) => {
            return {
                students: students
            }
        })
    };

    removeStudentFromSectionHandler = (student) => {
        let students = this.state.students ? [...this.state.students] : [];
        let removed = students.filter(function (toRem, index, arr) {
            return toRem.album !== student.album;
        });

        this.setState((prevState) => {
            return {
                students: removed
            }
        })
    };

    onStudentsEditionHandler = (event) => {
        event.preventDefault();
        let studentsAlbums = [];
        if (this.state.students) {
            if (this.state.students.length !== 0) {
                for (let [key, value] of Object.entries(this.state.students)) {
                    studentsAlbums.push(value.album);
                }
            }
        }
        let studentSection = {
            studentsAlbums: studentsAlbums,
            sectionId: this.state.section.id
        };

        // axios.put('/api/adminteacher/editstudentsinsection', studentSection).then(response => {
        //     this.setState({
        //             modifyMembers: false
        //         })
        // }).catch(error => {
        //     this.setState({
        //         error: error,
        //          modifyMembers: false
        //     })
        // })
    };

    onIssuePresenceHandler = () => {
        this.props.history.push(this.props.match.url + '/issuepresence');
    };

    onViewPresenceHandler = () => {
        this.props.history.push(this.props.match.url + '/viewpresence');
    };

    onIssueGradesHandler=()=>{
        this.props.history.push(this.props.match.url + '/issuegrades');
    };

    onViewGradesHandler=()=>{
        this.props.history.push(this.props.match.url + '/viewgrades');
    };

    onModifyMembersHandler = () => {
        this.setState((prevState) => {
            return {
                modifyMembers: !prevState.modifyMembers
            }
        })
    };

    render() {
        const section = this.state.section;
        const loading = this.state.loading;
        const error = this.state.error;
        let content = <p>Something went wrong.</p>;

        if (error) {
            return <Alert color="danger">
                Server Error, Please Try Again. <br/>
                {error.message}
            </Alert>
        } else if (loading) {
            return <Spinner/>;
        } else if (section && this._isMounted) {
            if (this.state.modifyMembers) {
                content = <AddStudentToSectionForm
                    cancelOption={true}
                    cancelOptionHandler={this.onModifyMembersHandler}
                    addToSection={this.addStudentToSectionHandler}
                    removeFromSection={this.removeStudentFromSectionHandler}
                    students={this.state.students}
                    onSubmit={this.onStudentsEditionHandler}
                    section={this.state.section}/>
            } else {
                content = <React.Fragment>
                    <PrivateAdminRoute exact path="/admin/sections/modifysection/:id/issuepresence"
                                       component={() => <IssuePresence section={section}
                                                                       students={this.state.students}
                                                                       {...this.props}/>}/>
                    <PrivateTeacherRoute exact path="/teacher/sections/modifysection/:id/issuepresence"
                                         component={() => <IssuePresence section={section}
                                                                         students={this.state.students}
                                                                         {...this.props}/>}/>

                    <PrivateAdminRoute exact path="/admin/sections/modifysection/:id/viewpresence"
                                       component={() => <ViewPresence section={section}
                                                                      students={this.state.students}
                                                                      dates={this.state.dates}
                                                                      {...this.props}/>}/>

                    <PrivateTeacherRoute exact path="/teacher/sections/modifysection/:id/viewpresence"
                                         component={() => <ViewPresence section={section}
                                                                        students={this.state.students}
                                                                        {...this.props}/>}/>

                    <PrivateAdminRoute exact path="/admin/sections/modifysection/:id/issuegrades"
                                       component={() => <IssueGrades section={section}
                                                                       students={this.state.students}
                                                                       {...this.props}/>}/>
                    <PrivateTeacherRoute exact path="/teacher/sections/modifysection/:id/issuegrades"
                                         component={() => <IssueGrades section={section}
                                                                         students={this.state.students}
                                                                         {...this.props}/>}/>

                    <PrivateAdminRoute exact path="/admin/sections/modifysection/:id/viewgrades"
                                       component={() => <ViewGrades section={section}
                                                                      students={this.state.students}
                                                                      dates={this.state.dates}
                                                                      {...this.props}/>}/>

                    <PrivateTeacherRoute exact path="/teacher/sections/modifysection/:id/viewgrades"
                                         component={() => <ViewGrades section={section}
                                                                        students={this.state.students}
                                                                        {...this.props}/>}/>

                    <PrivateAdminRoute exact path="/admin/sections/modifysection/:id"
                                       component={() => <ModifySectionForm section={section}
                                                                           students={this.state.students}
                                                                           onStateChange={this.onStateChangeHandler}
                                                                           onIssuePresence={this.onIssuePresenceHandler}
                                                                           onViewPresence={this.onViewPresenceHandler}
                                                                           onIssueGrades={this.onIssueGradesHandler}
                                                                           onViewGrades={this.onViewGradesHandler}
                                                                           onModifyMembers={this.onModifyMembersHandler}
                                                                           {...this.props}/>}/>
                    <PrivateTeacherRoute exact path="/teacher/sections/modifysection/:id"
                                         component={() => <ModifySectionForm section={section}
                                                                             students={this.state.students}
                                                                             onStateChange={this.onStateChangeHandler}
                                                                             onIssuePresence={this.onIssuePresenceHandler}
                                                                             onViewPresence={this.onViewPresenceHandler}
                                                                             onIssueGrades={this.onIssueGradesHandler}
                                                                             onViewGrades={this.onViewGradesHandler}
                                                                             onModifyMembers={this.onModifyMembersHandler}
                                                                             {...this.props}/>}/>
                </React.Fragment>
            }
        }
        return content;
    }
}

export default ModifySection;