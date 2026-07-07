import { PlusOutlined } from "@ant-design/icons";
import ButtonDash from "../../../components/organizerdash/button";
import MainTitle from "../../../components/organizerdash/maintitle";
import TableRecentEvent from "../../../components/organizerdash/tablerecentevent";

export default function Events(){
    return(
        <>
            <div className="w-full">
                <div className="flex justify-between   items-center">
                    <MainTitle>
                        <h1 className="text-[25px] font-bold">Events</h1>
                        <span className="text-slate-500 text-sm ">Manage all your event listings in one place</span>
                    </MainTitle>
                    <ButtonDash
                        icon={<PlusOutlined style={{marginRight:"7px"}} />}
                       content={" Create Event"}
                       ui={"bg-[#1A1033] text-white hover:bg-[#0F0A1E] "}
                    >
                       
                    </ButtonDash>

                </div>
                <TableRecentEvent/>
                

            </div>
            
        
            
        </>
    )
}