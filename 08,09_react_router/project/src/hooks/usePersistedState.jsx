import { useState, useEffect } from "react"
export const usePersistedState = (key, initialState) => {
    //useState 내 함수를 넣으면 리턴값이 초기 state
    const [state, setState] = useState(() => {
        const storagedState = localStorage.getItem(key)

        return !storagedState ? initialState : JSON.parse(storagedState)
    })

    //디자인 패턴 : 옵저버 패턴
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state))
    }, [key, state])

    const changeStorage = (change) => {
        setState(change)
    }
    return [state, changeStorage]
}
