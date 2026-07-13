import MainTitle from "../../../components/organizerdash/maintitle";
import { Avatar, Rate, Select, Spin } from 'antd';
import { useGetEventsQuery } from "../../../services/organizerEventApi";
import { CalendarOutlined, FileTextOutlined, StarOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import Widget from "../../../components/organizerdash/widget";
import { useGetReviewByIdQuery } from "../../../services/organizerReviewApi";
import { useState } from "react";
import ReviewComponent from "../../../components/organizerdash/reviewcomponent";
import { useGetBookingByIdQuery } from "../../../services/organizerBookingApi";
import BookingContainer from "../../../components/organizerdash/bookingcontainer";

const onSearch = value => {
  console.log('search:', value);
};

export default function Booking(){
    const [eventId,setEventId]=useState()

    const {data} = useGetEventsQuery()
    console.log(data?.data)

    const {data:databooking,isLoading,isError,isSuccess}= useGetBookingByIdQuery(eventId, {
        skip: !eventId,})

    console.log(databooking) 
    console.log(databooking?.data?.[0]?.userId?.name);


    const onChange = value => {
    console.log(`selected ${value}`);
      setEventId(value)
    };
    return(
        <>
            <div>
                <MainTitle>
                     <h1 className="text-2xl md:text-[25px] font-bold">Event Bookings</h1>
                        <span className="text-slate-500 text-sm">
                            View bookings for your events and manage them easily.
                        </span>
                </MainTitle>
                <div className="w-full bg-white border border-[#E5E7EB] rounded-xl p-6 mt-7 flex flex-col sm:flex-row sm:items-center gap-4">
                    <span className="font-medium">Select Event</span>
                    <Select
                        className="w-full sm:w-[250px]"
                        showSearch
                        optionFilterProp="label"
                        onSearch={onSearch}
                        placeholder={ 
                            <span>
                                <CalendarOutlined style={{ marginRight: 8 }} />
                                Select event
                            </span> }
                        onChange={onChange}
                        options={data?.data.map((event)=>({
                            value:event._id,
                            label:event.title,

                        }))}
                    />

                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-6">
                    <Widget
                        icon={<UsergroupAddOutlined />}
                        ui={"text-[#793EED] bg-[#F3EDFF]"}
                        pui={" bg-white"}
                        title="Total Bookings"
                        content={"for this event"}
                        count={databooking?.totalBookings??0}
                        
                    />
                </div>

                <BookingContainer
                    eventId={eventId} 
                    databooking={databooking}
                    isLoading={isLoading}
                    isError={isError}
                    isSuccess={isSuccess}
                />

            </div>
        </>
    )
}