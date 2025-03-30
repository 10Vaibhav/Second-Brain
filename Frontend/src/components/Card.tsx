import { DeleteIcon } from "../icons/DeleteIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";

interface CardProps{
    title: string,
    link: string,
    type: "twitter" | "youtube"
}

export function Card({title, link, type}: CardProps){

    return <div>
        <div className="p-4 bg-white rounded-md shadow-sm border-gray-200 max-w-72 border min-h-48 min-w-72">
            <div className="flex justify-between">
                <div className="flex justify-center items-center text-md text-black font-bold">
                    <div className="text-gray-500 pr-2">
                        {type === "youtube" ? <YoutubeIcon/>: <TwitterIcon/>}
                    </div>
                    {title}
                </div>

                <div className="flex justify-center items-center">
                        <a href={link.replace("x.com", "twitter.com")} target="_blank">
                        <div className="pr-2 text-gray-500">
                            <ShareIcon/>
                        </div>
                        </a>
                    <div className="text-gray-500 cursor-pointer">
                        <DeleteIcon/>
                    </div>
                </div>
            </div>

            <div className="pt-4">

                {type === "youtube" &&<iframe className="w-full" src={link.replace("watch", "embed").replace("?v=", "/")}title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe> }

                {type === "twitter" && <blockquote className="twitter-tweet">
                    <a href={link.replace("x.com", "twitter.com")}>
                    </a>
                </blockquote>}
            </div>

        </div>
    </div>
}