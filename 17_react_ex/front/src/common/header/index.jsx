import { NavLink } from "react-router-dom"
import styled from "styled-components"
import { DarkModeToggle } from "react-dark-mode-toggle-2"
import { useState } from "react"

const Ul = styled.ul`
    display: flex;
    font-size: large;
    & > li {
        margin-left: 10rem;
    }
`
export const Header = () => {
    const [isDarkMode, setIsDarkMode] = useState(false)
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
            <DarkModeToggle onChange={setIsDarkMode} isDarkMode={isDarkMode} size={"10rem"} />
        </>
    )
}
