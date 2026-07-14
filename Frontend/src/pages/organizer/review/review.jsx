import MainTitle from "../../../components/organizerdash/maintitle";
import { Avatar, Rate, Select, Spin } from 'antd';
import { useGetEventsQuery } from "../../../services/organizerEventApi";
import { CalendarOutlined, FileTextOutlined, StarOutlined } from "@ant-design/icons";
import Widget from "../../../components/organizerdash/widget";
import { useGetReviewByIdQuery } from "../../../services/organizerReviewApi";
import { useState } from "react";


const onSearch = value => {
  console.log('search:', value);
};

export default function Review() {
  const [eventId, setEventId] = useState();

  const { data } = useGetEventsQuery();
  console.log(data?.data);

  const { data: datareview, isLoading, isError, isSuccess } = useGetReviewByIdQuery(eventId, {
    skip: !eventId,
  });

  console.log(datareview);
  console.log(datareview?.data?.[0]?.userId?.name);

  const onChange = value => {
    console.log(`selected ${value}`);
    setEventId(value);
  };

  return (
    <>
      <div>
        <MainTitle>
          <h1 className="text-2xl md:text-[25px] font-bold">Reviews</h1>
          <span className="text-slate-500 text-sm">
            See feedback from attendes and improve your events.
          </span>
        </MainTitle>
        
        <div className="w-full bg-white border border-[#E5E7EB] rounded-xl p-6 mt-7 flex flex-col sm:flex-row sm:items-center gap-4">
          <span className="font-medium">Select Event</span>
          <Select
            className="w-full sm:w-[250px]"
            // showSearch
            optionFilterProp="label"
            onSearch={onSearch}
            placeholder={
              <span>
                <CalendarOutlined style={{ marginRight: 8 }} />
                Select event
              </span>
            }
            onChange={onChange}
            options={data?.data.map((event) => ({
              value: event._id,
              label: event.title,
            }))}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-6">
          <Widget
            icon={<StarOutlined />}
            ui={"bg-[#DBEAFE] text-[#3E7FF6] "}
            pui={"bg-[#EFF6FF]"}
            title="Average Rating"
            content={"Out of 5"}
            count={
              <div className="flex items-center justify-center gap-2 flex-wrap">
                {datareview?.averageRating ?? 0}
                <Rate
                  disabled
                  allowHalf
                  value={datareview?.averageRating ?? 0}
                />
              </div>
            }
          />
          <Widget
            icon={<FileTextOutlined />}
            ui={"text-[#10B981] bg-[#D1FAE5]"}
            pui={"bg-[#F7FEFA]"}
            title="Total Reviews"
            content={"Reviews"}
            count={datareview?.count ?? 0}
          />
        </div>

        {isSuccess && datareview?.data?.length > 0 ? (
            [...(datareview?.data || [])]
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((user) => (
            <div
              className="w-full bg-white border-b border-[#E5E7EB] rounded-xl p-6 mt-7 flex flex-col sm:flex-row gap-5"
              key={user._id}
            >
              <Avatar size={{ xs: 40, sm: 45, md: 50 }}>
                {user.userId?.name
                  ?.split(" ")
                  .map((word) => word[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </Avatar>
              <div key={user._id} className="flex flex-col justify-between gap-1.5">
                <h3 className="text-lg font-semibold text-[#1A1033]">
                  {user.userId?.name}
                </h3>
                <Rate
                  disabled
                  allowHalf
                  value={user.rating}
                  style={{ fontSize: "16px" }}
                />
                <p className="text-base text-[#0F0A1E]">{user.comment}</p>
                <span className="text-xs text-[#6b7280] font-medium">
                  <CalendarOutlined style={{ marginRight: "10px", fontWeight: "600" }} />
                  {new Date(user.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}{" "}
                  at{" "}
                  {new Date(user.createdAt).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full bg-white border border-[#E5E7EB] rounded-xl p-8 sm:p-12 mt-7 flex flex-col items-center justify-center gap-3 text-center">
            <FileTextOutlined style={{ fontSize: "40px", color: "#6b7280" }} />
            <h1 className="text-lg font-medium text-[#0F0A1E]">
              {eventId ? "No Reviews Yet" : "No Event Selected"}
            </h1>
            <span className="text-base text-[#6b7280] font-medium">
              {eventId
                ? "This event hasn't received any reviews yet."
                : "Please select an event to view its reviews."}
            </span>
          </div>
        )}

        {isLoading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
            <Spin description="Loading..." size="large" style={{ margin: "0 auto" }} />
          </div>
        )}

        {isError && <div>error loading reviews</div>}
      </div>
    </>
  );
}