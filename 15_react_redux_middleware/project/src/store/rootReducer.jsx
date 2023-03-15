import { combineReducers } from "redux"
import { category } from "./category/reducer"
export const rootReducer = combineReducers({
    category,
})
