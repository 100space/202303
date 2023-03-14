const initialState = {
    number: 0,
}
const counterReducer = (state, action) => {
    switch (action.type) {
        case "increment":
            return { number: state.number + 1 }
        case "decrement":
            return { number: state.number - 1 }
        default:
            return initialState
    }
}
module.exports = { counterReducer }
