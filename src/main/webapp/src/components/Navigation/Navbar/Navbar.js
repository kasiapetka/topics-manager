import React, {useState} from 'react';
import {
    Button, NavItem, NavLink,
} from 'reactstrap';
import {FaUserAlt} from "react-icons/fa";
import {Link} from "react-router-dom";
import auth from "../../../Auth"
import PageNavbarElements from './NavbarElements'

const Navbar = (props) => {

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

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
            logoClicked={props.logoClicked}
            toggle={toggle}
            isOpen={isOpen}
            account={account}
            path={path}
            items={items}/>
    );
};

export default React.memo(Navbar);