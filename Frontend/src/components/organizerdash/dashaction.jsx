import { PlusOutlined, ScheduleOutlined } from "@ant-design/icons";
import MainTitle from "./maintitle";
import ButtonDash from "./button";
import { useContext } from "react";
import UserContext from "../../store/context";

export default function DashAction (){
    const {
        showModal,
    setShowModal,
    setModeModal,
    setEditId,
    } = useContext(UserContext);

    console.log(showModal);
    return(
        <>
            <div className="w-full bg-white border border-[#E5E7EB] rounded-xl pt-4 pb-4 pl-6 pr-6  shadow-xs  transition mt-7">
                <MainTitle>
                    <span className="text-[18px] font-bold">Quick Actions</span>
                </MainTitle>
                <div className="mt-2 flex flex-col sm:flex-row gap-4">
                    <ButtonDash
                        icon={ <PlusOutlined style={{marginRight:"7px"}}/>}
                        content={"Add New Event"} 
                        onClick={() => {
                            setEditId(null);
                            setShowModal(true);
                            setModeModal("create");
                        }}
                        
                        ui={"bg-gradient-to-r from-[#793EED] to-[#3E7FF6] text-white "}  
                    >
                    </ButtonDash>
                    <ButtonDash
                        icon={ <ScheduleOutlined style={{marginRight:"7px"}} />}
                        content={"View All Booking"}
                        ui={"text-base text-[#0F0A1E] border border-[#E5E7EB] "}
                      
                    >   
                    </ButtonDash>
                    

                </div>
                    
            </div>
        </>
    )
}