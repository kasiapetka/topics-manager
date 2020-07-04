import React from "react";
import PageNavbar from "../../containers/Navbar/Navbar";
import Login from "../../containers/FormsPages/Login/Login";
import Register from "../../containers/FormsPages/Register/Register";

const loginPage = (props) => (
    <div>
        <PageNavbar/>
        {props.isLoginOnAct ? <Login/> : <Register/>}
    </div>
);

export default loginPage;