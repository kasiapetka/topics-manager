import React from "react";
import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from "reactstrap";
import logo from "../../../img/list.png";

const pageNavbar = (props) => (
    <Navbar color="light" light expand="md">
        <NavbarBrand href={props.path}><img
            alt=""
            src={logo}
            width="32"
            height="32"
            className="d-inline-block align-top"
        />{' '}TaskManager</NavbarBrand>
        <NavbarToggler onClick={props.toggle}/>
        <Collapse isOpen={props.isOpen} navbar>
            <Nav className="mr-auto" navbar>
                <NavItem>
                    <NavLink href='/'>Home</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
                </NavItem>
            </Nav>
            {props.account}
        </Collapse>
    </Navbar>
);

export default pageNavbar;