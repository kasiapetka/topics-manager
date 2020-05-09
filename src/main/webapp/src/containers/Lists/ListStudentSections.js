import React, {Component} from 'react'
import axios from "axios";
import Sections from "../../components/Lists/ListSections/Sections";
import PickSemesterInput from "../../components/Lists/PickSemesterInput/PickSemesterInput";
import PrivateStudentRoute from "../../components/PrivateRoutes/PrivateStudentRoute";
import ViewStudentSection from "../FormsPages/SectionForms/ViewStudentSection/ViewStudentSection";
import {withRouter} from "react-router-dom";
import {Alert} from "reactstrap";
import Spinner from "../../components/UI/Spinner/Spinner";

class ListStudentSections extends Component {

    state = {
        sections: [],
        sectionsFiltered: [],
        semester: 1,
        error: null,
        loading: false
    };

    componentDidMount() {
        this.setState({loading: true});

        const sem = this.state.semester;
        axios.get('/api/common/sections/' + sem).then(response => {
            let sections = [...response.data];
            this.setState({
                sections: sections,
                sectionsFiltered: sections,
                loading: false
            });
        }).catch(error => {
            this.setState({
                error: error,
                loading: false
            })
        })
    }

    onSemesterChangeHandler = (event) => {
        this.setState({loading: true});
        const sem = event.target.value;
        this.setState({
            semester: sem,
        });
        axios.get('/api/common/sections/' + sem).then(response => {
            let sections = [...response.data];
            this.setState({
                sections: sections,
                sectionsFiltered: sections,
                loading: false
            });
        }).catch(error => {
            this.setState({
                error: error,
                loading: false
            })
        })
    };

    viewSectionHandler = (section) => {
        this.props.history.push(this.props.match.path + '/section/'+section.id);
    };

    render() {
        const error = this.state.error;
        const loading = this.state.loading;
        let content;
        if (error) {
            return (
                <Alert color="danger">
                    Server Error, Please Try Again.<br/>
                    {error.message}
                </Alert>
            )
        } else if (loading) {
            content = <Spinner/>
        } else {
            content = <div>
                <PickSemesterInput
                    semester={this.state.semester}
                    onSemesterChange={this.onSemesterChangeHandler}/>
                <Sections
                    viewSection={this.viewSectionHandler}
                    sections={this.state.sections}/>
            </div>
        }
        return content;
    }
};

export default withRouter(ListStudentSections);