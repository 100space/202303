import { useState, useMemo } from "react"

export const Memo = () => {
    const [numbers, setNumbers] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    const [value, setValue] = useState(0)

    const oddNumbers = useMemo(() => {
        return numbers.filter((v) => {
            console.log("hello Memo")
            return v % 2 !== 0
        })
    }, [numbers])

    // const oddNumbers = numbers.filter((v) => {
    //     console.log("hello Memo")
    //     return v % 2 !== 0
    // })

    const handleClick = () => {
        setNumbers([...numbers, numbers.length + 1])
    }
    return (
        <div>
            <p>숫자 : {numbers.join(", ")}</p>
            <p>홀수 : {oddNumbers.join(", ")}</p>
            <button onClick={handleClick}>요소추가</button>
            <button onClick={() => setValue(value + 1)}>value</button>
        </div>
    )
}
