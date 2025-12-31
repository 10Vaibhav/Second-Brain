import { ReactElement } from "react";

type variants = "primary" | "secondary" | "danger" | "success";

export interface ButtonProps {
    variant: variants;
    size: "sm" | "md" | "lg";
    text: string;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    onClick?: ()=> void;
    fullWidth?: boolean;
    loading?: boolean;
}

const variantStyles = {
    "primary": "bg-[#BF092F] hover:bg-[#A0081F] text-white border border-transparent",
    "secondary": "bg-[#3B9797] hover:bg-[#2A7A7A] text-white border border-transparent",
    "danger": "bg-red-500 hover:bg-red-600 text-white border border-transparent",
    "success": "bg-[#16476A] hover:bg-[#0F3A5A] text-white border border-transparent"
}

const sizeStyles = {
    "sm": "py-2 px-4 text-sm font-medium h-9",
    "md": "py-2.5 px-5 text-sm font-medium h-10",
    "lg": "py-3 px-6 text-base font-medium h-12"
}

export const Button = (props: ButtonProps) => {
    return (
        <button 
            onClick={props.onClick} 
            className={`
                ${variantStyles[props.variant]} 
                ${sizeStyles[props.size]} 
                rounded-lg
                ${props.fullWidth ? "w-full" : "w-auto min-w-[100px]"}
                cursor-pointer 
                hover:shadow-md
                active:scale-[0.98]
                flex 
                justify-center 
                items-center 
                transition-all
                duration-200
                ease-out
                disabled:opacity-50
                disabled:cursor-not-allowed
                disabled:hover:shadow-none
                disabled:active:scale-100
                focus:outline-none
                focus:ring-2
                focus:ring-offset-2
                ${props.variant === 'primary' ? 'focus:ring-[#BF092F]/30' : 
                  props.variant === 'secondary' ? 'focus:ring-[#3B9797]/30' : 
                  props.variant === 'success' ? 'focus:ring-[#16476A]/30' : 'focus:ring-red-500/30'}
                ${props.loading ? "pointer-events-none" : ""}
                font-medium
                whitespace-nowrap
            `} 
            disabled={props.loading}
        >
            {props.loading && (
                <div className="mr-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                </div>
            )}
            {props.startIcon && !props.loading ? <div className="mr-2 flex-shrink-0">{props.startIcon}</div> : null} 
            <span className="truncate">{props.text}</span>
            {props.endIcon && !props.loading ? <div className="ml-2 flex-shrink-0">{props.endIcon}</div> : null}
        </button>
    );
}