import { useReducer } from "react"

const reducer = (state, action) => {
    console.log("hello reducer")
    console.log(state)

    switch (action.type) {
        case "increment":
            return { count: state.count + action.payload, user: state.user }
        case "decrement":
            return { count: state.count - action.payload, user: state.user }
        default:
            return state
    }
}

export const CounterReducer = () => {
    const initialState = {
        count: 0,
        user: "",
    }

    // const increment = () => {
    //     dispatch({ type: "increment", payload: 1 })
    // }
    // const decrement = () => {
    //     dispatch({ type: "decrement", payload: 1 })
    // }

    const handleClick = (event) => () => {
        dispatch({ type: event, payload: 1 })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const { counter } = e.target

        const action = {
            type: "increment",
            payload: parseInt(counter.value),
        }

        dispatch(action) // 1.어떤 실행을 할 건지, 2. 바꿀 내용 // 그렇기 때문에 인자값으로 보통 객체를 넣음..
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <>
            <h2>Count : {state.count}</h2>
            <button onClick={handleClick("increment")}>+</button>
            <button onClick={handleClick("decrement")}>-</button>
            <form onSubmit={handleSubmit}>
                <input type="text" id="counter" name="counter" />
                <button>+</button>
            </form>
        </>
    )
}
