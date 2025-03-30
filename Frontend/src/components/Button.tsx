import { ReactElement } from "react";

type variants = "primary" | "secondary";

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
    "primary" : "bg-[#5046e4] text-white",
    "secondary": "bg-[#e0e7fe] text-[#5046e4]"
}

const sizeStyles = {
    "sm": "py-2 px-3 md:p-2 text-xs md:text-sm",
    "md": "py-3 px-4 md:p-4 text-sm md:text-md",
    "lg": "py-4 px-5 md:p-6 text-md md:text-lg"
}

export const Button = (props: ButtonProps) => {
    return (
        <button 
            onClick={props.onClick} 
            className={`
                ${variantStyles[props.variant]} 
                ${sizeStyles[props.size]} 
                m-1 md:m-2 
                rounded-md 
                ${props.fullWidth ? "w-full" : props.size === "lg" ? "w-auto" : "w-full md:w-[140px]"}
                cursor-pointer 
                hover:scale-105 
                flex 
                justify-center 
                items-center 
                transition-all
                ${props.loading ? "opacity-45" : ""}
            `} 
            disabled={props.loading}
        >
            {props.startIcon ? <div className="mr-1 md:mr-2">{props.startIcon}</div> : null} 
            <span className="truncate">{props.text}</span>
            {props.endIcon ? <div className="ml-1 md:ml-2">{props.endIcon}</div> : null}
        </button>
    );
}