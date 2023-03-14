const initialState = {
    loading: true,
    error: null,
    data: {
        count: 0,
    },
}

//state 가 undefined일 때 initialState를 써야한다.
export const counter = (state = initialState, action) => {
    switch (action.type) {
        case "COUNTER/SETUP_START":
            return { ...state, loading: true }
        case "COUNTER/SETUP_SUCCESS":
            return { ...state, loading: false, data: action.payload }
        case "COUNTER/SETUP_ERROR":
            return { ...state, loading: false, error: action.payload }
        default:
            return state
    }
}
