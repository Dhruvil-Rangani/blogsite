import axios from "axios"
import { Appbar } from "../components/Appbar"
import { BACKEND_URL } from "../config"
import { ChangeEvent, useState } from "react"
import { useNavigate } from "react-router-dom"

export const Publish = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();
    return <div>
        <Appbar />
        <div className="flex justify-center">
            <div className="mt-10 max-w-screen-lg w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900">Title</label>
                <input onChange={(e) => {
                    setTitle(e.target.value)
                }} type="text" id="helper-text" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter your Blog's Title" />
                <div className="mt-4">
                    <TextEditor onChange={(e) => {
                        setDescription(e.target.value)
                    }} />
                </div>
                <button onClick={async () => {
                    const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                        title,
                        content: description
                    },{
                        headers:{
                            Authorization: localStorage.getItem('token')
                        }
                    });
                    navigate(`/blog/${response.data.id}`)
                }} type="submit" className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                    Publish post
                </button>
            </div>
        </div>
    </div>
}

function TextEditor({ onChange }: { onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void }) {

    return <form>
        <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 ">
            <div className="py-2 bg-white rounded-b-lg w-full">
                <label className="sr-only">Publish post</label>
                <textarea onChange={onChange} id="editor" rows={8} className="w-full px-0 pl-2 text-sm outline-none bg-white" placeholder="Write an article..." required ></textarea>
            </div>
        </div>
    </form>


}