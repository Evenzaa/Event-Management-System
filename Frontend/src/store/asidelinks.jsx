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
        to:"booking",
        icon:<ScheduleOutlined style={{marginRight:"13px"}}/>,
        label:"Bookings"
    },
     {
        id:4,
        to:"review",
        icon:<StarOutlined style={{marginRight:"13px"}}/>,
        label:"Reviews"
    },
    //  {
    //     id:5,
    //     to:"setting",
    //     icon:<SettingOutlined style={{marginRight:"13px"}} />,
    //     label:"Settings"
    // },
]