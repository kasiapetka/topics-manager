import React, {Component} from 'react'
import axios from "axios";
import {Alert} from "reactstrap";
import Spinner from "../../components/UI/Spinner/Spinner";
import Sections from "../../components/Lists/ListSections/Sections";
import PickSemesterInput from "../../components/Lists/PickSemesterInput/PickSemesterInput";
import Modal from "../../components/UI/Modal/Modal";
import DeleteSection from "../FormsPages/SectionForms/DeleteSection/DeleteSection";
import PrivateAdminRoute from "../../components/PrivateRoutes/PrivateAdminRoute";
import DeleteSectionCard from "../../components/UI/Cards/SectionCards/DeleteSectionCard/DeleteSectionCard";
import PrivateTeacherRoute from "../../components/PrivateRoutes/PrivateTeacherRoute";
import {withRouter} from "react-router-dom";

class ListSections extends Component {
    state = {
        error: false,
        sections: [],
        loading: true,
        semester: 1,
        sectionDelete: false,
        sectionToDelete: null,
        deletedSection: null,
        deletedSectionPage: false
    };

    componentDidMount() {
        axios.get('/api/adminteacher/sections/' + this.state.semester).then(response => {
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
        const section = this.state.sections[index];

        console.log(section)
        this.setState((prev) => {
            return {
                sectionDelete: !this.state.sectionDelete,
                sectionToDelete: section,
            };
        })
    };

    showDeleteModalHandler = () => {
        this.setState((prevState) => {
            return {
                sectionDelete: !this.state.sectionDelete,
            }
        });
    };

    sectionDeletedHandler = (section) => {
        this.setState({
            deletedSection: section,
        });
    };


    render() {
        const error = this.state.error;
        const loading = this.state.loading;
        const sectionDelete = this.state.sectionDelete;
        let content, deleteModal;
        if (error) {
            return (
                <Alert color="danger">
                    Server Error, Please Try Again.
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
                    delete={this.onSectionDeleteHandler}
                    edit={this.onSectionEditHandler}
                />
            </React.Fragment>
        }
        if (sectionDelete) {
            deleteModal = (<Modal
                show={sectionDelete}
                modalClosed={this.showDeleteModalHandler}>
                <DeleteSection
                    section={this.state.sectionToDelete}
                    cancelClicked={this.showDeleteModalHandler}
                    deleteClicked={this.sectionDeletedHandler}
                    {...this.props}
                />
            </Modal>)
        }
        return (
            <React.Fragment>
                {deleteModal}
                <PrivateAdminRoute exact path="/admin/sections/deletedsection" component={() => <DeleteSectionCard
                    deleted={true}
                    section={this.state.deletedSection}
                    {...this.props}/>}/>

                <PrivateTeacherRoute exact path="/teacher/sections/deletedsection" component={() => <DeleteSectionCard
                    deleted={true}
                    section={this.state.deletedSection}
                    {...this.props}/>}/>

                <PrivateAdminRoute exact path="/admin/sections" component={() =>
                    <React.Fragment>
                        {content}
                    </React.Fragment>
                }/>
                <PrivateTeacherRoute exact path="/teacher/sections" component={() =>
                    <React.Fragment>
                        {content}
                    </React.Fragment>
                }/>
            </React.Fragment>
        );
    }
};

export default withRouter(ListSections);