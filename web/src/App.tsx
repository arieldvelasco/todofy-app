import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home";
import Error404 from "./pages/Error404";
import Login from "./pages/Login";
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
                path: "/login",
                element: <Login />,
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
        <div className="" >
            <RouterProvider router={router} />
        </div>
    )
}

export default App