import React, {Component, useState} from 'react';
import {
    Button, NavItem, NavLink,
} from 'reactstrap';
import {FaUserAlt} from "react-icons/fa";
import {Link} from "react-router-dom";
import auth from "../../Auth"
import PageNavbarElements from '../../components/Navigation/Navbar/NavbarElements'
import axios from "axios";

class Navbar extends Component {

    state={
        messages: null,
        isOpen: false

    };

    getMessages=()=> {
        axios.get('/api/message/new').then(response => {
            let messages = response.data;
            console.log(messages)
            this.setState({
                messages: messages,
                mounted: true,
            });
        }).catch(error => {
            this.setState({
                mounted: true
            })
        })
    };

    // componentDidMount() {
    //     this.getMessages();
    // }

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     if (this.state.mounted && (this.state.messages !== +prevState.messages)) {
    //         this.getMessages();
    //     }
    // }

    setIsOpen=()=>{
        this.setState((prevState) => {
            return {
                isOpen: !prevState.isOpen
            }
        });
    };

    render(){
        let account, items;
        let path = '/';
        const role = auth.getRole();
        if (role === 'S') {
            path = '/student';
        }
        if (role === 'T') {
            path = '/teacher';
        }
        if (role === 'A') {
            path = '/admin';
        }

        if (auth.isAuthenticated()) {
            account = <Link to="/">
                <Button onClick={auth.logout} className="float-right" variant="outlined">
                    <FaUserAlt className="pb-1 mr-1"></FaUserAlt>Log Out
                </Button>
            </Link>;
            items = (
                <React.Fragment>
                    <NavItem>
                        <NavLink href={path}>My Account</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href={path+'/modifyaccount'}>Edit Account</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href={path+'/messages'}>Messages</NavLink>
                    </NavItem>
                </React.Fragment>)
        } else {
            account = <Link to="/login">
                <Button className="float-right" variant="outlined">
                    <FaUserAlt className="pb-1 mr-1"></FaUserAlt>Sign In
                </Button>
            </Link>;
        }
        return (
            <PageNavbarElements
                logoClicked={this.props.logoClicked}
                toggle={this.setIsOpen}
                isOpen={this.state.isOpen}
                account={account}
                path={path}
                items={items}/>
        );
    }
};

export default React.memo(Navbar);