import { RightOutlined } from "@ant-design/icons";
import MainTitle from "./maintitle";
import TableEvent from "./tableevent";
import { useGetEventsQuery } from "../../services/organizerEventApi";

export default function EventContainer(){
    // const { data,error,isLoading,isError,isSuccess,} = useGetEventsQuery();

    // console.log(data);
  

    // if (isError) {
    //     console.log(error);
    //     return <p>Error loading events</p>;
    // }
    
    return(
        <>
           <div className="bg-white border border-[#E5E7EB] rounded-xl shadow-sm hover:shadow-md transition mt-7 w-full overflow-hidden">
                <div className="flex items-center justify-between  p-5 ">
                    <MainTitle>
                        <span className="text-[18px] font-bold">Recent Events</span>
                    </MainTitle>
                    <nav>
                        <a href="" className="text-[#793EED] hover:text-[#5F2CBF] ">
                            View All Events
                            <RightOutlined style={{fontSize:"14px",marginLeft:"5px"}}/>
                        </a>
                    </nav>
                </div>
                <div className="w-full md:overflow-visible overflow-x-auto">
                    <TableEvent />
                </div>
                

            </div>
            
            
        </>
    )
}