import { EnvironmentOutlined,ScheduleOutlined,CalendarOutlined ,DownloadOutlined ,TagOutlined,NumberOutlined,StarOutlined,UserOutlined,QrcodeOutlined,ClockCircleOutlined,CheckCircleOutlined,CreditCardOutlined,CarryOutOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import OrganizerDetailsForm from "../../components/organizerdash/organizerdetailsform";
import TableTicket from "../../components/tableticket";
import Cell from "../../components/organizerdash/cell";
import Button from "../../components/common/Button";
import ButtonDash from "../../components/organizerdash/button";
import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import TicketPDF from "./Ticket";

export default function ModalTicket( {showModal,ChangeShow,data}){
    const ticketRef = useRef(null);
   const [downloading, setDownloading] = useState(false);

const downloadTicket = async () => {
  if (!ticketRef.current || downloading) return;
  setDownloading(true);
  try {
    const dataUrl = await toPng(ticketRef.current, {
      cacheBust: true,
      pixelRatio: 2,
    });

    const pdf = new jsPDF("p", "mm", "a4");

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = dataUrl;

    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
    });

    const pageWidth = 210;
    const pageHeight = 297;
    const imgWidth = pageWidth;
    const imgHeight = (img.height * imgWidth) / img.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(dataUrl, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(dataUrl, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`${data?.ticketNumber || "ticket"}.pdf`);
  } catch (err) {
    console.error("Failed to generate ticket PDF:", err);
  } finally {
    setDownloading(false);
  }
};

     const getStatus = (status) => {
         if (!status) {
        return {
            text: "",
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
            <Modal
                 title={
                    <h2 className="text-xl sm:text-2xl font-bold ">
                    E-Ticket
                    </h2>
                }
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={showModal}
                onOk={ChangeShow}
                onCancel={ChangeShow}
                width="90%"
                style={{ maxWidth: 600 }}
                styles={{
                    body: {
                    maxHeight: "80vh",
                    overflowY: "auto",
                    },
                }}
                mask={{closable:false}}
            >
              <div className="max-w-full overflow-hidden">
                        <div 
                            className="bg-white border border-[#E5E7EB] rounded-2xl  mt-6 shadow-sm hover:shadow-md transition"
                        >
                            <div className="">
                                {data?.eventId?.images?.length > 0 && (
                                    <img
                                        src={data?.eventId?.images[0]}
                                        alt={data?.eventId?.title}
                                        crossOrigin="anonymous"
                                        className="w-full h-40 sm:h-52 md:h-60 object-cover rounded-t-2xl"
                                    />
                                )}
                            </div>
                            <div className="flex flex-col sm:flex-row sm:justify-between p-3 gap-3">
                                <div className="flex gap-3 min-w-0">
                                    <CalendarOutlined style={{fontSize:"32px",color:"#793EED",marginRight:"5px"}} className="shrink-0" />
                                    <div className="flex flex-col gap-1.5 min-w-0">
                                        <h2 className="text-base sm:text-lg font-medium text-[#0F0A1E] break-words">{data?.eventId?.title}</h2>
                                        <p className="text-sm sm:text-base text-[#6b7280] break-words">
                                            {data?.eventId?.location}</p>
                                        <p className="text-sm sm:text-base text-[#6b7280]">
                                            {new Date(data?.eventId?.date).toLocaleDateString("en-GB", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                            })}{" "}
                                            at{" "}
                                            {new Date(data?.eventId?.date).toLocaleTimeString("en-US", {
                                                hour: "numeric",
                                                minute: "2-digit",
                                                hour12: true,
                                            })}
                                        </p>

                                    </div>
                                    
                                </div>
                                <div className="flex flex-row sm:flex-col flex-wrap gap-2 sm:gap-3">
                                    <p
                                           className={`inline-flex w-fit self-start items-center px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap ${getStatus(data?.status).className}`}
                                            >
                                            <CheckCircleOutlined className="mr-1.5 sm:mr-2" />
                                            {getStatus(data?.status).text}
                                        </p>
                                        <p
                                            className={`inline-flex w-fit self-start items-center px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap ${getStatus(data?.paymentStatus).className}`}
                                            >
                                            <CreditCardOutlined className="mr-1.5 sm:mr-2" />
                                            Payment: {getStatus(data?.paymentStatus).text}
                                        </p>
                                </div>
                            </div>
                        </div>
                        <div 
                            className="bg-white border border-[#E5E7EB] rounded-2xl p-3 mt-6 shadow-sm hover:shadow-md transition"
                        >
                            <h2 className="text-base sm:text-lg font-medium text-[#793EED] flex items-center flex-wrap">
                                <CarryOutOutlined style={{fontSize:"20px",marginRight:"12px"}}/>Booking Details</h2>
                                <div className="border-t border-[#E5E7EB] mt-2 pt-3 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                    <OrganizerDetailsForm
                                        title={"Ticket Number"}
                                        icon={<CalendarOutlined style={{fontSize:"20px",color:"#793EED"}}/>}
                                        info={data?.ticketNumber }
                                    />
                                    <OrganizerDetailsForm
                                        title={"Payment Method"}
                                        icon={<CreditCardOutlined style={{fontSize:"20px",color:"#793EED"}}/>}
                                        info={data?.paymentMethod}
                                    />
                                    <OrganizerDetailsForm
                                        title={"Booking Date"}
                                        icon={<ScheduleOutlined style={{fontSize:"20px",color:"#793EED"}}/>}
                                        info={ <div className="flex flex-wrap items-center gap-1">
                                                    <span className="font-semibold text-sm whitespace-nowrap">
                                                        {new Date(data?.createdAt).toLocaleDateString()}
                                                    </span>
                                                    <span className="text-sm font-medium text-[#6b7280] whitespace-nowrap">
                                                        {new Date(data?.createdAt).toLocaleTimeString("en-US", {
                                                        hour: "2-digit",
                                                        minute: "2-digit",})}
                                                    </span>
                                                </div>}
                                    />
                                    <OrganizerDetailsForm
                                        title={"Payment Status"}
                                        icon={<ClockCircleOutlined style={{fontSize:"20px",color:"#793EED"}}/>}
                                        info={getStatus(data?.status).text}
                                        iui={ `px-3 py-1 rounded-full  ${getStatus(data?.status).className}`}
                                    />
                                    <OrganizerDetailsForm
                                        title={"Location"}
                                        icon={<EnvironmentOutlined style={{fontSize:"20px",color:"#793EED"}}/>}
                                        info={data?.eventId?.location}
                                     />     
                                    <OrganizerDetailsForm
                                        title={"Total Price"}
                                        icon={<CreditCardOutlined style={{fontSize:"20px",color:"#793EED"}}/>}
                                        info={`${data?.totalPrice} $`}
                                    />
                            </div>
                        </div>
                        <div 
                            className="bg-white border border-[#E5E7EB] rounded-2xl  mt-6 shadow-sm hover:shadow-md transition"
                        >
                            <h2 className="text-base sm:text-lg font-medium text-[#793EED] p-3 flex items-center">
                            <NumberOutlined  style={{fontSize:"20px",marginRight:"12px"}}/>Tickets</h2>
                               <div className="overflow-x-auto">
                                   <TableTicket>
                                   
                                        {data?.tickets?.map((ticket) => (
                                            <tr key={ticket._id}>
                                                <Cell ui="p-2 sm:p-3 text-center text-xs sm:text-sm whitespace-nowrap">
                                                {ticket.ticketType}
                                                </Cell>

                                                <Cell ui="p-2 sm:p-3 text-center text-xs sm:text-sm whitespace-nowrap">
                                                x {ticket.quantity}
                                                </Cell>

                                                <Cell ui="p-2 sm:p-3 text-center text-xs sm:text-sm whitespace-nowrap">
                                                {ticket.price} $
                                                </Cell>

                                                <Cell ui="p-2 sm:p-3 text-center text-xs sm:text-sm whitespace-nowrap">
                                                {ticket.subtotal} $
                                                </Cell>
                                            </tr>
                                            ))}
                                   
                                   </TableTicket>
                               </div>
                            
                        </div>
                        {data?.couponCode===null?"":
                            <div className="bg-green-100 rounded-xl p-3 mt-6 flex flex-col sm:flex-row gap-2 sm:gap-4 sm:items-center">
                                    <TagOutlined style={{fontSize:"20px" ,color:"#15803D"}}/>
                                    <div>
                                        <h2 className="text-green-700 font-medium text-base sm:text-lg">Coupon Applied</h2>
                                        <p className="text-base sm:text-lg font-medium break-words">{data?.couponCode}</p>
                                    </div>
                            </div>
                            
                        }   
                        <div className="bg-[#F8F7FF] rounded-xl p-3 mt-6 flex flex-col sm:flex-row sm:justify-between gap-1">
                            <h1 className="text-base sm:text-lg font-medium text-[#0F0A1E]">Total Price</h1>
                            <p className="text-base sm:text-lg font-medium text-[#793EED]">{data?.totalPrice} $</p>
                        </div>    
                        <div 
                            className="bg-white border border-[#E5E7EB] rounded-2xl p-3 mt-6 shadow-sm hover:shadow-md transition flex flex-col md:flex-row items-center justify-between gap-4"
                        >
                           
                            <OrganizerDetailsForm
                                        title={"QR Code"}
                                        icon={<QrcodeOutlined style={{fontSize:"20px",color:"#793EED"}}/>}
                                        info={"show this QR code at the event entrance."}
                                    />
                            <img
                                src={`${data?.qrCode}`}
                                alt="QR Code"
                                crossOrigin="anonymous"

                                className="w-32 h-32 sm:w-40 sm:h-40 object-contain"
                            />
                        </div> 
                </div>        
                           
                            <ButtonDash
                                ui={`
                                    w-full sm:w-auto
                                    bg-[#793EED]
                                    text-white
                                    mt-6
                                    text-base sm:text-lg
                                    font-medium
                                    border border-[#793EED]
                                    rounded-xl
                                    transition-all duration-300
                                    hover:bg-[#6C35D8]
                                    hover:shadow-lg
                                    active:scale-95
                                    disabled:opacity-60
                                    disabled:cursor-not-allowed
                                `}
                                icon={
                                    downloading ? (
                                        <span className="animate-spin inline-block mr-2">⏳</span>
                                    ) : (
                                        <DownloadOutlined style={{ marginRight: "7px" }} />
                                    )
                                }
                                content={downloading ? "Downloading..." : "Download Ticket"}
                                onClick={downloadTicket}
                                disabled={downloading}
                        />
                            <div
                                style={{
                                    position: "fixed",
                                    left: "-9999px",
                                    top: 0,
                                }}
                                >
                                <TicketPDF
                                    data={data}
                                    ticketRef={ticketRef}
                                    getStatus={getStatus}
                                />
                            </div>
        
                
            </Modal>
        </>
    )
}