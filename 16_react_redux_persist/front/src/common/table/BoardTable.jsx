import { TableWrap, TableData, TableHeader, TableRow } from "./styled"

export const BoardTable = () => {
    return (
        <TableWrap>
            <TableHeader>
                <TableRow>
                    <TableData>번호</TableData>
                    <TableData>제목</TableData>
                    <TableData>작정자</TableData>
                    <TableData>작성일</TableData>
                    <TableData>조회수</TableData>
                </TableRow>
            </TableHeader>
            <TableRow>
                <TableData>1</TableData>
                <TableData>제목입니다</TableData>
                <TableData>web7722</TableData>
                <TableData>2023-03-26</TableData>
                <TableData>0</TableData>
            </TableRow>
            <TableRow>
                <TableData>1</TableData>
                <TableData>제목입니다</TableData>
                <TableData>web7722</TableData>
                <TableData>2023-03-26</TableData>
                <TableData>0</TableData>
            </TableRow>
            <TableRow>
                <TableData>1</TableData>
                <TableData>제목입니다</TableData>
                <TableData>web7722</TableData>
                <TableData>2023-03-26</TableData>
                <TableData>0</TableData>
            </TableRow>
            <TableRow>
                <TableData>1</TableData>
                <TableData>제목입니다</TableData>
                <TableData>web7722</TableData>
                <TableData>2023-03-26</TableData>
                <TableData>0</TableData>
            </TableRow>
            <TableRow>
                <TableData>1</TableData>
                <TableData>제목입니다</TableData>
                <TableData>web7722</TableData>
                <TableData>2023-03-26</TableData>
                <TableData>0</TableData>
            </TableRow>
        </TableWrap>
    )
}
