const { combineReducers } = require("redux")
const { counterReducer } = require("./counter")
const { userReducer } = require("./user")
// const initialState = {
//     counter: 0,
//     user: {},
//     board: [],
// }
// //user상태와 Board 상태를 만들고 싶음.

// const rootReducer = (state, action) => {
//     switch (action.type) {
//         case "increment":
//             return { ...state, counter: state.counter + 1 }
//         case "decrement":
//             return { ...state, counter: state.counter - 1 }
//         default:
//             return initialState
//     }
// }
const rootReducer = combineReducers({
    counter: counterReducer,
    user: userReducer,
})

module.exports = { rootReducer }
