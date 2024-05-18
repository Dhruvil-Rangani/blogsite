import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"

export const Appbar = () => {
    return <div className="border-b flex justify-between px-10 py-4">
        <Link to={"/blogs"} className="flex flex-col justify-center cursor-pointer">
            <div >
                Medium
            </div>
        </Link>
        <div>
            <Avatar size={"big"} name="Dhruvil" />
        </div>
    </div>
}