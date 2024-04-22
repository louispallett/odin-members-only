import { createBrowserRouter, Navigate, redirect, RouterProvider } from "react-router-dom";
import Users from "./Components/Users";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";

export default function Router() {
    const router = createBrowserRouter([
        {
            path: "/",
            // Redirects to sign in page - see https://stackoverflow.com/questions/69868956/how-can-i-redirect-in-react-router-v6
            element: <Navigate to="/users/sign-in" replace />
        },
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