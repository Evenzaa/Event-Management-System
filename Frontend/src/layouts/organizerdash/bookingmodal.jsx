// import { Button, Modal } from "antd";
import { CarryOutOutlined, QrcodeOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Modal } from 'antd';
import InfoItem from '../../components/organizerdash/infoitem';

 import { QRCode } from "antd";

export default function BookingModal({show,changeShow,databooking}){
    

    const getStatus = (status) => {
        if (!status) {
            return {
            text: "-",
            className: "",
            };
        }
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
    
    return(
        <>
            <Modal
                title={
                    <h2 className="text-xl font-bold text-[#1A1033]">
                    Booking Details
                    </h2>
                }
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={show}
                onOk={changeShow}
                onCancel={changeShow}
                width="90%"
                style={{ maxWidth: 580 }}
                mask={{closable:false}}

            >
                
                <div className="bg-[#F8F7FF] p-3 sm:p-4">
                    <div className={ "bg-white border mt-2 border-[#E5E7EB] rounded-xl p-4 flex flex-col gap-4"}>
                        <h1 className="text-base font-semibold whitespace-nowrap text-[#1A1033]">
                            <UserOutlined style={{color:"#793EED",fontSize:"20px",marginRight:"10px"}} /> Customer Information
                        </h1>
                        <InfoItem
                            title={"Name"}
                            info={databooking?.userId?.name} 
                        />
                        <InfoItem
                            title={"Email"}
                            info={databooking?.userId?.email} 
                        />
                    </div>
                    <div className={ "bg-white border mt-2 border-[#E5E7EB] rounded-xl p-4 flex flex-col gap-4"}>
                        <h1 className="text-base font-semibold whitespace-nowrap text-[#1A1033]">
                            <CarryOutOutlined style={{color:"#793EED",fontSize:"20px",marginRight:"10px"}} /> Booking Information
                        </h1>
                        <InfoItem
                            title={"Ticket Number"}
                            info={databooking?.ticketNumber} 
                           ui="flex flex-col sm:flex-row sm:justify-between gap-2"
                        />
                        <InfoItem
                            title={"Quantity"}
                            info={databooking?.quantity} 
                           ui="flex flex-col sm:flex-row sm:justify-between gap-2"
                        />
                        <InfoItem
                            title={"Total Price"}
                            info={`${databooking?.totalPrice} $`} 
                           ui="flex flex-col sm:flex-row sm:justify-between gap-2"
                        />
                        <InfoItem
                            title={"Coupon Code"}
                            info={databooking?.couponCode}
                           ui="flex flex-col sm:flex-row sm:justify-between gap-2"
                        />
                        <InfoItem
                            title={"Payment Method"}
                            info={databooking?.paymentMethod}
                           ui="flex flex-col sm:flex-row sm:justify-between gap-2" 
                        />
                        <InfoItem
                            title={"Payment Status"}
                            info={getStatus(databooking?.paymentStatus).text} 
                           ui="flex flex-col sm:flex-row sm:justify-between gap-2"
                            iui={`${getStatus(databooking?.paymentStatus).className}  rounded-full w-fit`}
                        />
                       <InfoItem
                            title={"Booking Status"}
                            info={getStatus(databooking?.status).text} 
                           ui="flex flex-col sm:flex-row sm:justify-between gap-2"
                            iui={`${getStatus(databooking?.status).className} rounded-full w-fit`}
                        />
                        <InfoItem
                            title={"Created At"}
                            info={
                                databooking?.createdAt
                                ? `${new Date(databooking.createdAt).toLocaleDateString("en-GB", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                    })} at ${new Date(databooking.createdAt).toLocaleTimeString("en-US", {
                                    hour: "numeric",
                                    minute: "2-digit",
                                    hour12: true,
                                    })}`
                                : "-"
                            }
                            ui="flex flex-col sm:flex-row sm:justify-between gap-2"
                        />
                        <InfoItem
                            title={"Event ID"}
                            info={databooking?.eventId} 
                           ui="flex flex-col sm:flex-row sm:justify-between gap-2"
                        />
                        <InfoItem
                            title={<>
                                        <QrcodeOutlined style={{ marginRight: 8, color:"#793EED",fontSize:"20px" }} />
                                        QR Code
                                    </>
                                    }
                             info={<img
                                        src={databooking?.qrCode}
                                        alt="QR Code"
                                        className="w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 rounded-lg border mx-auto mt-3"
                                        />
                                    }
                            ui={"flex flex-col "}
                        />
                        
                    </div>
                    
                </div>
            </Modal>
        
        </>
    )
}