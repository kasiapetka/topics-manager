import React, {Component} from "react";
import axios from "axios";
import Sections from "../../../../components/Lists/ListSections/Sections";
import PickSemesterInput from "../../../../components/Lists/PickSemesterInput/PickSemesterInput";
import {Alert} from "reactstrap";
import Spinner from "../../../../components/UI/Spinner/Spinner";

class ViewSections extends Component {
    state = {
        error: null,
        sections: [],
        loading: true,
        semester: 1,
        sectionDelete: false,
        section: null,
        deletedSection: null,
        deletedSectionPage: false,
    };

    componentDidMount() {
        axios.get('/api/common/sections/' + this.state.semester).then(response => {
            console.log(response.data);

            let sections = [...response.data];

            console.log(sections)
            this.setState({
                sections: sections,
                loading: false,
            });
        }).catch(error => {
            this.setState({
                error: error,
                loading: false,
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
                loading: false
            });
        }).catch(error => {
            this.setState({
                error: error,
                loading: false
            })
        })
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
            content = <React.Fragment>
                <PickSemesterInput
                    semester={this.state.semester}
                    onSemesterChange={this.onSemesterChangeHandler}/>
                <Sections
                    sections={this.state.sections}
                    delete={this.props.delete}
                    edit={this.props.edit}
                    modify={this.props.modify}
                />
            </React.Fragment>
        }

        return content;
    };
};

export default ViewSections;