import { combineReducers } from "redux"
import { counter } from "./counter/reducer"

const rootReducer = combineReducers({
    counter, //{} combineReducers 가 함수를 실행시킬 것임
})

export default rootReducer
