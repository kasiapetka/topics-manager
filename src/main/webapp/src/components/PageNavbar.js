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
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Button,
} from 'reactstrap';
import { FaUserAlt } from "react-icons/fa";
import {Link} from "react-router-dom";
import auth from "../Auth"

const PageNavbar = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    let account;

    if(auth.isAuthenticated()){
        account=<Link to="/student">
            <Button className="float-right" variant="outlined">
                <FaUserAlt className="accountIcon"></FaUserAlt>My Account
            </Button>
        </Link>;
    }else {
        account=<Link to="/login">
            <Button className="float-right" variant="outlined">
                <FaUserAlt className="accountIcon"></FaUserAlt>Sign In
            </Button>
        </Link>;
    }
    console.log(auth.isAuthenticated())
    return (
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/"><img
                        alt=""
                        src={logo}
                        width="32"
                        height="32"
                        className="d-inline-block align-top"
                    />{' '}TaskManager</NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <NavLink href="/">Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Options
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        Option 1
                                    </DropdownItem>
                                    <DropdownItem>
                                        Option 2
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        Reset
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                        {account}

                    </Collapse>
                </Navbar>
    );
}

export default PageNavbar;