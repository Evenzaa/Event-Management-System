import { DeleteOutlined, EditOutlined, EnvironmentOutlined, ExclamationCircleFilled, EyeOutlined, InboxOutlined, PlusOutlined, StarFilled } from "@ant-design/icons";
import ButtonDash from "../../../components/organizerdash/button";
import MainTitle from "../../../components/organizerdash/maintitle";
import TableEvent from "../../../components/organizerdash/tableevents";
import { useDeleteEventMutation, useGetEventsQuery } from "../../../services/organizerEventApi";
import Cell from "../../../components/organizerdash/cell";
import img from"../../../assets/culinary_expo_banner.jpg"
import { Modal, Spin } from "antd";
import { useState } from "react";
import AddEditPage from "../../../layouts/organizerdash/addeditpage";

import { useContext } from "react";
import UserContext from "../../../store/context";

export default function Events(){
    const {
  showModal,
  setShowModal,
  modeModal,
  setModeModal,
  editId,
  setEditId,
} = useContext(UserContext);

    // const[editId,setEditId]=useState(null)
    const[deleteEvent]=useDeleteEventMutation()

    const { data,isLoading,isError,isSuccess,refetch} =useGetEventsQuery();

    console.log(data);
    console.log(data?.data);

    // const[showModal,setShowModal]=useState(false)
    const changeShow=()=>setShowModal(false)
    // const[modeModal,setModeMoal]=useState("create")

    // const editEvent=(_id)=>{
    //     setShowModal(true)
    //     setModeMoal('Edit')
    //     setEditId(_id)
    //     console.log(_id)
    // }
    const editEvent = (_id) => {
    setShowModal(true);
    setModeModal("Edit");
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
                            ()=>{setShowModal(true);
                                setModeMoal("create")}
                        }
                        ui="bg-[#1A1033] text-white hover:bg-[#0F0A1E] w-full md:w-auto justify-center"
                    />
                </div>

                {
                    isSuccess&&
                    <div className="w-full md:overflow-visible overflow-x-auto">

                        <TableEvent>
                           {
                               data?.data?.length > 0 ? (
                                 data.data.map((td) => (

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
                                        <EyeOutlined  style={{marginRight:"4px", color:"#3E7FF6", cursor:"pointer"}}
                                         
                                        />
                                        <EditOutlined style={{marginRight:"4px", color:"#10B981", cursor:"pointer"}}
                                            onClick={()=>editEvent(td._id)} 
                                            
                                         />
                                        <DeleteOutlined style={{color:"#EF4444",cursor:"pointer"}}
                                        onClick={()=>delEvent(td._id)}/>
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

                <AddEditPage
                    show={showModal}
                    changeShow={changeShow}
                    mode={modeModal}
                    eventId={editId}
                    refetch={refetch}
                >

                </AddEditPage>
                    

            </div>
            
        
            
        </>
    )
}