
import { CrossIcon } from "../icons/Crossicon"
import { Button } from "./Button"
import { useRef, useState} from "react";
import useOutsideClick from "./Custom_useOutSideClickHook"
import { Input } from "./Input";
import { BACKEND_URL } from "../config";
import axios from "axios";

interface CreateContentModalProps {
    open: boolean;
    onClose: () => void;
}

enum ContentType {
    Youtube = "youtube",
    Twitter = "twitter"
}

// Controlled Component
export function CreateContentModal({open, onClose}: CreateContentModalProps){

    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const [type, setType] = useState(ContentType.Youtube);

    async function addContent(){
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;

        await axios.post(`${BACKEND_URL}/api/v1/content`, {
            link,
            title,
            type
        }, {
            headers: {
                "authorization": localStorage.getItem("token")
            }
        });

        onClose();

    }

    const ref = useRef<HTMLDivElement>(null);
    useOutsideClick(ref, onClose);

    return<div>
        {open && <div>
        <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center">
        </div>

        <div className="w-screen h-screen fixed  left-0 top-0 flex justify-center">
            <div className="flex flex-col justify-center">
                <span ref={ref} className="bg-white opacity-100 p-4 rounded">
                        <div className="flex justify-end cursor-pointer">
                            <div onClick={onClose}>
                            <CrossIcon/>
                            </div>
                        </div>
                        <div>
                            <Input reference={titleRef} placeholder={"Title"} />
                            <Input reference={linkRef} placeholder={"Link"} />
                        </div>

                        <div>
                            <h1>Type</h1>
                            <div className="flex gap-1 p-4 justify-center">
                                <Button text="YouTube" variant={type === ContentType.Youtube ?"primary": "secondary" } size="sm" onClick={()=> {
                                    setType(ContentType.Youtube);
                                }}/>

                                <Button text="Twitter" variant={type === ContentType.Twitter ?"primary": "secondary" } size="sm" onClick={()=> {
                                    setType(ContentType.Twitter);
                                }}/>
                            </div>
                        </div>

                        <div className="flex justify-center">
                        <Button onClick={addContent} size={"sm"} variant={"primary"} text={"Submit"} />
                        </div>
                    </span>
                </div >
        </div>

    </div>}
    </div>

}

