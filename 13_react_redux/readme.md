# Redux

리덕스는 상태 관리 라이브러리 중 하나이다.

기존에 전역으로 상태 관리하기 위해서 react에서 `useContext`,`createContext`를 이용한 `Context API`를 이용하여 상태를 관리했지만 큰 문제가 없지만,

Redux를 사용하면 상태 관리를 효과적으로 할 수 있다.

## Redux middleware

`Redux`를 사용하는 가장 큰 이유는 `미들웨어`기능이다.
미들웨어 기능을 이용하여 액션을 처리하기 전에 추가기능을 구현할 수 있다.

저번 로그인 로직구현하는 페어코딩을 할 때 사용했던 코드이다.

```js
// 예시코드
const handleSubmit = async (e) => {
    e.preventDefault()
    const userid = userId.value
    const userpw = userPw.value
    const result = await axios.post("http://localhost:3005/check", { userid, userpw }, { withCredentials: true })
    const cookie = document.cookie.split("=")[1]
    const response = await axios.get("http://localhost:3005/check", { headers: { Authorization: `Bearer ${cookie}` } })
    const { expire } = response.data
    const { data } = result
    if (data.status === 200) {
        dispatch({ type: "LOGIN", payload: !state.isLogin, expire })
        navigate("/")
    } else if (data.status >= 400) {
        console.log(data.message)
    }
}
```

위의 코드에서 요청을 한 후 응답을 받으면 그 내용을 가지고 상태를 바꿨었다.
보통의 로직에서는 백엔드에 요청하는 코드가 있으면 응답을 받고 그 응답받은 내용을 상태를 바꾸기 위해서 사용한다. 그렇다면 이 과정을 한번에 할 수 있지 않을까? 라는 생각을 하게 된다.
그렇게 해서 redux라는 라이브러리가 생겼고, redux를 이용하여 action 다음에 reducer함수가 발동 되기 전에 middleware 단계에서 추가적인 과정을 할 수 있게 되었다.

## 미들웨어 라이브러리

대표적인 미들웨어 라이브러리로 `redux-saga`, `redux-thunk`가 있다.
Redux action 처리를 관리하고 비동기 작업을 처리하는 데 사용한다.
차이점은 `thunk`는 Redux action을 함수로 처리할 수 있게 해주고, `saga`는 제너레이터 함수를 사용하여 액션을 관리한다. saga가 thunk보다 복잡하고 하고 강력하게 관리할 수 있지만 처음 배우기에 어려운 개념이 있고, thunk의 활용도도 높기 때문에 접근에 쉬운 thunk를 배우려 한다.

사진

# Redux-thunk

redux-thunk는 action값에 함수를 사용하여 처리하는 방식인데, 위에 코드에서

```js
dispatch({ type: "LOGIN", payload: !state.isLogin, expire })
```

처럼 인자값으로 객체를 받던 것을

```js
dispatch(() => {
    // 처리할 로직
})
```

위와 같이 인자값을 함수로 받아서 처리한다.

# NodeJS로 Redux-thunk 구현하기

리액트에서 Redux-thunk를 사용하기 전에 어떤 방식으로 redux-thunk가 구현되는지 확인하기 위해 nodejs 환경에서 작성해서 확인해볼 예정이다.

## 관련 패키지 설치하기

```sh
$ npm init -y
$ npm install redux
```

## 예시코드

```sh
# 디렉토리 구조
| - /src
| ---- /reducer
| ---- /store
| ------- index.js
```

```js
// /store/index.js
const { createStore, applyMiddleware } = require("redux")
const { rootReducer } = require("../reducers")

const createThunkMiddleware = (arguments) => {
    return (store) => (next) => (action) => {
        console.log("middleware")

        if (typeof action === "function") {
            console.log("func?")
            return action()
        }

        console.log("object?")
        return next(action)
    }
}

const store = createStore(rootReducer, applyMiddleware(createThunkMiddleware()))

store.dispatch(() => {
    store.dispatch({ type: "increment" })
})
console.log(store.getState())

//
// /reducer/index.js
const { combineReducers } = require("redux")
const { counterReducer } = require("./counter")
const { userReducer } = require("./user")

const rootReducer = combineReducers({
    counter: counterReducer,
    user: userReducer,
})

module.exports = { rootReducer }

// /reducer/user.js

const initialState = {
    userid: "",
    username: "",
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

module.exports = { userReducer }

// /reducer/counter.js

const initialState = {
    number: 0,
}
const counterReducer = (state, action) => {
    switch (action.type) {
        case "increment":
            return { number: state.number + 1 }
        case "decrement":
            return { number: state.number - 1 }
        default:
            return initialState
    }
}
module.exports = { counterReducer }
```

미들웨어 함수를 Redux 스토어에 적용하려면 applyMiddleware 함수를 사용해야 한다.
createThunkMiddleware 함수를 사용하여 thunkMiddleware를 생성하고, applyMiddleware 함수를 사용하여 Redux 스토어에 적용한다.

## action을 함수로 전달하기

action을 함수로 전달하면서 비동기 로직을 추가할 수 있다. `/store/index.js`에서 작성한 코드를 확인해보면

```js
const createThunkMiddleware = (arguments) => {
    return (store) => (next) => (action) => {
        console.log("middleware")

        if (typeof action === "function") {
            console.log("func?")
            return action()
        }

        console.log("object?")
        return next(action)
    }
}
```

위와 같이 action이 함수인지 아닌지에 따라서 구분해서 작업을 할 수 있고
함수 일때, `action()`으로 action함수를 실행하여 다시 dispatch를 실행할 수 있다.
이를 활용하면, 처음 전달되는 함수가 실행해서 성공 여부를 판단하여 각각 다른 상태로 변환할 수 있다.

# combineReducers()

여러 상태를 가지는 reducer 함수를 관리하면서 상태변화에 따른 switch문의 case가 복잡해지는 경우가 많다. 이를 해결하기 위해서 combineReducers() 함수를 사용하여, 각각의 상태를 관리하는 reducer을 생성하면 된다. 각각의 reducer은 각 상태만 관리하고 이를 rootReducer로 합쳐서 전체 상태를 관리할 수 있다. 이렇게 하면 변하지 않는 상태에 대한 관리가 편해진다.

```js
const initialState = {
    counter: 0,
    user: {},
    board: [],
}
const rootReducer = (state, action) => {
    switch (action.type) {
        case "increment":
            return { ...state, counter: state.counter + 1 }
        case "decrement":
            return { ...state, counter: state.counter - 1 }
        default:
            return initialState
    }
}
```

만약 위와 같은 코드에서는 초기 상태가 { counter: 0, user: {}, board:[] } 이렇게 찍히고 `...state` 를 이용하여 변화되지 않는 상태에 대해서도 나열을 해주었기 때문에 counter의 상태가 변해도 나머지 상태에 대해서는 변화가 없었다.
만약에 `...state`가 없없다면 { counter: 1 }이렇게만 찍혔을 것이다.
`...state` 덕분에 { counter: 1, user: {}, board:[] } 찍힐 수 있다.

이렇게 변하지 않는 상태에 대해서 관리하는 과정이 필요하기 때문에 불편한 점이 생기는데,
combineReducers()를 이용하여 각 객체별로 reducer을 관리하게 되면 해당 reducer의 각 상태만 바뀌기 때문에

```js
const initialState = {
    number: 0,
}
const counterReducer = (state, action) => {
    switch (action.type) {
        case "increment":
            return { number: state.number + 1 }
        case "decrement":
            return { number: state.number - 1 }
        default:
            return initialState
    }
}
module.exports = { counterReducer }
```

`...state`가 없어도 원하는 데이터 { counter: 1, user: {}, board:[] } 가 그대로 나온다.

# Action

action은 dispatch의 인자값으로 상태를 변경하는 역할을 한다. 최소한 type이라는 key를 가지고 있어야 한다.
이 type을 이용하여 switch 문에서 해당 액션에 맞는 상태로 변하게 된다.

위에 과정에서처럼 Reducer을 분리해서 작성하는 경우 규칙이 있다. (필수는 아니지만 많이 사용하는 규칙)

`reducer이름/액션명`, `reducer이름_액션명`, `reducer이름-액션명` 과 같이 사용된다.
어느 것을 사용하든 상관없지만 중요한 것은 type과 switch 문의 조건이 반드시 똑같아야한다.
히지만, type은 스트링 타입으로 작성이 되기 때문에 코드 작성 과정에서 실수할 가능성이 높다.

예를 들면 "add", "ADD"는 서로 다른 것으로 판단된다.

그래서 여러가지 방법을 이용해서 오타를 줄이는 방법이 있다.

1. 타입을 변수로 지정하여 사용하기 (대문자로 많이 쓰임)

```js
const ADD = "USER/ADD"

// store.dispatch({ type: ADD, payload: { userid: "web7722", username: "baekspace" } })
```

2. 액션 함수를 만들어 사용하기 (소문자로 많이 쓰임)

```js
const add = (userid, username) => {
    return { type: "USER/ADD", payload: { userid, username } }
}

// store.dispatch(add("baekbr13", "123"))
```

위와 같이 사용하면서 오타를 줄일 수 있다.
