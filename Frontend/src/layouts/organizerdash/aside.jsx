import { NavLink } from "react-router-dom";
import { AsideLinks } from "../../store/asidelinks";
import { Avatar } from "antd";

export default function Aside(){
    const user = JSON.parse(localStorage.getItem("user"));
    const name = user?.name;
    const email= user?.email
    return(
        <>
            <div className="w-full lg:w-[20%] bg-[#1A1033] text-white rounded-xl border border-[#3D2874] flex flex-col">
                  <nav className="p-3">
                        {
                            AsideLinks.map((link)=>(
                                <NavLink
                                    key={link.id}
                                    to={link.to}
                                    end={link.end}
                                    className={({isActive})=> `${isActive ? "bg-gradient-to-r from-[#793EED] to-[#3E7FF6] text-zinc-50" : ""} block pt-4 pb-4 pl-4 mb-3 rounded-xl text-white/70  hover:text-white hover:bg-[#3D2874] transition-all `}                      >
                                    {link.icon}
                                    {link.label}
                                </NavLink>

                            ))
                        }

                    </nav>

                
                      
                    <div className="mt-auto border-t border-[#3D2874] p-3">
                        <div className="flex items-center gap-4">
                            <Avatar
                             size={50}
                                className="  text-lg font-bold"
                                 style={{
                                    backgroundColor: "#3D2874",
                                    color: "#fff",
                                }}
                            >
                                {name
                                    ?.split(" ")
                                    .map((word) => word[0])
                                    .join("")
                                    .slice(0, 2)
                                    .toUpperCase()}
                            </Avatar>

                            <div className="min-w-0 flex-1">
                                <h3 className="text-base md:text-sm font-semibold text-white truncate">
                                    {name}
                                </h3>

                                <p className="text-xs text-white/70 truncate">
                                    {email}
                                </p>
                            </div>
                        </div>
                    </div>
                    
            </div>
          
        </>  
    )
}