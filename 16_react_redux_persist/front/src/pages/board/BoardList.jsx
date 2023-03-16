import { Button } from "../../common"
import { Row } from "../../common/row"
import { BoardTable } from "../../common/table"

export const BoardList = () => {
    return (
        <>
            <Row width="600px" height="auto" align="center">
                BoardList
                <BoardTable />
                <Button text={"버튼!!!!"} color={"pink"} fullWidth active />
            </Row>
        </>
    )
}
