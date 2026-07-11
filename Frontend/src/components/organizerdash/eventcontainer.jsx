import { DeleteOutlined, ExclamationCircleFilled, EyeOutlined, InboxOutlined, RightOutlined } from "@ant-design/icons";
import MainTitle from "./maintitle";
import TableRecentEvent from "./tablerecentevent";
import { useDeleteEventMutation, useGetEventsQuery } from "../../services/organizerEventApi";
import img from"../../assets/culinary_expo_banner.jpg"
import Cell from "./cell";
import {  useNavigate } from "react-router-dom";
import { Modal } from "antd";

export default function EventContainer(){
      const navigate = useNavigate();
    const[deleteEvent]=useDeleteEventMutation()
    const { confirm } = Modal;

    const { data,isSuccess,} =useGetEventsQuery();
   

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

            case "ongoing":
            return {
                text: "Ongoing",
                className: "bg-blue-100 text-blue-700",
            };
            case "completed":
            return {
                text: "Completed",
                className: "bg-gray-100 text-gray-700",
            };

            default:
            return {
                text: status,
                className: "bg-red-100 text-red-700",
            };
        }
        };

       const recentEvents = data?.data
        ? [...data.data]
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 4)
        : [];

         const delEvent = (_id) => {
        confirm({
            title: "Are you sure you want to delete this event?",
            icon: <ExclamationCircleFilled />,
            content: "This action cannot be undone.",
            okText: "Yes",
            okType: "danger",
            cancelText: "No",

            async onOk() {
            try {
                await deleteEvent({ id: _id }).unwrap();
                // refetch();
            } catch (e) {
                console.log(e);
            }
            },

            onCancel() {
            console.log("Cancel");
            },
        });
        };
    
    return(
        <>
           <div className="bg-white border border-[#E5E7EB] rounded-xl shadow-xs transition mt-7 w-full overflow-hidden">
                <div className="flex items-center justify-between  p-5 ">
                    <MainTitle>
                        <span className="text-[18px] font-bold">Recent Events</span>
                    </MainTitle>
                    <nav>
                        <a  className="text-[#793EED] hover:text-[#5F2CBF] cursor-pointer " onClick={()=>{navigate("events")}} >
                            View All Events
                            <RightOutlined style={{fontSize:"14px",marginLeft:"5px"}}/>
                        </a>
                    </nav>
                </div>

                {
                    isSuccess&&
                    <div className="w-full md:overflow-visible overflow-x-auto">

                        <TableRecentEvent>
                           {
                                recentEvents.length > 0 ? (
                                 recentEvents.map((td) => (
                            
                                <tr key={td._id} className="text-center">
                                    <Cell ui={"p-3"}>
                                        <div className="flex  items-center ">
                                           <img
                                                src={td.images[0]}
                                                alt={td.title}
                                                className="w-16 h-16 rounded-lg object-cover mr-4 "
                                                onError={(e) => {
                                                    e.currentTarget.src = img;
                                                }}
                                            />
                                            <div className="flex flex-col ">
                                                <span className="text-sm font-semibold mb-0.5 whitespace-nowrap max-w-[180px]  truncate"> {td.title}</span>
                                                <span className="text-xs ml-3 text-[#6b7280]  whitespace-nowrap max-w-[180px] truncate"> {td.description}</span>
                                            </div>
                                           
                                        </div>
                                    </Cell>
                                    <Cell ui={"p-4"}>
                                        <span className="text-sm font-medium  whitespace-nowrap"> {td.category}</span>
                                    </Cell>
                                    <Cell ui={"p-4"}>
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-sm mb-0.5  whitespace-nowrap">{new Date(td.date).toLocaleDateString()}</span>
                                            <span className="text-xs text-[#6b7280]  whitespace-nowrap">
                                                {new Date(td.date).toLocaleTimeString("en-US", {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </span>
                                            </div>                                                                
                                    </Cell>
                                    <Cell ui={"p-4"}><span className="font-medium  whitespace-nowrap">{td.price} $</span></Cell>
                                    <Cell ui={"p-4"}><span className="font-medium  whitespace-nowrap">{td.availableSeats}</span></Cell>
                                    
                                    <Cell ui={"p-4"}>
                                        <span
                                                className={`px-3 py-1 rounded-full text-xs font-medium ${getStatus(td.status).className}  whitespace-nowrap`}
                                            >
                                                {getStatus(td.status).text}
                                        </span>
                                    </Cell>
                                    <Cell ui={"p-4"}>
                                        <EyeOutlined  style={{marginRight:"7px", color:"#3E7FF6", cursor:"pointer"}}/>
                                        <DeleteOutlined style={{color:"#EF4444",cursor:"pointer"}}
                                        onClick={()=>delEvent(td._id)}/>
                                    </Cell>


                                </tr>
                                )
                            )): (
                                    <tr>
                                        <td colSpan={7} className="py-12">
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

                        </TableRecentEvent>
                    </div>

                
                
              }

            </div>
            
            
        </>
    )
}