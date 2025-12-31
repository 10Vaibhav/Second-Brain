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
            {/* Mobile Menu Button */}
            <div className="md:hidden fixed top-4 left-4 z-30">
                <button 
                    onClick={toggleSidebar}
                    className="p-3 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-200 bg-white shadow-lg border border-gray-200 hover:shadow-xl"
                    aria-label={isOpen ? "Close menu" : "Open menu"}
                >
                    <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                    </svg>
                </button>
            </div>

            {/* Sidebar */}
            <div className={`${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} transform transition-all duration-300 ease-out h-screen w-80 md:w-72 fixed left-0 top-0 z-20 bg-white border-r border-gray-200 shadow-xl md:shadow-lg animate-gentle-slide-in flex flex-col`}>
                
                {/* Header with Close Button */}
                <div className="flex-shrink-0 px-6 pt-6 pb-4">
                    <div className="flex items-center justify-between">
                        <div className="text-gray-900 flex items-center font-bold">
                            <div className="mr-3 p-2.5 rounded-xl bg-teal-50 border border-teal-100">
                                <Logo/>
                            </div>
                            <span className="text-xl md:text-2xl">Brainly</span>
                        </div>
                        
                        {/* Close button for mobile */}
                        <button 
                            onClick={() => setIsOpen(false)}
                            className="md:hidden p-2 rounded-lg transition-all duration-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                            aria-label="Close menu"
                        >
                            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex-1 px-4 py-2">
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
                                text="YouTube"
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

                {/* Logout Button */}
                <div className="flex-shrink-0 p-4 border-t border-gray-100">
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

            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/60 z-10 transition-opacity duration-300 backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
}