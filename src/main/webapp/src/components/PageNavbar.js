import React, { useState } from 'react';
import logo from '../img/list.png';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Button,
    ButtonDropdown,
} from 'reactstrap';
import { FaUserAlt } from "react-icons/fa";
import {Link, Redirect} from "react-router-dom";
import auth from "../Auth"

const PageNavbar = (props) => {

    const [dropdownOpen, setOpen] = useState(false);
    const toggleButton = () => setOpen(!dropdownOpen);
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    let account;
    let path,modifyPath;
    const role = auth.getRole();

    if (role === 'S') {
        path = '/student';
        modifyPath = '/student/modifyAccount';
    }
    if (role === 'T') {
        path = '/teacher';
    }
    if (role === 'A') {
        path = '/admin';
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
        <Navbar color="light" light expand="md">
            <NavbarBrand href="/"><img
                alt=""
                src={logo}
                width="32"
                height="32"
                className="d-inline-block align-top"
            />{' '}TaskManager</NavbarBrand>
            <NavbarToggler onClick={toggle}/>
            <Collapse isOpen={isOpen} navbar>
                <Nav className="mr-auto" navbar>
                    <NavItem>
                        <NavLink href="/">Home</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
                    </NavItem>
                </Nav>
                {account}
            </Collapse>
        </Navbar>
    );
}

export default PageNavbar;