import React, { useState } from 'react';
import {
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Button,
    ButtonDropdown,
} from 'reactstrap';
import { FaUserAlt } from "react-icons/fa";
import {Link} from "react-router-dom";
import auth from "../../../Auth"
import PageNavbarElements from './PageNavbarElements'

const PageNavbar = () => {

    const [dropdownOpen, setOpen] = useState(false);
    const toggleButton = () => setOpen(!dropdownOpen);
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    let account;
    let path='/',modifyPath;
    const role = auth.getRole();

    if (role === 'S') {
        path = '/student';
        modifyPath = '/student/modifyAccount';
    }
    if (role === 'T') {
        path = '/teacher';
        modifyPath = '/teacher/modifyAccount';
    }
    if (role === 'A') {
        path = '/admin';
        modifyPath = '/admin/modifyAccount';
    }

    if (auth.isAuthenticated()) {
        account =
            (<ButtonDropdown isOpen={dropdownOpen} className="float-right mr-2" toggle={toggleButton}>
                <DropdownToggle caret>
                    <FaUserAlt className="ml-2 pb-1 mr-1"></FaUserAlt>My Account
                </DropdownToggle>
                <DropdownMenu className="mr-2">
                    <DropdownItem header>Account Settings</DropdownItem>
                    <DropdownItem tag={Link} to={path}>My Account Page</DropdownItem>
                    <DropdownItem tag={Link} to={modifyPath}>Edit Account</DropdownItem>
                    <DropdownItem divider/>
                    <DropdownItem onClick={auth.logout} tag={Link} to='/'>Log Out</DropdownItem>
                </DropdownMenu>
            </ButtonDropdown>)
    } else {
        account = <Link to="/login">
            <Button className="float-right" variant="outlined">
                <FaUserAlt className="pb-1 mr-1"></FaUserAlt>Sign In
            </Button>
        </Link>;
    }
    return (
      <PageNavbarElements
        toggle={toggle}
        isOpen={isOpen}
        account={account}
        path={path}/>
    );
}

export default React.memo(PageNavbar);