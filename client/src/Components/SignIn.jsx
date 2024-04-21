import { Link } from "react-router-dom";

export default function SignIn() {
    return (
        <>
            <form action="#" method="POST" className="space-y-6">
            <hr />
            <h2 className="text-xl font-bold text-center m-0 p-0">Login</h2>
            <hr />
                <div>
                    <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Username</label>
                    <input autoComplete="username" required id="username" name="username" className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
                </div>
                <div>
                    <div className="flex items-center justify-between"></div>
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                    <input type="password" id="password" name="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"/>
                    <div className="mt-2"></div>
                    <div className="text-sm">
                        <a href="#" className="font-semibold text-blue-600 hover:text-blue-500">Forgot Password</a>
                    </div>
                </div>
                <div>
                    <button type="submit" className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">Login</button>
                </div>
            </form>
            <p className="mt-10 text-center text-sm text-gray-500"> Not a member? <Link to="/users/sign-up" className="font-semibold leading-6 text-blue-600 hover:text-blue-500">Sign Up</Link></p>
        </>
    )
}