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
    "primary": "bg-[#BF092F] hover:bg-[#A0081F] text-white shadow-lg hover:shadow-xl",
    "secondary": "bg-[#3B9797] hover:bg-[#2A7A7A] text-white shadow-md hover:shadow-lg",
    "danger": "bg-red-500 hover:bg-red-600 text-white shadow-md hover:shadow-lg",
    "success": "bg-[#16476A] hover:bg-[#0F3A5A] text-white shadow-md hover:shadow-lg"
}

const sizeStyles = {
    "sm": "py-2.5 px-4 md:py-3 md:px-5 text-sm md:text-base font-medium",
    "md": "py-3 px-5 md:py-4 md:px-6 text-base md:text-lg font-medium",
    "lg": "py-4 px-6 md:py-5 md:px-8 text-lg md:text-xl font-semibold"
}

export const Button = (props: ButtonProps) => {
    return (
        <button 
            onClick={props.onClick} 
            className={`
                ${variantStyles[props.variant]} 
                ${sizeStyles[props.size]} 
                rounded-xl
                ${props.fullWidth ? "w-full" : "w-auto min-w-[120px]"}
                cursor-pointer 
                hover:scale-[1.02] 
                active:scale-[0.98]
                flex 
                justify-center 
                items-center 
                transition-all
                duration-200
                ease-in-out
                disabled:opacity-50
                disabled:cursor-not-allowed
                disabled:hover:scale-100
                focus:outline-none
                focus:ring-4
                focus:ring-opacity-30
                ${props.variant === 'primary' ? 'focus:ring-[#BF092F]' : 
                  props.variant === 'secondary' ? 'focus:ring-[#3B9797]' : 
                  props.variant === 'success' ? 'focus:ring-[#16476A]' : 'focus:ring-red-500'}
                ${props.loading ? "opacity-70 pointer-events-none" : ""}
            `} 
            disabled={props.loading}
        >
            {props.loading && (
                <div className="mr-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}
            {props.startIcon && !props.loading ? <div className="mr-2">{props.startIcon}</div> : null} 
            <span className="truncate">{props.text}</span>
            {props.endIcon && !props.loading ? <div className="ml-2">{props.endIcon}</div> : null}
        </button>
    );
}