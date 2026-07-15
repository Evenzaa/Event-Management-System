export default function OrganizerDetailsForm ({title,info,icon,iui}){
    return(
        <>
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-4">
                    {/* <AppstoreOutlined style={{fontSize:"20px",color:"#793EED"}}/> */}
                    {icon}
                    <p className="text-slate-900 font-semibold text-lg">{title}</p> 
                </div>
                                                            
                <span className={`ml-12 inline-block w-fit text-[#6b7280] text-sm font-medium ${iui}`}>{info}</span>
            </div>
        
        </>
    )
}