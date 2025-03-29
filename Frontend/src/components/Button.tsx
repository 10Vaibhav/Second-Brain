import { ReactElement } from "react";

type variants = "primary" | "secondary";

export interface ButtonProps {

    variant: variants;
    size: "sm" | "md" | "lg";
    text: string;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    onClick?: ()=> void;
}

const variantStyles = {
    "primary" : "bg-[#5046e4] text-white",
    "secondary": "bg-[#e0e7fe] text-[#5046e4]"
}

const sizeStyles = {
    "sm": "p-2 text-sm",
    "md": "p-4 text-md",
    "lg": "p-6 text-lg"
}

export const Button = (props: ButtonProps) => {

    return <button onClick={props.onClick} className={`${variantStyles[props.variant]} ${sizeStyles[props.size]} m-2 rounded-md ${props.size === "lg"? "w-auto": "w-[140px]"} cursor-pointer hover:scale-105 flex justify-center items-center`}>{props.startIcon ? <div className="pr-2">{props.startIcon}</div>: null} {props.text}</button>
}