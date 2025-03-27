

type variants = "primary" | "secondary";

export interface ButtonProps {

    variant: variants;
    size: "sm" | "md" | "lg";
    text: string;
    startIcon?: any;
    endIcon?: any;
    onClick?: ()=> void;
}

const variantStyles = {
    "primary" : "bg-[#5046e4] text-white",
    "secondary": "bg-[#e0e7fe] text-[#5046e4]"
}

const sizeStyles = {
    "sm": "p-2",
    "md": "p-4",
    "lg": "p-6"
}

export const Button = (props: ButtonProps) => {

    return <button className={`${variantStyles[props.variant]} ${sizeStyles[props.size]} m-2 rounded-md w-[160px] cursor-pointer hover:scale-105 flex justify-center items-center`}>{props.startIcon ? <div className="pr-2">{props.startIcon}</div>: null} {props.text}</button>
}

{/* <Button endIcon={"+"} startIcon={"-"} variant="primary" size="md" onClick={()=> {}} text={"abc"}  /> */}