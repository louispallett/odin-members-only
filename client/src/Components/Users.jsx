import { Outlet } from "react-router-dom";
import mainLogo from "/key.svg";

export default function Users() {
    return (
        <div className="relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:rounded-lg max-sm:px-5 sm:px-8">
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 max-sm:px-0">
            <div className="sm:mx-auto sm:w-full sm:max-w-lg">
                <div className="flex justify-center gap-5 items-center">
                    <img id="logo" className="h-20" src={mainLogo} alt="Your Company"></img>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 text-nowrap max-sm:text-wrap">Members Only</h1> 
                </div>
            </div>
            <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-lg">
                <Outlet />
            </div>
        </div>
    </div>
    )
}