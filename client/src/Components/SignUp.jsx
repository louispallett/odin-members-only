import axios from "axios";
import { DevTool } from "@hookform/devtools";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

export default function SignUp() {
    // See the playlist on react-hook-form (https://www.youtube.com/playlist?list=PLC3y8-rFHvwjmgBr1327BA5bVXoQH-w5s)
    const form = useForm();
    const { register, control, handleSubmit, formState, watch } = form;
    const { errors } = formState;

    // Development
    const onSubmit = async (data) => {
        console.log(data);
        // fetch("http://localhost:5000/api/users/sign-up", {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: data
        // }).then(() => {
        //     console.log("Successfully Submitted")
        // }). catch((err) => console.log(err));
        try {
            await axios.post("http://localhost:5000/api/users/sign-up", data, { "cors": true })
                .then(() => console.log("Successfully submitted"))

        } catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {

    }, [])

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                <hr />
                <h2 className="text-xl font-bold text-center m-0 p-0">Sign Up</h2>
                <hr />
                <div>
                    <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Username</label>
                    <input autoComplete="username" required id="username" {...register("username", {
                        required: "Username is required",
                        maxLength: {
                            value: 20,
                            message: "Username cannot be longer than twenty (20) characters long!"
                        },
                    })}
                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
                </div>
                <span className="text-sm font-bold text-red-600">
                        <p>{errors.username?.message}</p>
                </span>
                <div>
                    <div className="flex items-center justify-between gap-5">
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                            <input type="password" id="password" autoComplete="current-password" required {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message: "Password must be at least eight (8) characters long"
                                },
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                    message: "Must contain: uppercase, lowercase, number, and special character"
                                },
                                validate: {
                                    passwordMatch: (fieldValue) => {
                                        return (
                                            fieldValue == watch("confPassword") || "Passwords do not match"
                                        )
                                    }
                                }
                            })} 
                                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"/>
                        </div>
                        <div>
                            <label htmlFor="confPassword" className="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
                            <input type="password" id="confPassword" required {...register("confPassword", {
                                required: "Please confirm your password"
                            })}
                                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>
                    <span className="text-sm font-bold text-red-600">
                        <p>{errors.password?.message}</p>
                        <p>{errors.confPassword?.message}</p>
                    </span>
                </div>
                <div>
                    <button type="submit" className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">Sign Up</button>
                </div>
            </form>
            <DevTool control={control}/>
            <p className="mt-10 text-center text-sm text-gray-500"> Already a member? <Link to="/users/sign-in" className="font-semibold leading-6 text-blue-600 hover:text-blue-500">Login</Link></p>
        </>
    )
}