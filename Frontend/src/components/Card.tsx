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
        <div className="p-3 md:p-4 bg-white rounded-md shadow-sm border-gray-200 w-full max-w-72 border min-h-36 md:min-h-48 min-w-full md:min-w-72">
            <div className="flex justify-between">
                <div className="flex justify-center items-center text-sm md:text-md text-black font-bold truncate max-w-36 md:max-w-44">
                    <div className="text-gray-500 pr-1 md:pr-2 flex-shrink-0">
                        {type === "youtube" ? <YoutubeIcon/>: <TwitterIcon/>}
                    </div>
                    <span className="truncate">{title}</span>
                </div>

                <div className="flex justify-center items-center">
                        <a href={link.replace("x.com", "twitter.com")} target="_blank">
                        <div className="pr-1 md:pr-2 text-gray-500">
                            <ShareIcon/>
                        </div>
                        </a>
                    <div className="text-gray-500 cursor-pointer">
                        <DeleteIcon/>
                    </div>
                </div>
            </div>

            <div className="pt-2 md:pt-4">
                {type === "youtube" &&<iframe className="w-full h-40 md:h-48" src={link.replace("watch", "embed").replace("?v=", "/")}title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe> }

                {type === "twitter" && <blockquote className="twitter-tweet">
                    <a href={link.replace("x.com", "twitter.com")}>
                    </a>
                </blockquote>}
            </div>

        </div>
    </div>
}