import React, { useRef, useEffect, useState } from "react"
// import style from "../public/input.module.css"
// import styled from "../public/hello.module.css"
import useInput from "./useInput"

const Ref = () => {
    const input = useRef(null)
    const pass = useInput("helloworlds")
    const repass = useInput("helloworlds")
    const obj4 = useInput("helloworlds")
    const obj5 = useInput("helloworlds")

    const [userid, setUserid] = useState("")
    const [userpw, setUserpw] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log("submti", input.current)
        if (pass.value === repass.value) {
        }
    }

    const handleChange = (e) => {
        e.preventDefault()
        setUserid(e.target.value)
    }

    const handleChange2 = (e) => {
        e.preventDefault()
        setUserpw(e.target.value)
    }
    const obj2 = useInput("abc")
    const obj3 = {
        value: userid,
        onChange: handleChange,
    }
    useEffect(() => {
        // console.log(input.current, "update")
    }, [])
    const obj = {
        name: "username",
        id: "username",
        onClick: () => {
            console.log("hello")
        },
    }
    const submit = {
        onSubmit: handleSubmit,
    }
    return (
        <>
            <form {...submit}>
                <input type="text" {...obj} ref={input} className={style.username} />
                <input type="text" {...obj4} name="userid" {...obj3} />
                <input type="text" {...obj5} name="userpw" {...obj2} />
                <button type="submit" className={styled.username}>
                    포커스
                </button>
            </form>
        </>
    )
}

React.createElement(
    "input",
    {
        name: "username",
        id: "username",
        ref: "asdf",
    },
    null
)
export default Ref
