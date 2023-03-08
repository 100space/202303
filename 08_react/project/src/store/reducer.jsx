// reducer 함수를 만들예정

export const rootReducer = (state, action) => {
    console.log(state, action)

    switch (action.type) {
        case "LOGIN":
            return { ...state, isLogin: action.payload }
        default:
            return state
    }
}
