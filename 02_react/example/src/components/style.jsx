import React from "react"
import styled from "styled-components"
// css가 적용된 컴포넌트를 만든다.

// style components 도 컴포넌트이기 때문에 첫글자가 대문자
//문법이 난해함...
const Div = styled.div`
    background: ${(props) => (props.background === "blue" ? "blue" : "yellow")};
`
const Button = styled.button`
    background: black;
    display: inline-block;
    width: ${(props) => props.size + `px`};
    height: 20px;
    color: #333;
    &:hover {
        background: white;
    }
`
const Style = () => {
    return (
        <>
            <Div background="yellow">hello</Div>
            <Button size="500">버튼</Button>
        </>
    )
}

export default Style
