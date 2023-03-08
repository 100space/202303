import { useCallback, useState, memo } from "react"

export const ParentComponent = () => {
    const [count, setCount] = useState(0)
    const [value, setValue] = useState(0)

    const increment = useCallback(() => {
        setCount(count + 1)
    }, [count])
    return (
        <>
            <h2>Count : {count}</h2>
            <ChildComponent increment={increment} />
            <h3>{value}</h3>
            <button onClick={() => setValue(value + 1)}> + </button>
        </>
    )
}

const ChildComponent = memo(({ increment }) => {
    console.log("리랜더링 되니?")
    return (
        <>
            <button onClick={increment}>+</button>
        </>
    )
})
