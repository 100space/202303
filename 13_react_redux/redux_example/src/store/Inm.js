const { createStore, applyMiddleware } = require("redux")
const { rootReducer } = require("../reducers")
const { add } = require("../reducers/user")

const createThunkMiddleware = (arguments) => {
    return (store) => (next) => (action) => {
        if (typeof action === "function") {
            console.log("is function?")
            return action()
        }
        console.log("is object?")
        return next(action)
    }
}

// const api = () => {
//   // axios ...

//   store.dispatch({ type: "increment" });
// };

// store.dispatch(api);

const store = createStore(rootReducer, applyMiddleware(createThunkMiddleware()))

// store.dispatch({ type: "increment" });
store.dispatch(() => {
    store.dispatch({ type: "increment" })
})

console.log(store.getState())
