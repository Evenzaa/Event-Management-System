
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { AsideLinks } from "../../store/asidelinks";
import { Avatar } from "antd";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";

export default function Aside(){
    const [isOpen, setIsOpen] = useState(false);
    const user = JSON.parse(localStorage.getItem("user"));
    const name = user?.name;
    const email = user?.email;

    const closeMenu = () => setIsOpen(false);

    return(
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="lg:hidden fixed top-4 left-4 z-50 bg-[#1A1033] text-white p-2.5 rounded-lg border border-[#3D2874] shadow-md"
                aria-label="Open menu"
            >
                <MenuOutlined style={{ fontSize: "20px" }} />
            </button>

            {isOpen && (
                <div
                    onClick={closeMenu}
                    className="lg:hidden fixed inset-0 bg-black/50 z-40"
                />
            )}

            <div
                className={`
                    fixed lg:static top-0 left-0 h-full lg:h-auto
                    w-[80%] max-w-[280px] lg:w-[20%]
                    bg-[#1A1033] text-white rounded-none lg:rounded-xl
                    border-r lg:border border-[#3D2874]
                    flex flex-col z-50
                    transition-transform duration-300 ease-in-out
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}
                    lg:translate-x-0
                `}
            >
                <div className="flex items-center justify-between p-3 lg:hidden">
                    <span className="font-semibold text-white/90">Menu</span>
                    <button
                        onClick={closeMenu}
                        className="p-1.5 rounded-lg hover:bg-[#3D2874] transition"
                        aria-label="Close menu"
                    >
                        <CloseOutlined style={{ fontSize: "18px" }} />
                    </button>
                </div>

                <nav className="p-3">
                    {
                        AsideLinks.map((link)=>(
                            <NavLink
                                key={link.id}
                                to={link.to}
                                end={link.end}
                                onClick={closeMenu}
                                className={({isActive})=> `${isActive ? "bg-gradient-to-r from-[#793EED] to-[#3E7FF6] text-zinc-50" : ""} block pt-4 pb-4 pl-4 mb-3 rounded-xl text-white/70  hover:text-white hover:bg-[#3D2874] transition-all `}
                            >
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
                            className="text-lg font-bold"
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