import React, {Component} from 'react';
import axios from "axios";
import {Alert} from "reactstrap";
import Spinner from "../../components/UI/Spinner/Spinner";

import Codes from "../../components/Lists/ListCodes/Codes";
import handleConditionChange from "../../components/Lists/FilterLists/FilterList";
import FilterPersonsList from "../../components/Lists/FilterLists/FilterPersonsList";
import FilterCodesList from "../../components/Lists/FilterLists/FilterCodesList";

class ListCodes extends Component {

    state = {
        codes: [],
        loading: false,
        codesFiltered: [],
        condition: 'Name',
        search: '',
        error: null
    };

    componentDidMount() {
        axios.get('/api/admin/codes').then(response => {
            let codes = [...response.data];
            console.log(codes)
            this.setState({
                codes: codes,
                codesFiltered: codes,
                loading: false
            });
        }).catch(error => {
            this.setState({
                error: error,
                loading: false
            })
        })
    }

    handleChange = (event) => {
        let content = handleConditionChange(event, this.state.condition,
            this.state.codes);
        this.setState({
            codesFiltered: content.newList,
            search: content.value
        });
    };

    onConditionChanged = (event) => {
        this.setState({
            condition: event.currentTarget.value,
            codesFiltered: this.state.codes,
            search: ''
        });
    };

    render() {
        const error = this.state.error;
        let list;

        if (error) {
            list = (
                <Alert color="danger">
                    Server Error, Please Try Again.<br/>
                    {error.message}
                </Alert>
            )
        } else if (this.state.loading) {
            list = (<Spinner/>)
        } else if (this.state.codes) {
            list = <React.Fragment>
                <FilterCodesList
                    condition={this.state.condition}
                    search={this.state.search}
                    change={this.handleChange}
                    conditionChange={this.onConditionChanged}
                />
                <Codes
                    codes={this.state.codesFiltered}/>
            </React.Fragment>
        }
        return list;
    }
}

export default ListCodes;
