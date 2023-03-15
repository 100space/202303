import { AppRouter } from "./routes/AppRouter"
import { Header } from "./common"
import { useSelector, useDispatch } from "react-redux" //전역상태를 가져온다.
import { useEffect } from "react"
import { CategoryRequest } from "./store/category"

const App = () => {
    const dispatch = useDispatch()
    // useSelector의 인자값 state는 상태 전체를 의미한다.
    const { loading, error, data } = useSelector((state) => state.category)

    useEffect(() => {
        dispatch(CategoryRequest())
    }, [dispatch])

    if (loading) return <>Loading...</>
    if (error) return <>{error}</>
    return (
        <>
            <Header items={data} />
            <AppRouter />
        </>
    )
}
export default App
