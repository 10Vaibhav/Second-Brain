import React from "react";

type SidebarItemProps = {
    text: string;
    icon: React.ReactNode;
    active?: boolean;
}

export function SidebarItem({ text, icon, active = false }: SidebarItemProps) {
    return (
        <div className={`flex items-center p-4 my-1 rounded-xl cursor-pointer transition-all duration-200 min-h-[48px] ${
            active 
                ? 'bg-teal-50 text-teal-700 font-semibold border border-teal-200 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 active:bg-gray-100'
        }`}>
            <div className="mr-4 flex items-center justify-center w-6 h-6 flex-shrink-0">
                {icon}
            </div>
            <div className="text-base font-medium">
                {text}
            </div>
        </div>
    );
}