import mainLogo from "../assets/gene-logo.svg";

export default function Form() {
    return (
        <div className="relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:rounded-lg max-sm:px-5 sm:px-8">
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 max-sm:px-0">
                <div className="sm:mx-auto sm:w-full sm:max-w-lg">
                    <div className="flex justify-center gap-5 items-center">
                        <img id="logo" className="h-20" src={mainLogo} alt="Your Company"></img>
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900 text-nowrap max-sm:text-wrap">Members Only</h1> 
                    </div>
                <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-lg">
                    <form action="#" method="POST" className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                            <input type="email" autoComplete="email" required id="email" name="email" className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
                        </div>
                        <div>
                            <div className="flex items-center justify-between"></div>
                            <label htmlFor="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                            <input type="password" id="password" name="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"/>
                            <div className="mt-2"></div>
                            <div className="text-sm">
                                <a href="#" className="font-semibold text-blue-600 hover:text-blue-500">Forgot Password</a>
                            </div>
                        </div>
                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">Sign In</button>
                        </div>
                    </form>
                    <p className="mt-10 text-center text-sm text-gray-500"> Not a member? <a href="" className="font-semibold leading-6 text-blue-600 hover:text-blue-500">Sign Up</a></p>
                </div>
                </div>
            </div>
        </div>
    )
}