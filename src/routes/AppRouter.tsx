import { createBrowserRouter } from "react-router-dom";
import { MainContent } from "../pages/Home";
import { SignIn, SignUp } from "../pages/Auth";
import { Profile } from "../pages/Profile";
import { Post } from "../pages/Post";

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
    {
        path: "/post/crear",
        element: <Post />,
    },
    {
        path: "*",
        element: <h1>Not Found</h1>,
    }
]);
