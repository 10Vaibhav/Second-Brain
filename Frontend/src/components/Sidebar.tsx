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
            {/* Mobile hamburger menu */}
            <div className="md:hidden fixed top-0 left-0 z-20 p-4">
                <button 
                    onClick={toggleSidebar}
                    className="text-purple-900 focus:outline-none"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                    </svg>
                </button>
            </div>

            {/* Sidebar content - always visible on desktop, conditionally visible on mobile */}
            <div className={`${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} transform transition-transform duration-300 ease-in-out h-screen bg-white border border-r-gray-300 w-64 md:w-72 fixed left-0 top-0 pl-4 md:pl-6 z-10`}>
                <div className="flex text-xl md:text-2xl pt-6 md:pt-8 items-center">
                    <div className="pr-2 md:pr-3 text-purple-900 mt-5 flex justify-center items-center">
                        <Logo/>
                        Brainly
                    </div>
                </div>

                <div className="pt-4 pl-2 md:pl-4">
                    <div onClick={() => handleItemClick("twitter")}>
                        <SidebarItem
                            text="Twitter"
                            icon={<TwitterIcon/>}
                            active={activeFilter === "twitter"}
                        />
                    </div>
                    <div onClick={() => handleItemClick("youtube")}>
                        <SidebarItem
                            text="Youtube"
                            icon={<YoutubeIcon/>}
                            active={activeFilter === "youtube"}
                        />
                    </div>
                    <div onClick={() => handleItemClick("instagram")}>
                        <SidebarItem
                            text="Instagram"
                            icon={<InstaIcon/>}
                            active={activeFilter === "instagram"}
                        />
                    </div>
                </div>

                <div className="absolute bottom-8 left-4">
                    <Button
                        variant="secondary"
                        text="Logout"
                        size="sm"
                        startIcon={<Logout/>}
                        onClick={()=> window.location.assign("/")}
                    />
                </div>
            </div>

            {/* Overlay to close sidebar on mobile */}
            {isOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-0"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
}