import { memo } from "react"
import { NavLink } from "react-router-dom"

export const Navigation = memo(({ category, isLogin }) => {
    const categoryFilter = (item) => {
        return !item.hasOwnProperty("isLogin") || item.isLogin === isLogin
    }
    const categoryMap = (v) => (
        <li key={v.path}>
            <NavLink to={v.path}>{v.name}</NavLink>
            {v.subMenu && <Navigation category={v.subMenu} />}
        </li>
    )
    return <ul>{category.filter(categoryFilter).map(categoryMap)}</ul>
})
