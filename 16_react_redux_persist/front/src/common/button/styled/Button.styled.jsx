import styled, { css } from "styled-components"

export const ButtonStyled = styled.button`
    width: ${(props) => props.width};
    padding: 7px 14px;
    border: 1px solid #333;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    outline: none;
    &.active {
        background: ${(props) => props.active};
    }
    background: ${(props) => props.background};
    color: ${(props) => props.color};
    &:hover {
        background: ${(props) => props.hover};
    }
`
