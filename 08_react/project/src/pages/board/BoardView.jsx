import { useParams } from "react-router-dom"

export const BoardView = () => {
    const params = useParams()
    console.log(params.id)
    return <>BoardView 페이지</>
}
