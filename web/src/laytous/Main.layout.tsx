import { Outlet } from "react-router"

const MainLyout = () => {
    return (
        <div>
            <header>
                <h1>Todofy</h1>
            </header>
            <Outlet />
        </div>
    )
}

export default MainLyout