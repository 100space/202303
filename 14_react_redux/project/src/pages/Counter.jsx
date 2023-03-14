import { useEffect } from "react"
import axios from "axios"
import { useSelector, useDispatch } from "react-redux"

export const Counter = () => {
    const dispatch = useDispatch() // provider안에 store에 있는 dispatch 를 가져올 수 있다. store.dispatch()
    const { loading, error, data } = useSelector((state) => state.counter) // {loading, error,data:{count}}
    useEffect(() => {
        console.log(loading, error, data)
        ;(async () => {
            try {
                const response = await axios.get("http://localhost:3005/counters")
                console.log(response)
                dispatch({ type: "COUNTER/SETUP_SUCCESS", payload: response.data })
            } catch (e) {
                dispatch({ type: "COUNTER/SETUP_ERROR", payload: e })
            }
        })()
    }, [])
    const increment = async () => {
        dispatch({ type: "COUNTER/SETUP_START" })
        try {
            const response = await axios.post("http://localhost:3005/counters/increment")
            console.log(response)
            dispatch({ type: "COUNTER/SETUP_SUCCESS", payload: response.data })
        } catch (e) {
            dispatch({ type: "COUNTER/SETUP_ERROR", payload: e })
        }
    }
    const decrement = async () => {
        dispatch({ type: "COUNTER/SETUP_START" })
        try {
            const response = await axios.post("http://localhost:3005/counters/decrement")
            console.log(response)
            dispatch({ type: "COUNTER/SETUP_SUCCESS", payload: response.data })
        } catch (e) {
            dispatch({ type: "COUNTER/SETUP_ERROR", payload: e })
        }
    }
    if (loading) return <>Loading</>
    if (error) return <>{error.message}</>
    return (
        <>
            <h1>Count : {data.count}</h1>
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>
        </>
    )
}
