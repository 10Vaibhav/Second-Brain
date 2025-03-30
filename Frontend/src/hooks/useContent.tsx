import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";

export function useContent(){

    const [contents, setContents] = useState([])

    async function refresh(){
        axios.get(`${BACKEND_URL}/api/v1/content`,{
            headers: {
                "authorization": localStorage.getItem("token")
            }
        })
            .then((response)=> {
                setContents(response.data.content)
            });
    }

    useEffect(()=> {

            refresh();

            let interval = setInterval(()=> {
                refresh();
            },10*1000);

            return ()=> {
                clearInterval(interval);
            }
    }, [])

    return {contents, refresh};
}
