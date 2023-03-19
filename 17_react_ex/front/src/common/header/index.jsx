import { NavLink } from "react-router-dom"
import styled from "styled-components"

const Ul = styled.ul`
    display: flex;
    font-size: large;
    & > li {
        margin-left: 10rem;
    }
`
export const Header = () => {
    return (
        <>
            <Ul>
                <li>
                    <NavLink to="/">Main</NavLink>
                </li>
                <li>
                    <NavLink to="/user">User</NavLink>
                </li>
                <li>
                    <NavLink to="/login">Login</NavLink>
                </li>
            </Ul>
        </>
    )
}
