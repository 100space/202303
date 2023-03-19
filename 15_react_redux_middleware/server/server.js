const express = require("express")
const app = express()
const cors = require("cors")

app.use(
    cors({
        origin: true,
        credentials: true, // 이 서버에서는 출처가 달라도 쿠키를 받을 수 있다 .
    })
)
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.method, req.path, req.body)
    next()
})

app.get("/categories", (req, res) => {
    res.json([
        { path: "/", name: "Home" },
        { path: "/counter", name: "counter" },
    ])
})
app.get("/login", (req, res) => {
    res.json({
        isLogin: true,
        data: {
            userid: "baekspace",
        },
    })
})
app.get("/logout", (req, res) => {
    res.json({
        isLogin: false,
        data: {
            userid: "",
        },
    })
})

app.listen(3005, () => {
    console.log("server start")
})
