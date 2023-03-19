import { useDispatch } from "react-redux"
import { UserLogin, UserLogout } from "../store"

export const Login = () => {
    const dispatch = useDispatch()
    const handleLogin = () => {
        dispatch(UserLogin())
    }
    const handleLogout = () => {
        dispatch(UserLogout())
    }
    return (
        <>
            <button onClick={handleLogin}>로그인</button>
            <button onClick={handleLogout}>로그아웃</button>
        </>
    )
}
