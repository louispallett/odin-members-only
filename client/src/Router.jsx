import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Users from "./Components/Users";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";

export default function Router() {
    const router = createBrowserRouter([
        {
            path:"/users",
            element: <Users />,
            children: [
                {
                    path: "sign-in",
                    element: <SignIn />
                },
                {
                    path: "sign-up",
                    element: <SignUp />
                }
            ]
        }
    ]);

    return <RouterProvider router={router} />;
}