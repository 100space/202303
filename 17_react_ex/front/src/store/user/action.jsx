import request from "../../utils/request"
import { USER_REQUEST_ERROR, USER_REQUEST_START, USER_REQUEST_SUCCESS } from "./type"

export const RequestError = (payload) => ({
    type: USER_REQUEST_ERROR,
    payload,
})
export const RequestSuccess = (payload) => ({
    type: USER_REQUEST_SUCCESS,
    payload,
})
export const UserLogin = (props) => {
    return async (dispatch) => {
        dispatch({ type: USER_REQUEST_START })
        try {
            const response = await request.get("/login")
            dispatch(RequestSuccess(response.data))
        } catch (error) {
            dispatch(RequestError(error))
        }
    }
}
export const UserLogout = () => {
    return async (dispatch) => {
        dispatch({ type: USER_REQUEST_START })
        try {
            const response = await request.get("/logout")
            dispatch(RequestSuccess(response.data))
        } catch (error) {
            dispatch(RequestError(error))
        }
    }
}
