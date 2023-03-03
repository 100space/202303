import React, { useRef, useEffect, useState } from "react"
import hello from "../public/hello.module.css"
import input from "../public/input.module.css"
import useInput2 from "./useInput2.jsx"

const Ref2 = () => {
    const userId = useRef(null)
    const userPw = useRef(null)
    console.log(userId, "최소 렌더시 생성")

    const handleSubmit = (e) => {
        e.preventDefault()
        userId.current.value = ""
        userId.current.focus()
        console.log(userId, "submit 발동시")
    }

    const obj = useInput2("")
    const obj2 = useInput2("")

    useEffect(() => {
        console.log(userId, "Mount시")
    }, [])
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" id="userId" ref={userId} {...obj} className={hello.username} />
                <input type="password" id="userPw" ref={userPw} {...obj2} className={input.username} />
                <button type="submit">확인</button>
            </form>
        </>
    )
}
export default Ref2
