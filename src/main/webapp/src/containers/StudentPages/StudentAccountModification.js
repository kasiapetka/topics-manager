import React, {useState} from 'react';
import PageNavbar from "../../components/Navigation/Navbar/Navbar";
import EditAccount from '../FormsPages/PersonForms/EditAccount/EditAccount';
import auth from '../../Auth'
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

const StudentAccountModification =()=> {
    const email = auth.parseJwt(auth.getToken()).sub;
    const [showSideDrawer, setShowSideDrawer] = useState(false);

    return (
        <div>
            <PageNavbar logoClicked={()=>setShowSideDrawer(!showSideDrawer)}/>
            <SideDrawer
                clicked={()=>setShowSideDrawer(!showSideDrawer)}
                show={showSideDrawer}/>

            <EditAccount
            path="/api/student/modify"
            email={email}
            token={auth.getToken()}
            adminTeacherEdition={false}/>
        </div>
    );
};

export default StudentAccountModification;