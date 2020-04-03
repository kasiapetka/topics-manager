import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../Auth";

const PrivateStudentRoute = ({component: Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render={props => {
                if (auth.isAuthenticated() && auth.getRole()==='S') {
                    return <Component {...props} />;
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: {
                                    from: props.location
                                }
                            }}
                        />
                    );
                }
            }}
        />
    );
};

export default PrivateStudentRoute