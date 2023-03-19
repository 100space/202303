import { Routes, Route } from "react-router-dom"
import { Login, Main, User } from "../pages"

export const AppRouter = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/user" element={<User />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </>
    )
}
