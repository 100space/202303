import { HeaderWrapper, Logo, Nav } from "./styled/index"
import { Navigation } from "./navigation"
import { useStore } from "../../store"

export const Header = () => {
    const [state, dispatch] = useStore()

    const category = [
        { path: "/", name: "Home" },
        { path: "/login", name: "Login", isLogin: false },
        { path: "/signup", name: "Signup", isLogin: false },
        { path: "/logout", name: "Logout", isLogin: true },
        { path: "/profile", name: "Profile", isLogin: true },
        {
            path: "/board/list",
            name: "Board",
            subMenu: [
                { path: "/board/list", name: "list" },
                { path: "/board/write", name: "write" },
            ],
        },
    ]

    return (
        <>
            <HeaderWrapper>
                <Logo>Logo</Logo>
                <Nav>
                    <Navigation isLogin={state.isLogin} category={category} />
                </Nav>
            </HeaderWrapper>
        </>
    )
}
