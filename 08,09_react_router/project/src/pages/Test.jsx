import { useTest, reducer2 } from "../store/a"
export const Test = () => {
    const initialState = { isLogin: "false" }

    const [state, dispatch] = useTest(reducer2, initialState)

    const handleClick = () => {
        dispatch({ type: "login" })
    }
    return (
        <>
            {state.isLogin}
            <button onClick={handleClick}>버튼</button>
        </>
    )
}
