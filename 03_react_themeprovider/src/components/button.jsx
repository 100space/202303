import React from "react"
import styled, { css } from "styled-components"

const flexCenter = css`
    display: inline-flex;
    justify-content: center;
    align-items: center;
`

// 특정 props 값이 존재한다면 css 주고, 안주고
const fullWidthStyle = css`
    /* props 값중에 fullWidth 값이 존재한다면 width 100% */
    ${({ fullWidth }) => {
        return (
            fullWidth && //fullWidth 가 있을 때
            css`
                width: 100%;
                & + & {
                    margin-top: 10px;
                }
            `
        )
    }}
`
const Button = styled.button`
    ${flexCenter}
    border: none;
    outline: none;
    font-size: 20px;
    font-weight: bold;
    padding: 7px 14px;

    //기본 색상
    /* background: ${(props) => {
        switch (props.color) {
            case "blue":
                return props.theme.blue
                break
            case "gray":
                return props.theme.gray
                break
            case "pink":
                return props.theme.pink
                break
        }
    }}; */

    background: ${(props) => props.theme[props.color]};
    color: #fff;

    //hover
    &:hover {
        background: #339af0;
    }

    //active

    /* & > span 를 통해서 선택가능 */
    & > span {
        color: red;
    }

    ${fullWidthStyle}
    &+& {
        margin-left: 5px;
    }
`
const StyledButton = ({ children, ...rest }) => {
    return <Button {...rest}>{children}</Button>
}

export default StyledButton
