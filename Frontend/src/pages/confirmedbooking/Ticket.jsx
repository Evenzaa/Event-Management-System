import { CheckCircleOutlined,CalendarOutlined ,CreditCardOutlined,QrcodeOutlined } from "@ant-design/icons";
import OrganizerDetailsForm from "../../components/organizerdash/organizerdetailsform";

export default function TicketPDF({  data,
  ticketRef,
  getStatus,
}) {
  return (
    <div
      ref={ticketRef}
      style={{
        width: "600px",
        background: "#fff",
        padding: "20px",
      }}
    >
      
        <h2 className="text-lg sm:text-lg text-center font-medium text-[#0F0A1E] break-words">{data?.eventId?.title}</h2>
        
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
  );
}