import { Outlet } from "react-router"

const MainLyout = () => {
    return (
        <div className="h-dvh" >
            <header>
                <h1>Todofy</h1>
            </header>
            <Outlet />
        </div>
    )
}

export default MainLyout