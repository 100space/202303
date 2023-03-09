import { useState } from "react"

export const reducer2 = (state, action) => {
    switch (action.type) {
        case "login":
            return { ...state, isLogin: "true" }
        case "logout":
            return { ...state, isLogin: false }
        default:
            return state
    }
}

//useReducer -> useState 를 가지고 구현해보기
export const useTest = (reducer, initialState) => {
    const [state, setState] = useState(initialState)

    const dispatch = (action) => {
        const st = reducer(state, action)
        setState(st)
        // setState(reducer(state, action)
    }

    return [state, dispatch]
}
