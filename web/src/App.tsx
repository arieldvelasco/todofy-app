import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home";
import Error404 from "./pages/Error404";
import Auth from './pages/Auth';
import MainLyout from "./laytous/Main.layout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLyout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/Auth",
                element: <Auth />,
            },
            {
                path: "/*",
                element: <Error404 />,
            },
        ]
    },
]);

const App = () => {
    return (
        <div className="flex flex-col h-dvh" >
            <RouterProvider router={router} />
        </div>
    )
}

export default App