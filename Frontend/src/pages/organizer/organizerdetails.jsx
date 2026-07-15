import { useParams } from "react-router-dom";
import Navbar from "../../layouts/Navbar";
import { useGetEventsbyIdQuery } from "../../services/organizerEventApi";
import EventGallery from "../public/sections/EventGallery";
import EventBanner from "../public/sections/EventBanner";
import EventInfo from "../public/sections/EventInfo";
import CountdownTimer from "../public/sections/CountdownTimer";
import AboutSection from "../public/sections/AboutSection";
import { AppstoreOutlined, CheckCircleOutlined , DollarOutlined, FireOutlined, GiftOutlined, InfoCircleOutlined, ScheduleOutlined, StarOutlined, SyncOutlined, TeamOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import OrganizerDetailsForm from "../../components/organizerdash/organizerdetailsform";
import Footer from "../../layouts/Footer";
import { Spin } from "antd";

export default function OrganizerDetails (){

    const { id } = useParams();
    const{data,isSuccess,isLoading,isError}=useGetEventsbyIdQuery(id)
    console.log(data);

    const getStatus = (status) => {
         if (!status) {
                return {
                    text: "",
                    className: "bg-gray-100 text-gray-700",
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
            {isSuccess&&
                <div className="min-h-screen bg-slate-50 flex flex-col">
                    <Navbar />
                    <main className="flex-grow pb-20">
                        <EventBanner
                            bannerImage={data?.data?.images} 
                            title={data?.data?.title}
                        />
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-24 relative z-10">
                            <div className="bg-white rounded-3xl shadow-sm p-6 sm:p-8 lg:p-10">
                                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

                                    {/* Left Column */}
                                    <div className="flex-1 min-w-0">
                                        <EventInfo
                                            title={data?.data?.title}
                                            tags={data?.data?.tags}
                                            date={data?.data?.date}
                                            location={data?.data?.location}
                                            organizer={data?.data?.organizerId.name}
                                        />
                                        <CountdownTimer targetDate={data?.data?.date} />
                                        <AboutSection content={data?.data?.description} />
                                        <EventGallery galleryImages={data?.data?.images} />
                                    </div>

                                    {/* Right Column */}
                                    <div className="w-full lg:max-w-[400px] xl:max-w-[450px]">
                                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100  top-24">
                                            <h2 className="text-xl font-bold text-slate-900 mb-4">Event Overview</h2>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                                <OrganizerDetailsForm
                                                    title={"Category"}
                                                    info={data?.data?.category}
                                                    icon={ <AppstoreOutlined style={{fontSize:"20px",color:"#793EED"}}/>}
                                                    iui={"bg-[#3E7FF6] px-3 py-1 rounded-full  text-white"}
                                                />
                                                <OrganizerDetailsForm
                                                    title={"Status"}
                                                    info={getStatus(data?.data?.status).text}
                                                    icon={<CheckCircleOutlined  style={{fontSize:"20px",color:"#793EED"}}/>}
                                                    iui={ `px-3 py-1 rounded-full  ${getStatus(data?.data?.status).className}`}
                                                />
                                                <OrganizerDetailsForm
                                                    title={"Capacity"}
                                                    info={data?.data?.capacity}
                                                    icon={ <TeamOutlined  style={{fontSize:"20px",color:"#793EED"}}/>}
                                                />
                                                <OrganizerDetailsForm
                                                    title={"Available Seats"}
                                                    info={data?.data?.availableSeats}
                                                    icon={ <UsergroupAddOutlined  style={{fontSize:"20px",color:"#793EED"}}/>}
                                                />
                                                    <OrganizerDetailsForm
                                                    title={"Price"}
                                                    info={`${data?.data?.price} $`}
                                                    icon={ <DollarOutlined  style={{fontSize:"20px",color:"#793EED"}}/>}
                                                />
                                                <OrganizerDetailsForm
                                                    title={"Discount Price"}
                                                    info={`${(data?.data?.discountPrice===null)?"_____":` ${data?.data?.discountPrice} $`} `}
                                                    icon={ <GiftOutlined  style={{fontSize:"20px",color:"#793EED"}}/>}
                                                />
                                                <OrganizerDetailsForm
                                                    title={"Featured"}
                                                    info={`${(data?.data?.featured===false)? "No":"Yes"} `}
                                                    icon={ <StarOutlined   style={{fontSize:"20px",color:"#793EED"}}/>}
                                                    iui={"bg-[#F8F7FF] px-3 py-1 rounded-full "}
                                                />
                                                <OrganizerDetailsForm
                                                    title={"Last Minute"}
                                                    info={`${(data?.data?.isLastMinute===false)? "No":"Yes"} `}
                                                    icon={ <FireOutlined   style={{fontSize:"20px",color:"#793EED"}}/>}
                                                    iui={"bg-[#F8F7FF] px-3 py-1 rounded-full "}
                                                />
                                            </div>
                                        </div>
                                        <div className="bg-white p-6 mt-4 rounded-2xl shadow-sm border border-slate-100  top-24">
                                            <h2 className="text-xl font-bold text-slate-900 mb-4">Event Timeline</h2>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                                <OrganizerDetailsForm
                                                    title={"Created At"}
                                                    info= {   <>
                                                                <span className="font-semibold text-sm mb-0.5 whitespace-nowrap">
                                                                {new Date(data?.data?.createdAt).toLocaleDateString()}
                                                                </span>

                                                                <span className="text-sm font-medium ml-2 text-[#6b7280] whitespace-nowrap">
                                                                {new Date(data?.data?.createdAt).toLocaleTimeString("en-US", {
                                                                    hour: "2-digit",
                                                                    minute: "2-digit",
                                                                })}
                                                                </span>
                                                        </>}
                                                    icon={ <ScheduleOutlined   style={{fontSize:"20px",color:"#793EED"}}/>}
                                                />
                                                <OrganizerDetailsForm
                                                    title={"Updated At"}
                                                    info= {   <>
                                                                <span className="font-semibold text-sm mb-0.5 whitespace-nowrap">
                                                                {new Date(data?.data?.updatedAt).toLocaleDateString()}
                                                                </span>

                                                                <span className="text-sm font-medium ml-2 text-[#6b7280] whitespace-nowrap">
                                                                {new Date(data?.data?.updatedAt).toLocaleTimeString("en-US", {
                                                                    hour: "2-digit",
                                                                    minute: "2-digit",
                                                                })}
                                                                </span>
                                                        </>}
                                                    icon={ <SyncOutlined  style={{fontSize:"20px",color:"#793EED"}}/>}
                                                />
                                            </div>

                                        </div>
                                        <div className="bg-[#F8F7FF] p-6 mt-4 rounded-2xl shadow-sm border border-slate-100  top-24">

                                            <InfoCircleOutlined style={{fontSize:"20px",color:"#793EED"}} />
                                            <h2 className=" text-[#3D2874] font-semibold text-lg inline ml-4">Event Id : </h2>
                                            <p className="inline-block w-fit text-[#793EED]">{data?.data?._id}</p>
                                                                
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>

                    <Footer/>
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
                        error loading event details
                    </div>
                }  
        </>
    )
}