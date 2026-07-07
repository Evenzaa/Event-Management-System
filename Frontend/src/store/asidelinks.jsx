import { CalendarOutlined, HomeOutlined, ScheduleOutlined, SettingOutlined, StarOutlined, TagOutlined } from "@ant-design/icons";

export const AsideLinks=[
    {
        id:1,
        to:"/organizer-dashboard",
        end: true,
        icon: <HomeOutlined style={{marginRight:"13px"}} />,
        label:"Dashboard"
    },
     {
        id:2,
        to:"events",
        icon:<CalendarOutlined style={{marginRight:"13px"}}/>,
        label:"Events"
    },
     {
        id:3,
        to:"mm",
        icon:<ScheduleOutlined style={{marginRight:"13px"}}/>,
        label:"Bookings"
    },
     {
        id:4,
        to:"mm",
        icon:<StarOutlined style={{marginRight:"13px"}}/>,
        label:"Reviews"
    },
     {
        id:5,
        to:"mm",
        icon:<TagOutlined style={{marginRight:"13px"}}/>,
        label:"Coupons"
    },
     {
        id:6,
        to:"mm",
        icon:<SettingOutlined style={{marginRight:"13px"}} />,
        label:"Settings"
    },
]