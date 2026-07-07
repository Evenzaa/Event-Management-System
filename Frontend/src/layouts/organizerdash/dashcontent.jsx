import DashData from "./dashdata";

export default function DashContent(){
    return(
        <div className="
            w-full 
            lg:w-[80%]
            min-w-0
            overflow-hidden
            border 
            border-[#E5E7EB] 
            rounded-xl 
            p-4 
            md:p-6
        ">
            <DashData/>
        </div>
    )
}