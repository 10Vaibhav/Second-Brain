import { Logo } from "../icons/Logo";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";
import { Logout } from "../icons/Logout";
import { Button } from "./Button";
import { useState } from "react";
import { InstaIcon } from "../icons/InstaIcon";

type SidebarProps = {
  activeFilter: string | null;
  onFilterChange: (filter: string | null) => void;
}

export function Sidebar({ activeFilter, onFilterChange }: SidebarProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleItemClick = (filter: string) => {
        if (activeFilter === filter) {
            onFilterChange(null);
        } else {
            onFilterChange(filter);
        }
        if (window.innerWidth < 768) {
            setIsOpen(false);
        }
    };

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div className="md:hidden fixed top-0 left-0 z-20 p-4">
                <button 
                    onClick={toggleSidebar}
                    className="p-2 rounded-xl transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-teal-200"
                    style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        color: '#132440',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                    </svg>
                </button>
            </div>

            <div className={`${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} transform transition-all duration-300 ease-in-out h-screen w-64 md:w-72 fixed left-0 top-0 z-10 glass-effect animate-slide-in`}
                 style={{
                   background: 'linear-gradient(180deg, #132440 0%, #16476A 100%)',
                   borderRight: '1px solid rgba(255, 255, 255, 0.1)'
                 }}>
                <div className="flex text-2xl md:text-3xl pt-8 items-center px-6">
                    <div className="text-white flex items-center font-bold">
                        <div className="mr-3 p-2 rounded-xl" style={{backgroundColor: 'rgba(59, 151, 151, 0.2)'}}>
                            <Logo/>
                        </div>
                        Brainly
                    </div>
                </div>

                <div className="pt-8 px-4">
                    <div className="space-y-2">
                        <div onClick={() => handleItemClick("twitter")} className="cursor-pointer">
                            <SidebarItem
                                text="Twitter"
                                icon={<TwitterIcon/>}
                                active={activeFilter === "twitter"}
                            />
                        </div>
                        <div onClick={() => handleItemClick("youtube")} className="cursor-pointer">
                            <SidebarItem
                                text="Youtube"
                                icon={<YoutubeIcon/>}
                                active={activeFilter === "youtube"}
                            />
                        </div>
                        <div onClick={() => handleItemClick("instagram")} className="cursor-pointer">
                            <SidebarItem
                                text="Instagram"
                                icon={<InstaIcon/>}
                                active={activeFilter === "instagram"}
                            />
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-8 left-4 right-4">
                    <Button
                        variant="secondary"
                        text="Logout"
                        size="md"
                        startIcon={<Logout/>}
                        onClick={()=> {
                            localStorage.removeItem("token");
                            window.location.assign("/");
                        }}
                        fullWidth={true}
                    />
                </div>
            </div>

            {isOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-0 transition-opacity duration-300"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
}