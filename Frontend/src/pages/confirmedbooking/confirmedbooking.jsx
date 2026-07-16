import { CornerDownLeft } from "lucide-react";
import Container from "../../components/common/Container";
import Navbar from "../../layouts/Navbar";
import { useConfirmbookingQuery } from "../../services/confirmBookingApi";
import { useGetBookingByIdQuery } from "../../services/organizerBookingApi";
import { CarryOutOutlined, CheckCircleOutlined, CreditCardOutlined, EnvironmentOutlined, RightOutlined, ScheduleOutlined ,CalendarOutlined} from "@ant-design/icons";
import OrganizerDetailsForm from "../../components/organizerdash/organizerdetailsform";
import Ca from "zod/v4/locales/ca.cjs";
import ModalTicket from "./modalticket";
import { useState } from "react";

export default function ConfirmedBooking({}){
    const{data,isSuccess}=useConfirmbookingQuery()
    console.log(data)

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const showModal = (booking) => {
        setSelectedBooking(booking)
        setIsModalOpen(true);
    };
     const ChangeShow = () => {
        setIsModalOpen(false);
    };
    // console.log(data.count)?
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
            case "confirmed":
            return {
                text: "Confirmed",
                className: "bg-green-100 text-green-700",
            };
            case "paid":
            return {
                text: "Paid",
                className: "bg-green-100 text-green-700",
            };

            case "failed":
            return {
                text: "Failed",
                className: "bg-red-100 text-red-700",
            };

            default:
            return {
                text: status,
                className: "bg-red-100 text-red-700",
            };
        }
        };

    return(
        <>
            
                <>
                    <Navbar/>
                    <Container className="">
                        <div className="  pt-12   w-full">
                            <h1 className="text-2xl md:text-3xl font-bold">My Confirmed Booking</h1>
                            <p className="text-[#6b7280] text-base md:text-lg mt-2">You have {data?.count} confirmed booking</p>
                        </div>
                        {isSuccess&&
                            data?.data?.map((event)=>(
                            <div key={event._id}>
                                <div 
                                   className="bg-white border border-[#E5E7EB] rounded-2xl p-5 mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-center shadow-sm hover:shadow-md transition"
                                    
                                >

                                    <div className="">
                                        {event.eventId.images?.length > 0 && (
                                            <img
                                                src={event.eventId.images[0]}
                                                alt={event.eventId.title}
                                                className="w-full h-56 md:h-64 lg:h-full object-cover rounded-lg"
                                            />
                                            )}
                                        
                                    </div>
                                    <div className=" flex flex-col gap-4">
                                        <h2 className="text-lg font-medium text-[#0F0A1E]">{event.eventId.title}</h2>
                                        <p className="text-[#6b7280]"><EnvironmentOutlined style={{color:"#6b7280",marginRight:"10px"}} />{event.eventId.location}</p>
                                        <p className="text-[#6b7280]"><ScheduleOutlined style={{color:"#6b7280",marginRight:"10px"} }/>
                                            {new Date(event.eventId.date).toLocaleDateString("en-GB", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                            })}{" "}
                                            at{" "}
                                            {new Date(event.eventId.date).toLocaleTimeString("en-US", {
                                                hour: "numeric",
                                                minute: "2-digit",
                                                hour12: true,
                                            })}
                                        </p>
                                        <p
                                           className={`inline-flex w-fit self-start items-center px-3 py-1 rounded-full text-sm font-medium ${getStatus(event.status).className}`}
                                            >
                                            <CheckCircleOutlined className="mr-2" />
                                            {getStatus(event.status).text}
                                        </p>
                                        <p
                                            className={`inline-flex w-fit self-start items-center px-3 py-1 rounded-full text-sm font-medium ${getStatus(event.paymentStatus).className}`}
                                            >
                                            <CreditCardOutlined className="mr-2" />
                                            Payment: {getStatus(event.paymentStatus).text}
                                        </p>
                                    </div>
                                    <div className="flex flex-col gap-3 lg:items-start">
                                            <div className="mt-2">
                                                <p className="text-[#6b7280] text-lg">Total</p>
                                                <p className="text-lg font-medium text-[#0F0A1E]">
                                                    {event.totalPrice} $
                                                </p>
                                            </div>
                                            <div className="mt-2">
                                                <p className="text-[#793EED] text-lg">Ticket No.</p>
                                                <p className="text-lg  text-[#0F0A1E]">
                                                    {event.ticketNumber} 
                                                </p>
                                            </div>
                                            <button 
                                                className="w-full lg:w-auto bg-[#793EED] px-5 py-3 text-white font-medium rounded-xl cursor-pointer flex items-center justify-center"
                                                onClick={()=>showModal(event)}
                                                >
                                                
                                                <CarryOutOutlined className="mr-3" />
                                                    View Ticket
                                                <RightOutlined className="ml-auto lg:ml-6" />
                                            </button>
                                    </div>
                                </div>

        
                                
                            </div>  
                            )
                                
                            )
                            
                        }

                        <ModalTicket
                            showModal={isModalOpen}
                            ChangeShow={ChangeShow}
                            data={selectedBooking}
                        />

                        

                    </Container>
                </>

          
        </>
       
    )
}