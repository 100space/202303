import styled from "styled-components"
const Div = styled.div`
    width: 60rem;
    height: 60rem;
    border-style: solid;
    border-image-width: 512px;
    border-image-source: url("../../public/githubs.png");
`
export const User = () => {
    return <Div>Userpage</Div>
}
