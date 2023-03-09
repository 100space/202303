import { createContext, useContext, useReducer } from "react"
import { rootReducer } from "./reducer"
import { usePersistedState } from "../hooks/usePersistedState"

export const Context = createContext()
export const useStore = () => useContext(Context)
export const StoreProvider = ({ children }) => {
    //1. 혹시 로컬스토리지에 데이터가 있니?
    // const storageState = localStorage.getItem("state")
    // 처음엔 storage에 넣은게 없기 때문에 null 반환

    const initialState = {
        isLogin: false,
        user: {},
    }

    // const initial = !storageState
    //     ? initialState // 없을 때
    //     : JSON.parse(storageState) // 있을 때

    const [state, dispatch] = useReducer(rootReducer, initialState)
    const [persisedState, setPersistedState] = usePersistedState("state", state)

    const globalState = {
        state: persisedState,

        //dispatch를 임의로 변경..(로직 추가를 위해서 변경)
        dispatch: (action) => {
            dispatch(action)
            //localStorage 세팅
            //      1. 어떤 상태로 바뀌었는가? - rootReducer 의 반환값으로 알수 있다.
            // localStorage.setItem("state", JSON.stringify(rootReducer(state, action)))

            //커스텀 훅으로 빼기..
            setPersistedState(rootReducer(persisedState, action))
        },
    }

    return <Context.Provider value={globalState}>{children}</Context.Provider>
}
