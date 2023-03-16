import { ButtonStyled } from "./styled"

export const Button = ({ text, color, fullWidth, active }) => {
    const colorChip = {
        yellow: "yellow",
        red: "red",
        green: "green",
        blue: "blue",
        pink: {
            background: "#007bff",
            hover: "#0069d9",
            color: "#fbfbfb",
            active: "#005cbf",
        },
    }
    const width = fullWidth && "100%"
    const isActive = active && { className: "active" }
    return (
        <ButtonStyled background={colorChip[color].background} hover={colorChip[color].hover} color={colorChip[color].color} active={colorChip[color].active} width={width} {...isActive}>
            {text}
        </ButtonStyled>
    )
}
