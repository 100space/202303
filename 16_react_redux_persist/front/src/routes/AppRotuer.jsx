import { Routes, Route } from "react-router-dom"
import { Counter, Main, Login } from "../pages"
import { BoardRouter } from "./BoardRouter"

export const AppRouter = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Main />}></Route>
                <Route path="/counter" element={<Counter />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/board/*" element={<BoardRouter />}></Route>
            </Routes>
        </>
    )
}
