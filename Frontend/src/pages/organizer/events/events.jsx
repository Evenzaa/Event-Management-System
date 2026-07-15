import { DeleteOutlined, EditOutlined, EnvironmentOutlined, ExclamationCircleFilled, EyeOutlined, InboxOutlined, MoreOutlined, PlusOutlined } from "@ant-design/icons";
import ButtonDash from "../../../components/organizerdash/button";
import MainTitle from "../../../components/organizerdash/maintitle";
import TableEvent from "../../../components/organizerdash/tableevents";
import { useDeleteEventMutation, useGetEventsQuery, useLazyGetEventSearchQuery } from "../../../services/organizerEventApi";
import Cell from "../../../components/organizerdash/cell";
import img from"../../../assets/culinary_expo_banner.jpg"
import {  Dropdown, Modal, Spin } from "antd";
import { useEffect, useState } from "react";
import { useContext } from "react";
import UserContext from "../../../store/context";
import SearchEvent from "../../../components/organizerdash/eventsearch";
import { useNavigate } from "react-router-dom";




export default function Events(){
    const navigate=useNavigate()
    const {
    showModal,
    setShowModal,
    modeModal,
    setModeModal,
    editId,
    setEditId,
    } = useContext(UserContext);

    const[deleteEvent]=useDeleteEventMutation()
     const[displayData,setDisplayData]=useState(null)
        const[getsearchdata]=useLazyGetEventSearchQuery()
        const [filters, setFilters] = useState({
            search: "",
            status: "",
        });

    const { data,isLoading,isError,isSuccess,refetch} =useGetEventsQuery();

    console.log(data);
    console.log(data?.data);

    const changeShow=()=>setShowModal(false)
    
   
    const editEvent = (_id) => {
    setShowModal(true);
    setModeModal("edit");
    setEditId(_id);
    };
    const { confirm } = Modal;

    const delEvent = (_id) => {
    confirm({
        title: "Are you sure you want to delete this event?",
        icon: <ExclamationCircleFilled />,
        content: "This action cannot be undone.",
        okText: "Yes",
        okType: "danger",
        cancelText: "No",

        async onOk() {
        try {
            await deleteEvent({ id: _id }).unwrap();
            refetch();
        } catch (e) {
            console.log(e);
        }
        },

        onCancel() {
        console.log("Cancel");
        },
    });
    };

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
       
        const recentEvents = displayData?.data
        ? [...displayData.data]
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            
        : [];

       

        useEffect(()=>{
            const setdata=()=>{
                if(isSuccess){
                    setDisplayData(data)
                }
            }
            setdata()
        },[isSuccess,data])

       const doSearch = async (newFilters) => {
            const updatedFilters = {
                ...filters,
                ...newFilters,
            };

            setFilters(updatedFilters);

            try {
                const res = await getsearchdata(updatedFilters).unwrap();
                setDisplayData(res);
            } catch (e) {
                console.log(e);
            }
        };

        const items = (td)=>[
        {
            label: 'View',
            key: 'view',
            icon: <EyeOutlined style={{marginRight:"4px", color:"#3E7FF6", cursor:"pointer",fontSize:"18px",marginRight:"10px"}} />
        },
        {
            label: 'Edit',
            key: 'edit',
            icon: <EditOutlined style={{marginRight:"4px", color:"#10B981", cursor:"pointer",fontSize:"18px",marginRight:"10px"}}/>,
        },
        {
            label: 'Delete',
            key: 'delete',
            icon: <DeleteOutlined style={{color:"#EF4444",cursor:"pointer",fontSize:"18px",marginRight:"10px",}} />,
            // danger: true,
        },
        ];

    return(
        <>
            <div className="w-full">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-7">
                    <MainTitle>
                        <h1 className="text-2xl md:text-[25px] font-bold">Events</h1>
                        <span className="text-slate-500 text-sm">
                            Manage all your event listings in one place
                        </span>
                    </MainTitle>

                    <ButtonDash
                        icon={<PlusOutlined style={{ marginRight: "7px" }} />}
                        content="Create Event"
                        onClick={
                            ()=>{
                                setEditId(null);
                                setShowModal(true);
                                setModeModal("create")}
                        }
                        ui="bg-[#1A1033] text-white hover:bg-[#0F0A1E] w-full md:w-auto justify-center"
                    />
                </div>

                <SearchEvent
                    runsearch={(value) => doSearch({ search: value })}
                    runStatus={(value) => doSearch({ status: value })}
                />

                {
                    isSuccess&&
                    <div className="w-full md:overflow-visible overflow-x-auto">

                        <TableEvent>
                           {
                               recentEvents.length > 0 ? (
                                 recentEvents.map((td) => (

                                <tr key={td._id} className="text-center bg-white">
                                    <Cell ui={"p-2"}>
                                        <div className="flex  items-center">
                                           <img
                                                src={td.images[0]}
                                                alt={td.title}
                                                className="w-12 h-12 rounded-lg object-cover mr-3"
                                                onError={(e) => {
                                                    e.currentTarget.src = img;
                                                }}
                                            />
                                            <span className="text-sm font-medium mb-0.5 whitespace-nowrap max-w-[180px] truncate"> {td.title}</span>
                                        </div>
                                    </Cell>
                                     <Cell ui={"p-2"}>
                                        <span className="text-sm font-medium whitespace-nowrap"> {td.category}</span>
                                    </Cell>
                                   <Cell>
                                        <div className="flex flex-col">
                                            <span className="font-medium text-sm mb-0.5 whitespace-nowrap">{new Date(td.date).toLocaleDateString()}</span>
                                            <span className="text-xs text-[#6b7280] whitespace-nowrap">
                                                {new Date(td.date).toLocaleTimeString("en-US", {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </span>
                                            </div>                                                                
                                    </Cell>
                                    <Cell> <EnvironmentOutlined style={{color:"#6b7280",fontSize:"15px"}} /> <span className="text-sm font-medium text-[#6b7280] whitespace-nowrap">{td.location}</span></Cell>
                                    <Cell><span className="font-medium whitespace-nowrap">{td.capacity}</span></Cell>
                                    <Cell><span className="font-medium whitespace-nowrap">{td.availableSeats}</span></Cell>
                                    <Cell>
                                        <span
                                                className={`px-3 py-1 rounded-full text-xs font-medium ${getStatus(td.status).className} whitespace-nowrap`}
                                            >
                                                {getStatus(td.status).text}
                                        </span>
                                    </Cell>
                                    <Cell>
                                            <Dropdown  menu={{
                                                    items: items(td),
                                                    onClick: ({ key }) => {
                                                    if (key === "view") {
                                                        navigate(`/organizerdetails/${td._id}`);
                                                    }

                                                    if (key === "edit") {
                                                        editEvent(td._id);
                                                    }

                                                    if (key === "delete") {
                                                        delEvent(td._id);
                                                    }
                                                    },
                                                }}
                                                trigger={["click"]} placement="bottomLeft"
                                            >
                                                <MoreOutlined  style={{cursor:"pointer"}}/>
                                            </Dropdown>
                                    </Cell> 
                                </tr>
                            ))): (
                                <tr>
                                    <td colSpan={8} className="py-12">
                                        <div className="flex flex-col items-center gap-2 text-gray-500">
                                            <InboxOutlined className="text-4xl text-gray-300" />
                                            <span className="font-medium">No events found</span>
                                            <span className="text-sm text-gray-400">
                                                Create your first event to get started.
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </TableEvent>
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
                        error loading events
                    </div>
                }

                    

            </div>
            
        
            
        </>
    )
}