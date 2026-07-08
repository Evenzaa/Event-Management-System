import { DollarOutlined, CalendarOutlined, ScheduleOutlined, AlertFilled } from "@ant-design/icons/es/icons/index";
import MainTitle from "../../components/organizerdash/maintitle";
import Widget from "../../components/organizerdash/widget";
import Aside from "../../layouts/organizerdash/aside";
import DashContent from "../../layouts/organizerdash/dashcontent";
import { useDashboardQuery } from "../../services/organizerDashApi";
import { Alert,Skeleton,Spin } from 'antd';
import DashAction from "../../components/organizerdash/dashaction";
import EventContainer from "../../components/organizerdash/eventcontainer";


export default function DashHome(){
     const user = JSON.parse(localStorage.getItem("user"));
    const name = user?.name;

     const{data,isLoading,isSuccess,isError}=useDashboardQuery()
        console.log(data)
        if (isSuccess) {
        console.log(data.totalBookings);
        }

        
       

    return(
        <>
            <div className="w-full">
                <MainTitle>
                    
                        <h1 className="text-[25px] font-bold">welcome Back, {name}!</h1>
                        <span className="text-slate-500 text-sm">Here's what's happening with your events today</span>
                    
                    
                </MainTitle>
                
                    
                    {isSuccess&&
                        <div className=" grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                            <Widget
                                icon={<CalendarOutlined  />}
                                ui={"text-[#793EED] bg-[#F3EDFF]"}
                                title="Total Events"
                                count={data?.totalEvents}
                            />
                            <Widget
                                icon={<ScheduleOutlined />}
                                ui={"bg-[#DBEAFE] text-[#3E7FF6] "}
                                title="Total Bookings"
                                count={data?.totalBookings}
                            />
                            <Widget
                                icon={<DollarOutlined />}
                                ui={"text-[#10B981] bg-[#D1FAE5]"}
                                title="Total Revenue"
                                count={data?.totalRevenue}
                            />
                        </div>
                    }   
                     {
                        isError&&
                        <div>
                            error loading dashboard
                        </div>
                    }
                     {
                        isLoading&&
                        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
                            <Spin description="Loading..." size="large" style={{margin:"0 auto"}}>
                        </Spin>

                        </div>
                        
                    }

                    <DashAction/>
                    <EventContainer/>
                    

                
                

            </div>
            
        </>
    )
}