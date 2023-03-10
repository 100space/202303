import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Header } from "./layouts/header"
import { Login, Main, BoardList, BoardWrite, BoardModify, BoardView, Logout } from "./pages"
import { StoreProvider } from "./store"

const App = () => {
    return (
        <StoreProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="*" element={<Header />} />
                </Routes>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/board/*">
                        <Route path="list" element={<BoardList />} />
                        <Route path="write" element={<BoardWrite />} />
                        <Route path="modify/:id" element={<BoardModify />} />
                        <Route path="view/:id" element={<BoardView />} />
                    </Route>
                    {/*  */}
                </Routes>
            </BrowserRouter>
        </StoreProvider>
    )
}

export default App
