import { USER_REQUEST_ERROR, USER_REQUEST_START, USER_REQUEST_SUCCESS } from "./type"

const initialState = {
    loading: true,
    error: null,
    isLogin: false,
    data: {
        userid: "",
    },
}
export const user = (state = initialState, action) => {
    console.log(action.payload)
    switch (action.type) {
        case USER_REQUEST_START:
            return { ...state, loading: true, error: null }
        case USER_REQUEST_SUCCESS:
            return { ...state, error: null, loading: false, data: action.payload.data, isLogin: action.payload.isLogin }
        case USER_REQUEST_ERROR:
            return { ...state, loading: false, error: action.payload }
        default:
            return state
    }
}
