import React from "react"
import Button from "../components/button"

const Main = () => {
    return (
        <>
            <h1>LOGO</h1>
            <ul>
                <li>HelloWorld</li>
                <li>
                    <Button fullWidth color="blue">
                        <span>버튼</span>
                        <p>P</p>
                    </Button>
                    <Button color="gray">
                        <span>123</span>
                        <p>P</p>
                    </Button>
                    <Button color="pink">
                        <span>123</span>
                        <p>P</p>
                    </Button>
                </li>
                <li></li>
                <li></li>
            </ul>
        </>
    )
}

export default Main
