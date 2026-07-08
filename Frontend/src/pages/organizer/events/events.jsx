import { DeleteOutlined, EditOutlined, EyeOutlined, InboxOutlined, PlusOutlined, StarFilled } from "@ant-design/icons";
import ButtonDash from "../../../components/organizerdash/button";
import MainTitle from "../../../components/organizerdash/maintitle";
import TableEvent from "../../../components/organizerdash/tableevents";
import { useGetEventsQuery } from "../../../services/organizerEventApi";
import Cell from "../../../components/organizerdash/cell";
import img from"../../../assets/culinary_expo_banner.jpg"
import { Spin } from "antd";

export default function Events(){
    const { data,isLoading,isError,isSuccess,} =useGetEventsQuery();

    console.log(data);
    console.log(data?.data);

    const getStatus = (status) => {
        switch (status.toLowerCase()) {
            case "approved":
            return {
                text: "Approved",
                className: "bg-green-100 text-green-700",
            };

            case "pending":
            return {
                text: "Pending",
                className: "bg-yellow-100 text-yellow-700",
            };

            case "rejected":
            return {
                text: "Rejected",
                className: "bg-red-100 text-red-700",
            };

            default:
            return {
                text: status,
                className: "bg-gray-100 text-gray-700",
            };
        }
        };

    return(
        <>
            <div className="w-full">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-7">
                    <MainTitle>
                        <h1 className="text-2xl md:text-[25px] font-bold">Events</h1>
                        <span className="text-slate-500 text-sm">
                            Manage all your event listings in one place
                        </span>
                    </MainTitle>

                    <ButtonDash
                        icon={<PlusOutlined style={{ marginRight: "7px" }} />}
                        content="Create Event"
                        ui="bg-[#1A1033] text-white hover:bg-[#0F0A1E] w-full md:w-auto justify-center"
                    />
                </div>

                {
                    isSuccess&&
                    <div className="w-full md:overflow-visible overflow-x-auto">

                        <TableEvent>
                           {
                               data?.data?.length > 0 ? (
                                 data.data.slice(0, 5).map((td) => (

                                <tr key={td._id} className="text-center bg-white">
                                    <Cell ui={"p-2"}>
                                        <div className="flex  items-center">
                                           <img
                                                src={td.images[0]}
                                                alt={td.title}
                                                className="w-12 h-12 rounded-lg object-cover mr-3"
                                                onError={(e) => {
                                                    e.currentTarget.src = img;
                                                }}
                                            />
                                            {/* <div className="flex flex-col"> */}
                                                <span className="text-sm font-medium mb-0.5 whitespace-nowrap max-w-[180px] truncate"> {td.title}</span>
                                                {/* <span className="text-xs ml-3 text-[#6b7280]"> {td.description}</span> */}
                                            {/* </div> */}
                                           
                                        </div>
                                    </Cell>
                                     <Cell ui={"p-2"}>
                                        <span className="text-sm font-medium whitespace-nowrap"> {td.category}</span>
                                    </Cell>
                                   <Cell>
                                        <div className="flex flex-col">
                                            <span className="font-medium text-sm mb-0.5 whitespace-nowrap">{new Date(td.date).toLocaleDateString()}</span>
                                            <span className="text-xs text-[#6b7280] whitespace-nowrap">
                                                {new Date(td.date).toLocaleTimeString("en-US", {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </span>
                                            </div>                                                                
                                    </Cell>
                                    <Cell><span className="font-medium whitespace-nowrap">{td.availableSeats}</span></Cell>
                                    <Cell><span className="font-medium whitespace-nowrap">{td.capacity}</span></Cell>
                                    <Cell>
                                        <span className="font-medium whitespace-nowrap">
                                            {td.featured ? <>
                                                <StarFilled style={{color:"oklch(90.5% 0.182 98.111)",marginRight:"7px"}} />
                                                    Yes
                                                </> 
                                                : "No"
                                            }
                                        </span>
                                    </Cell>

                                    
                                    <Cell>
                                        <span
                                                className={`px-3 py-1 rounded-full text-xs font-medium ${getStatus(td.status).className} whitespace-nowrap`}
                                            >
                                                {getStatus(td.status).text}
                                        </span>
                                    </Cell>
                                    <Cell>
                                        <EyeOutlined  style={{marginRight:"4px", color:"#3E7FF6", cursor:"pointer"}}/>
                                        <EditOutlined style={{marginRight:"4px", color:"#10B981", cursor:"pointer"}} />
                                        <DeleteOutlined style={{color:"#EF4444",cursor:"pointer"}}/>
                                    </Cell> 


                                </tr>
                            ))): (
                                <tr>
                                    <td colSpan={8} className="py-12">
                                        <div className="flex flex-col items-center gap-2 text-gray-500">
                                            <InboxOutlined className="text-4xl text-gray-300" />
                                            <span className="font-medium">No events found</span>
                                            <span className="text-sm text-gray-400">
                                                Create your first event to get started.
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </TableEvent>
                    </div>

                }
                  {
                    isLoading&&
                        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
                            <Spin description="Loading..." size="large" style={{margin:"0 auto"}}>
                            </Spin>

                    </div>
                    
                }
                {
                    isError&&
                    <div>
                        error loading events
                    </div>
                }
                    

            </div>
            
        
            
        </>
    )
}