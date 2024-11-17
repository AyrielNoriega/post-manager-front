import { createBrowserRouter } from "react-router-dom";
import { MainContent } from "../pages/Home";


export const AppRouter = createBrowserRouter([
    {
        path: "/",
        element: <MainContent />,
    },
]);
