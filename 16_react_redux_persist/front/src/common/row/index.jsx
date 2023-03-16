import styled, { css } from "styled-components"

const RowStyled = styled.div`
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    & + & {
        margin-top: 10px;
    }
    ${(props) =>
        props.align === "center" &&
        css`
            margin: 0 auto;
        `}
`

export const Row = ({ width, height, children, align }) => {
    console.log(align)
    return (
        <RowStyled width={width} height={height} align={align}>
            {children}
        </RowStyled>
    )
}
