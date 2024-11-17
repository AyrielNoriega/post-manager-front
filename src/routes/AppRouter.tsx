import { createBrowserRouter } from "react-router-dom";
import { MainContent } from "../pages/Home";
import { SignIn, SignUp } from "../pages/Auth";
import { Profile } from "../pages/Profile";

export const AppRouter = createBrowserRouter([
    {
        path: "/",
        element: <MainContent />,
    },
    {
        path: "/sign-in",
        element: <SignIn />,
    },
    {
        path: "/sign-up",
        element: <SignUp />,
    },
    {
        path: "/profile/:name",
        element: <Profile />,
    },
]);
