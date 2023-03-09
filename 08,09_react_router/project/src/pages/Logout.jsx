import { useStore } from "../store"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const Logout = () => {
    //상태바꾸기
    //url
    const navigate = useNavigate()
    const { dispatch } = useStore()
    useEffect(() => {
        dispatch({ type: "LOGOUT" })
        navigate("/")
    }, [])
    return <></>
}
