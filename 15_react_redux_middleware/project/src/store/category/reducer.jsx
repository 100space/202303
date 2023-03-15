import { CATEGORY_REQUEST_START, CATEGORY_REQUEST_SUCCESS, CATEGORY_REQUEST_ERROR } from "./types"
const initialState = {
    loading: true,
    error: null,
    data: [],
}

export const category = (state = initialState, action) => {
    switch (action.type) {
        case CATEGORY_REQUEST_START:
            return { ...state, loading: true, error: null }
        case CATEGORY_REQUEST_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case CATEGORY_REQUEST_ERROR:
            return { ...state, loading: false, error: action.payload.message }
        default:
            return state
    }
}
