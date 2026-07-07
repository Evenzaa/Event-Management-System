import { NavLink } from "react-router-dom";
import { AsideLinks } from "../../store/asidelinks";

export default function Aside(){
    return(
        <>
            <div className=" w-full lg:w-[20%] bg-[#1A1033]  text-white rounded-xl p-3 border border-[#3D2874]">
                  <nav>
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

            </div>
          
        </>  
    )
}