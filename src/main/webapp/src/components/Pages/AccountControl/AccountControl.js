import React, {useState, useEffect} from "react";
import {NavLink, withRouter} from "react-router-dom";
import classes
    from './AccountControl.module.css'

const AccountControl = (props) => {
    const [showList, setShowList] = useState(false);
    const [controls, setControls] = useState(null);

   useEffect(()=>{

       if (props.controls) {
           setControls(props.controls.map(control => {
               if(props.history.location.pathname === control.link){
                   setShowList(true);
               }
               return <li key={control.link}
                          className={classes.Link}>
                   <NavLink activeClassName={classes.active} exact
                            to={control.link}>
                       {control.label}
                   </NavLink>
               </li>
           }))
       }
   },[]);

    return (
        <React.Fragment>
            <span className={classes.Title} onClick={() => setShowList(!showList)}>{props.mainLabel}</span>
            {
                showList
                    ?
                    <ul className={classes.Elements}>
                        {controls}
                    </ul>
                    :
                    null
            }
        </React.Fragment>
    );
};

export default withRouter(AccountControl);