import React from "react";

type SidebarItemProps = {
    text: string;
    icon: React.ReactNode;
    active?: boolean;
}

export function SidebarItem({ text, icon, active = false }: SidebarItemProps) {
    return (
        <div className={`flex items-center p-3 my-2 rounded-xl cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
            active 
                ? 'text-white font-semibold shadow-lg' 
                : 'text-gray-300 hover:text-white hover:bg-white hover:bg-opacity-10'
        }`}
        style={{
            backgroundColor: active ? '#3B9797' : 'transparent',
            boxShadow: active ? '0 4px 12px rgba(59, 151, 151, 0.3)' : 'none'
        }}>
            <div className="mr-3 flex items-center justify-center w-6 h-6">
                {icon}
            </div>
            <div className="text-base font-medium">
                {text}
            </div>
        </div>
    );
}