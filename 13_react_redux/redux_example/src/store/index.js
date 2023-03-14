// import {createStore} from "redux"
const { createStore, applyMiddleware } = require("redux")
const { rootReducer } = require("../reducers")
const { ADD, add } = require("../reducers/user")

const createThunkMiddleware = (arguments) => {
    return (store) => (next) => (action) => {
        console.log("helloworld")
        if (typeof action === "function") {
            console.log("func 이니?")
            return action()
        }
        console.log("object 이니?")
        return next(action)
    }
}

const store = createStore(rootReducer, applyMiddleware(createThunkMiddleware()))

// const api = () => {
//     store.dispatch({ type: "increment" })
// }
store.dispatch(() => {
    store.dispatch({ type: "increment" })
})
console.log(store.getState())

// console.log(store) // dispatch, getState가 중요..
// console.log(store.getState()) // 상태가 바뀐게 없으므로 처음에는 undefined
// store.dispatch({ type: "increment" })
// console.log(store.getState()) // counter : 1
// store.dispatch({ type: "increment" })
// console.log(store.getState()) // counter : 2
// store.dispatch({ type: "decrement" })
// store.dispatch({ type: "decrement" })
// console.log(store.getState()) // counter : 0
// // store.dispatch({ type: "USER/ADD", payload: { userid: "web7722", username: "baekspace" } })
// store.dispatch({ type: ADD, payload: { userid: "web7722", username: "baekspace" } })
// console.log(store.getState())
// store.dispatch(add("baekbr13", "123"))
// console.log(store.getState())
