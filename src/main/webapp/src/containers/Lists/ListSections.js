import React, {Component} from 'react'
import axios from "axios";
import {Alert} from "reactstrap";
import Spinner from "../../components/UI/Spinner/Spinner";
import Sections from "../../components/Lists/ListSections/Sections";
import PickSubjectInput from "../../components/Lists/PickSubjectInput/PickSubjectInput";
import PickSemesterInput from "../../components/Lists/PickSemesterInput/PickSemesterInput";

class ListSections extends Component {
    state = {
        error: false,
        sections: [],
        loading: true,
        semester: 1
    };

    componentDidMount() {
        //
        // const s = [
        //     {
        //         name: 'kasdia',
        //         size: '4',
        //         topic: 'bd',
        //         semester: '5',
        //         id: 'df'
        //     },
        //     {
        //         name: 'mikus',
        //         size: '1',
        //         topic: 'dfgdf',
        //         semester: '3',
        //         id: 'tytr'
        //     },
        //     {
        //         name: 'karol',
        //         size: '5',
        //         topic: 'dsf',
        //         semester: '1',
        //         id: 'sdsd'
        //     },
        // ]
        //
        // this.setState({
        //             sections: s,
        //             loading: false,
        //         });

        axios.get('/api/adminteacher/sections/'+this.state.semester).then(response => {
            let sections = [...response.data];
            this.setState({
                sections: sections,
                loading: false,
            });
        }).catch(error => {
            this.setState({
                error: true,
                loading: false,
            })
        })
    }

    onSemesterChangeHandler = (event) => {
        this.setState({loading: true});
        const id = event.target.value;

        this.setState({
            semester: id,
        });

        axios.get('/api/adminteacher/sections/' + id).then(response => {
            let sections = [...response.data];
            this.setState({
                sections: sections,
                loading: false
            });
        }).catch(error => {
            this.setState({
                error: true,
                loading: false
            })
        })
    };

    onSectionEditHandler = (index) => {
        //const section = this.state.sections[index];
        alert('onSectionEditHandler')
    };

    onSectionDeleteHandler = (index) => {
        //const section = this.state.sections[index];
        alert('onSectionDeleteHandler')
    };

    render() {
        const error = this.state.error;
        const loading = this.state.loading;
        let content;

        if (error) {
            return (
                <Alert color="danger">
                    Server Error, Please Try Again.
                </Alert>
            )
        } else if (loading) {
            content = <Spinner/>
        } else {
            content =
                <React.Fragment>
                    <Sections
                        sections={this.state.sections}
                        delete={this.onSectionDeleteHandler}
                        edit={this.onSectionEditHandler}
                    />
                </React.Fragment>
            ;
        }

        return (
            <React.Fragment>
                <PickSemesterInput
                    semester={this.state.semester}
                    onSemesterChange={this.onSemesterChangeHandler}
                />
                {content}
            </React.Fragment>
        );
    }
};

export default ListSections;