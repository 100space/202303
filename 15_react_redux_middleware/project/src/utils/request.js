import axios from "axios"

const request = axios.create({
    baseURL: "http://localhost:3005",
    withCredentials: true, // 왜필요한지 알것. (비동기 요청을 할때 ,쿠키를 같이 보내기 위해서)
    headers: {
        "Content-Type": "application/json",
    },
})

export default request
