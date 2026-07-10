import { Outlet } from "react-router-dom";
import Container from "../../components/common/Container";
import Footer from "../../layouts/Footer";
import Aside from "../../layouts/organizerdash/aside";
import DashContent from "../../layouts/organizerdash/dashcontent";
import { useState } from "react";

import NavOrganizerDash from "../../layouts/organizerdash/NavOrganizerDah";
import UserContext from "../../store/context";

export default function Dashboard(){
    const [showModal, setShowModal] = useState(false);
    const [modeModal, setModeModal] = useState("create");
    const [editId, setEditId] = useState(null);
    return(
        <>
            <NavOrganizerDash/>
            <UserContext.Provider value={{
                showModal,
                setShowModal,
                modeModal,
                setModeModal,
                editId,
                setEditId,
            }}>
                <Container className=" flex flex-col lg:flex-row gap-5 mt-8 mb-8 ">
                    <Aside/>
                    <DashContent/>
                </Container>

            </UserContext.Provider>
             
               
    
            
        </>
    )
}