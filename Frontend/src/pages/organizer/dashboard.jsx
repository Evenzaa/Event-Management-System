import { Outlet } from "react-router-dom";
import Container from "../../components/common/Container";
import Footer from "../../layouts/Footer";
import Aside from "../../layouts/organizerdash/aside";
import DashContent from "../../layouts/organizerdash/dashcontent";

import NavOrganizerDash from "../../layouts/organizerdash/NavOrganizerDah";

export default function Dashboard(){
    return(
        <>
            <NavOrganizerDash/>
             <Container className=" flex flex-col lg:flex-row gap-6 mt-8 mb-8">
                <Aside/>
                <DashContent/>
             </Container>
               
    
            
            <Footer/>
        </>
    )
}