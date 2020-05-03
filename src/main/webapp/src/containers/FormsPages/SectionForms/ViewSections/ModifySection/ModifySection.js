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



class ModifySection extends Component {

    state = {
        section: null,
        students: null,
        dates: [],
        loading: false,
        error: null
    };

    componentDidMount() {
        this.setState({loading: true});
        const sectionId = this.props.match.params.id;
        axios.get('/api/adminteacher/sections/section/' + sectionId).then(response => {
            const section = {...response.data};
            this.setState({
                section: section,
                loading: false
            })
        }).catch(error => {
            this.setState({
                error: error,
                loading: false
            })
        });

        axios.get('/api/adminteacher/students/' + sectionId + '/members').then(response => {
            const students = [...response.data];
            students.forEach(student => student.present = true);

            this.setState({
                students: students,
                loading: false
            })
        }).catch(error => {
            this.setState({
                error: error,
                loading: false
            })
        })
    }

    onStateChangeHandler = (event) => {
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
    };

    onIssuePresenceHandler = () => {
        this.props.history.push(this.props.location.pathname + '/issuepresence');
    };

    onViewPresenceHandler = () => {
        this.props.history.push(this.props.location.pathname + '/viewpresence');
    };

    render() {
        const section = this.state.section;
        const loading = this.state.loading;
        const error = this.state.error;

        if (error) {
            return <Alert color="danger">
                Server Error, Please Try Again. <br/>
                {error.message}
            </Alert>
        } else if (loading) {
            return <Spinner/>;
        } else if (section) {
            return (<React.Fragment>
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
                                                                       date={this.state.date}
                                                                       {...this.props}/>}/>
                <PrivateTeacherRoute exact path="/teacher/sections/modifysection/:id/viewpresence"
                                     component={() => <ViewPresence section={section}
                                                                     students={this.state.students}
                                                                     {...this.props}/>}/>

                <PrivateAdminRoute exact path="/admin/sections/modifysection/:id"
                                   component={() => <ModifySectionForm section={section}
                                                                       students={this.state.students}
                                                                       onStateChange={this.onStateChangeHandler}
                                                                       onIssuePresence={this.onIssuePresenceHandler}
                                                                       onViewPresence={this.onViewPresenceHandler}
                                                                       {...this.props}/>}/>
                <PrivateTeacherRoute exact path="/teacher/sections/modifysection/:id"
                                     component={() => <ModifySectionForm section={section}
                                                                         students={this.state.students}
                                                                         onStateChange={this.onStateChangeHandler}
                                                                         onIssuePresence={this.onIssuePresenceHandler}
                                                                         onViewPresence={this.onViewPresenceHandler}
                                                                         {...this.props}/>}/>
            </React.Fragment>)
        }

        return (<p>Something went wrong.</p>);
    }
}

export default ModifySection;