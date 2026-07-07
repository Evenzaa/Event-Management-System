import { Outlet } from "react-router-dom";

export default function DashData(){
    return(
        <div className="
            bg-[#F8F7FF]
            p-3
            md:p-5
            min-w-0
        ">
            <Outlet/>
        </div>
    )
}