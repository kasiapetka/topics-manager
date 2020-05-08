import React,{useState} from 'react';
import PageNavbar from "../../Navigation/Navbar/Navbar";
import EditAccount from '../../../containers/FormsPages/PersonForms/EditAccount/EditAccount';
import auth from "../../../Auth";
import SideDrawer from "../../Navigation/SideDrawer/SideDrawer";

const AdminAccountModification =()=> {
    const email = auth.parseJwt(auth.getToken()).sub;
    const [showSideDrawer, setShowSideDrawer] = useState(false);

    return (
        <div>
            <PageNavbar logoClicked={()=>setShowSideDrawer(!showSideDrawer)}/>
            <SideDrawer
                clicked={()=>setShowSideDrawer(!showSideDrawer)}
                show={showSideDrawer}/>

            <EditAccount
                path="/api/admin/modify"
                email={email}
                adminTeacherEdition={false}/>
        </div>
    );
};

export default AdminAccountModification;