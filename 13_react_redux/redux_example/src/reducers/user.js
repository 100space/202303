const initialState = {
    userid: "",
    username: "",
}

//타입 상수는 대문자
const ADD = "USER/ADD"
//액션 함수를 소문자로 쓰는경우가 많다.
const add = (userid, username) => {
    return { type: "USER/ADD", payload: { userid, username } }
}

const userReducer = (state, action) => {
    switch (action.type) {
        case "USER/ADD": {
            const { userid, username } = action.payload
            return {
                userid,
                username,
            }
        }
        default:
            return initialState
    }
}

module.exports = { userReducer, ADD, add }
