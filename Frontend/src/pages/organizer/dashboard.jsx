import { Outlet } from "react-router-dom";
import Container from "../../components/common/Container";
import Footer from "../../layouts/Footer";
import Aside from "../../layouts/organizerdash/aside";
import DashContent from "../../layouts/organizerdash/dashcontent";
import { useState } from "react";

import NavOrganizerDash from "../../layouts/organizerdash/NavOrganizerDah";
import UserContext from "../../store/context";
import AddEditPage from "../../layouts/organizerdash/addeditpage";

export default function Dashboard(){
    const [showModal, setShowModal] = useState(false);
    const [modeModal, setModeModal] = useState("create");
    const [editId, setEditId] = useState(null);
    const changeShow=() => {
    setShowModal(false);
    setEditId(null);
    setModeModal("create");
};
    return(
        <>
            <NavOrganizerDash/>
            
                <Container className=" flex flex-col lg:flex-row gap-5 mt-8 mb-8 ">
                    <UserContext.Provider value={{
                            showModal,
                            setShowModal,
                            modeModal,
                            setModeModal,
                            editId,
                            setEditId,
                        }}>
                        <Aside/>
                        <DashContent/>
                        <AddEditPage
                            show={showModal}
                            changeShow={changeShow}
                            mode={modeModal}
                            eventId={editId}
                        >

                        </AddEditPage>
                    </UserContext.Provider>
                </Container>

            
             
               
    
            
        </>
    )
}