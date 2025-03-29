
import { CrossIcon } from "../icons/Crossicon"
import { Button } from "./Button"
import { useRef} from "react";
import useOutsideClick from "./Custom_useOutSideClickHook"

interface CreateContentModalProps {
    open: boolean;
    onClose: () => void;
}

// Controlled Component
export function CreateContentModal({open, onClose}: CreateContentModalProps){

    const ref = useRef<HTMLDivElement>(null);
    useOutsideClick(ref, onClose);

    return<div>
        {open &&  <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center">
            <div className="flex flex-col justify-center">
                <span ref={ref} className="bg-white opacity-100 p-4 rounded">
                    <div className="flex justify-end cursor-pointer">
                        <div onClick={onClose}>
                        <CrossIcon/>
                        </div>
                    </div>
                    <div>
                        <Input placeholder={"Title"} onChange={()=> {}}/>
                        <Input placeholder={"Link"} onChange={()=> {}}/>
                    </div>
                    <div className="flex justify-center">
                    <Button  size={"sm"} variant={"primary"} text={"Submit"} />
                    </div>
                </span>
            </div>
    </div>}
    </div>

}

interface InputProps{
    onChange: () => void;
    placeholder?: string;
}

function Input({onChange, placeholder}:InputProps ){

    return <div>
        <input placeholder={placeholder} type={"text"} className="px-4 py-2 border rounded m-2 border-slate-300" onChange={onChange}/>
    </div>
}