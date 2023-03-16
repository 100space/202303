import { NavLink } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

export const Header = () => {
    const { loading, error, data, isLogin } = useSelector((state) => state.user)
    console.log(isLogin)
    return (
        <>
            <ul>
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/counter">Counter</NavLink>
                </li>
                <li>
                    <NavLink to="/login">Login</NavLink>
                </li>
                <li>
                    <NavLink to="/board">Board</NavLink>
                </li>
            </ul>
        </>
    )
}
