import { useNavigate } from "react-router-dom"
import { useStore } from "../store"

export const Login = () => {
    const [state, dispatch] = useStore()
    const navigate = useNavigate()
    const handleClick = () => {
        dispatch({ type: "LOGIN", payload: !state.isLogin })
        navigate("/")
    }
    return (
        <>
            <button onClick={handleClick}>로그인</button>
        </>
    )
}
