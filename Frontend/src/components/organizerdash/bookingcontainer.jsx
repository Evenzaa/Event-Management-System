import { DeleteOutlined, ExclamationCircleFilled, EyeOutlined, FileTextOutlined, InboxOutlined, RightOutlined } from "@ant-design/icons";
import MainTitle from "./maintitle";
import TableRecentEvent from "./tablerecentevent";
import { useDeleteEventMutation, useGetEventsQuery } from "../../services/organizerEventApi";
import img from"../../assets/culinary_expo_banner.jpg"
import Cell from "./cell";
import {  useNavigate } from "react-router-dom";
import { Modal, Spin } from "antd";
import TableBooking from "./tablebooking";
import { useGetBookingByIdQuery } from "../../services/organizerBookingApi";
import { useState } from "react";
import BookingModal from "../../layouts/organizerdash/bookingmodal";

export default function BookingContainer({eventId,databooking,isLoading,isError,isSuccess}){
        const navigate = useNavigate();
        const { confirm } = Modal;

        const[showModal,setShowModal]=useState(false)
        const [selectedBooking, setSelectedBooking] = useState(null);
        const handleOpen = (booking) => {
            setSelectedBooking(booking);
            setShowModal(true);
        };
        
        const changeShow=()=>{
             setShowModal(false);
        }    
     

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

         if (!eventId) {
            return (
            <div className="bg-white border border-[#E5E7EB] rounded-xl p-10 mt-7">
                <div className="flex flex-col items-center justify-center gap-3 text-center">
                <FileTextOutlined style={{ fontSize: 40, color: "#6B7280" }} />
                <h2 className="text-lg font-semibold">No Event Selected</h2>
                <p className="text-gray-500">
                    Please select an event to view its bookings.
                </p>
                </div>
            </div>
            );
        }

        if (isSuccess && databooking?.data?.length === 0) {
            return (
            <div className="bg-white border border-[#E5E7EB] rounded-xl p-10 mt-7">
                <div className="flex flex-col items-center justify-center gap-3 text-center">
                <FileTextOutlined style={{ fontSize: 40, color: "#6B7280" }} />
                <h2 className="text-lg font-semibold">No Bookings Yet</h2>
                <p className="text-gray-500">
                    This event hasn't received any bookings yet.
                </p>
                </div>
            </div>
            );
        }

        
    return(
        <>
          <div className="bg-white border border-[#E5E7EB] rounded-xl shadow-xs transition mt-7 w-full overflow-hidden">
              

                {
                    isSuccess&&
                    <div className="w-full md:overflow-visible overflow-x-auto">

                        <TableBooking>
                           {[...databooking.data]
                            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                            .map((td) => (
                                    
                                <tr key={td._id} className="text-center">
                                    <Cell ui={"p-2"}>
                                        
                                        <span className="text-sm font-semibold mb-0.5 whitespace-nowrap max-w-[180px]  truncate"> {td.ticketNumber}</span> 
                                           
                                       
                                    </Cell>
                                    <Cell ui={"p-2"}>
                                        <span className="text-sm font-medium  whitespace-nowrap"> {td.userId.name}</span>
                                    </Cell>
                                    <Cell ui={"p-2"}>
                                        <span className="text-sm font-medium  whitespace-nowrap"> {td.quantity}</span>
                                    </Cell>
                                    <Cell ui={"p-2"}>
                                        <span className="text-sm font-medium  whitespace-nowrap"> {td.totalPrice} $</span>
                                    </Cell>
                                    <Cell ui={"p-2"}>
                                        <span
                                                className={`px-3 py-1 rounded-full text-xs font-medium ${getStatus(td.paymentStatus).className}  whitespace-nowrap`}
                                            >
                                                {getStatus(td.paymentStatus).text}
                                        </span>
                                    </Cell>
                                    <Cell ui={"p-2"}>
                                        <span
                                                className={`px-3 py-1 rounded-full text-xs font-medium ${getStatus(td.status).className}  whitespace-nowrap`}
                                            >
                                                {getStatus(td.status).text}
                                        </span>
                                    </Cell>
                                    <Cell ui={"p-2"}>
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-sm mb-0.5  whitespace-nowrap">{new Date(td.createdAt).toLocaleDateString()}</span>
                                            <span className="text-xs text-[#6b7280]  whitespace-nowrap">
                                                {new Date(td.createdAt).toLocaleTimeString("en-US", {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </span>
                                            </div>                                                                
                                    </Cell>
                                    <Cell ui={"p-2"}>
                                        <EyeOutlined  style={{marginRight:"7px", color:"#3E7FF6", cursor:"pointer"}}
                                            onClick={()=>{
                                                 handleOpen(td)
                                            }}/>
                                    </Cell>

                                </tr>
                              )
                             )}


                        </TableBooking>
                    </div>

                
                
              }

               {isLoading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
                    <Spin description="Loading..." size="large" style={{ margin: "0 auto" }} />
                </div>
                )}

                {isError && <div>error loading event bookings</div>}


                <BookingModal
                    show={showModal}
                    changeShow={changeShow}
                    databooking={selectedBooking}
                />

            </div>
            
            
        </>
    )
}