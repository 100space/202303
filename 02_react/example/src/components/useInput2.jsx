import React, { useState } from "react"

const useInput2 = (inital) => {
    const [value, setValue] = useState(inital)
    const onChange = (e) => {
        setValue(e.target.value)
    }
    return {
        value,
        onChange,
    }
}
export default useInput2
