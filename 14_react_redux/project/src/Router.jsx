import { Route, Routes } from "react-router-dom"
import { Home } from "./pages"
import { Counter } from "./pages/Counter"

export const Routers = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/counter" element={<Counter />} />
            </Routes>
        </>
    )
}
