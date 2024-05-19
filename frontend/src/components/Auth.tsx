import { ChangeEvent, useState } from "react";
import { Link , useNavigate } from "react-router-dom"
import { SignupInput } from "@dhruvilrangani/medium-common";
import { BACKEND_URL } from "../config";
import axios from "axios";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        email: "",
        password: ""
    });

    async function sendRequest(){
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup"? "signup" : "signin"}`, postInputs);
            const jwt = response.data;
            localStorage.setItem("token", jwt);
            navigate("/blogs")
        } catch (error) {
            
        }
    }

    return <div className="h-screen flex justify-center flex-col">
        <div>
            <div className="flex justify-center">
                <div>
                    <div className="px-10">
                        <div className="text-3xl font-extrabold">
                            Create an account
                        </div>
                        <div className="max-w-md text-center text-md font-semibold text-gray-500 mt-2">
                            {type === "signin"? "Don't have an account? " : "Already have an account? "}
                             <Link className="underline" to={type === "signin"? "/signup": "/signin"}>
                                {type === "signin"? "Sign up" : "Sign in"}
                             </Link>
                        </div>
                    </div>
                    <div className="mt-6">
                        {type === "signup" ? <LabelledInput label="Name" placeholder="Enter Your Name" onChange={(e) => {
                            setPostInputs(c => ({
                                ...c,
                                name: e.target.value
                            }))
                        }} /> : null}
                        <LabelledInput label="Email" type="email" placeholder="youremail@email.com" onChange={(e) => {
                            setPostInputs(c => ({
                                ...c,
                                email: e.target.value
                            }))
                        }} />
                        <LabelledInput label="Password" type="password" placeholder="Enter your Password" onChange={(e) => {
                            setPostInputs(c => ({
                                ...c,
                                password: e.target.value
                            }))
                        }} />
                        <button onClick={sendRequest} type="button" className="w-full mt-5 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-base px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup" ? "Sign Up": "Sign in"}</button>   

                    </div>
                </div>
            </div>
        </div>
    </div>
}

interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;

}

function LabelledInput({ label, placeholder, type, onChange }: LabelledInputType) {
    return <div className="mt-5">
        <label className="block mb-2 text-base font-bold text-black">{label}</label>
        <input onChange={onChange} type={type || "text"} id="first_name" className="bg-white border border-gray-300 text-slate-950 text-base rounded-lg font-medium focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
    </div>
}