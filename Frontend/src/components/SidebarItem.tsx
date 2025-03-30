import React from "react";

type SidebarItemProps = {
    text: string;
    icon: React.ReactNode;
    active?: boolean;
}

export function SidebarItem({ text, icon, active = false }: SidebarItemProps) {
    return (
        <div className={`flex items-center p-2 my-1 md:my-2 rounded-md cursor-pointer hover:bg-purple-100 ${active ? 'bg-purple-100 text-purple-700 font-medium' : ''}`}>
            <div className="mr-2 md:mr-3">
                {icon}
            </div>
            <div className="text-sm md:text-base">
                {text}
            </div>
        </div>
    );
}