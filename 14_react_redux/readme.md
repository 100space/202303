# Npm package

## Redux

-   상태 관리를 위한 라이브러리로, 하나의 객체(store)를 이용하여 전체 상태를 저장하고, 상태를 업데이트 하기위해 사용한다.

## React-redux

-   redux를 이용하여 만든 store를 react와 연결하기 위해서 사용하는 라이브러리이다.
    redux는 react 컴포넌트가 아니기 때문에 react-redux안에 있는 Provider 컴포넌트를 이용하여 하위 컴포넌트에게 store을 전달 할 수 있게 해준다.

## Redux-thunk

-   redux의 미들웨어중 하나로, 액션의 인자값의 데이터타입이 함수 일때, 그 함수를 실행하고, 그 결과를 다시 객체로 만들어서 redux에 전달하는 미들웨어이다.

# 전역 상태 만들기

## 1. redux를 이용하여 전역 상태를 담고 있는 store 객체를 생성하기

```js
// /store/Store.jsx
import { createStore } from "redux"

const initialState = {
    /* 초기 상태 */
}
const rootReducer = (state = initialState, action) => {
    /* 상태 업데이트를 위한 코드 */
}

const store = createStore(rootReducer)
```

## 2. 위에 만든 store를 상위 컴포넌트에서 Provider을 이용하여 전역 상태로 관리한다.

```js
//상위 컴포넌트 ... index.jsx에서 사용했음.
import { Provider } from "react-redux"
import store from "./store/Store.jsx"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
)
```

prop으로 store을 전달했다.

## 3. Redux store에서 상태를 가져오기

Provider의 prop으로 전달된 store 객체를 하위 컴포넌트에서 가져오기 위해서 `useSelector()`을 이용해야 한다.

```js
// 초기상태가 아래와 같을 경우
const state = {
    board: [{}, {},...],
    user: {},
    counter: {},
    // 등등...
}

const state = useSelector((state)=>state.counter)
//위와 같은 방법으로 counter의 값을 구할 수 있다. (map()와 비슷한 역할로 생각해야 한다.)
const {board, user, counter} = useSelector((state)=>state)
//조금 더 깔끔하게 쓰기 위해서 구조분해할당을 이용하여 작성할 수 있다.
```

## 4. 상태 바꾸기

상태를 변화시키기 위해서는 `dispatch` 함수가 필요하다. 전역 상태로 관리하는 store 객체 안에 dispatch 함수가 있는데, 이를 사용하기 위해서 `useDispatch()`를 이용하여 `dispatch` 메소드를 가져와서 사용할 수 있다.

```js
const dispatch = useDispatch()

// dispatch(action)으로 사용한다.
```

위와 같이 선언 후 dispatch를 사용할 수 있게 한다.

# 초기 상태 만들기

전역으로 상태를 관리한다고 해도 랜더가 된 상태에서 페이지를 이동할 때는 초기상태로 돌아가지 않지만
새로고침을 하게 되면 함수가 다시 실행되면서 재렌더가 되고, 이 때는 상태가 초기 상태로 돌아갈 수 밖에 없다.

이를 해결하기 위해서 이전에 저장한 상태를 가져와서 초기화 하는 방법이 필요하다.

보통 로컬스토리지(localStorage)를 이용하여 상태를 저장하고, 초기화시에 이전에 저장한 상태를 로컬스토리지에서 가져오지만, 로컬 스토리지는 관리할 수 있는 데이터의 양이 한정적이므로, 큰 데이터를 다루어야할 경우 서버에서 데이터를 저장하는 방법을 사용해야 한다.
(로컬스토리지의 경우에 브라우저의 DB이므로 관리할 수 있는 양이 매우 적기 때문에 Login 상태 같은것만 관리하고, 저장되어 있는 정보를 가져오는 방법으로는 서버에서 데이터를 가져오는 방법을 쓰는 것이 적합하다.)

## 간단한 서버 만들기

테스트를 위한 간단한 서버 만들기

### 라우터 만들기

**초기 counter**
GET /counters

**counter 더하기**
POST /counters/increment

**counter 빼기**
POST /counters/decrement

```js
// /server/server.js
const express = require("express")
const cors = require("cors")
const app = express()

app.use(cors())

let counter = 5
app.get("/counters", (req, res) => {
    res.json({ count: counter })
})

app.post("/counters/increment", (req, res) => {
    res.json({ count: ++counter })
})
app.post("/counters/decrement", (req, res) => {
    res.json({ count: --counter })
})

app.listen(3005, () => {
    console.log("server.opne")
})
```

## 요청후 응답 받기

저장되어 있는 데이터를 받아서 전역으로 상태를 관리하는 과정으로 구현을 한다.

서버에 있는 데이터를 받기 위해서 Axios를 이용하여 요청하고, 응답받는다.

초기에 데이터를 넣어주는 시점은 컴포넌트가 컴포넌트가 마운트 되는 시점에 요청/응답을 통해 데이터를 받고 초기 상테를 세팅하면 된다.
생명주기를 이용한다. useEffect()를 이용한다.
useEffect 함수서 바로 async/await을 사용할 경우 async 함수가 반환하는 Promise가 아직 완료되지 않았을 수도 있기 때문에, 따로 함수를 빼서 사용해야 한다.

응답/요청용 함수를 외부에 따로 만들어서 호출하는 방법도 가능하지만 안에서 익명함수를 이용하여 작성하였다.

```js
import axios from "axios"
import { useEffect } from "react"

export const Counter = () => {
    useEffect(() => {
        ;(async () => {
            try {
                const response = await axios.get("~~~~~")
                // 응답 내용을 이용한 상태변경
            } catch (e) {
                // 에러처리
            }
        })()
    })
}
```

위와 같은 방법으로 초기 상태를 서버의 데이터를 이용하여 부여할 수 있다.

## dispatch()를 이용하여 상태 변경하기

리액트에서 상태에 대한 내용을 관리할 때 보통 3가지의 상태를 동시에 관리한다.

```js
const initialState = {
    loading: true,
    error: null,
    data: {
        count: 0,
    },
}
```

1. loading : T/F 를 이용하여 loading상태인지를 구분할 수 있다.
2. error : 에러가 발생했을 때 에러 상태를 이용하여 error 페이지로 이동 시킬 수 있다.
3. data : 실제 관리하고자 하는 데이터를 저장하는 상태이다. 이 상태에 실제 데이터가 저장되고, 이를 이용하여 사용자에게 보여줄 화면을 그린다.

위에 세가지 상태를 같이 관리하게 되면, 사용자에게 보여줄 데이터가 있을 때, loading 상태를 false로 바꾸면서 화면을 보여주고, 만약 데이터 로딩중 에러발생시 error상태를 true나 어떤 값을 넣어서 에러페이지로 이동시킨다.

### 상태변화 예시

처음에 loading 상태를 `true`로 바꾼 후(loading페이지가 렌더) API를 통해 사용자 정보를 가져온다. 성공적으로 데이터를 가져오게 되면 data 상태를 업데이트 하면서 loading 상태를 다시 false로 바꾼다. 반대로 데이터를 가져오는 과정에서 error가 발생하면 error상태를 true로 바꾸고, 에러페이지를 보여준다.

### Action

action에 type속성을 이용하여 action이 어떤 종류의 작업인지 식별해주는 식별자이다.
기존에 increment, decrement로 type을 지정했었지만 지금 서버에서 요청에 의해 상태를 변화하고 그 상태를 가져다가 브라우저에서 전역상태를 바꿔주는 과정을 하고 있기 때문에
다른 이름을 이용하여 식별자를 만들었다.

상태에 3가지가 있는 것을 이용하여,
`COUNTER/SETUP_START`, `COUNTER/SETUP_SUCCESS`, `COUNTER/SETUP_ERROR` 를 이용하여 식별자를 구분하였다.
요청/응답에 의해 서버에서 데이터가 이미 변한 상태를 가져오기 때문에 상태에 setting만 진행하면 되고 start 식별자는 loading 상태를 true변경해주고, success는 데이터를 가져왔을 때, loading 상태를 다시 false로 바꿔주고 받은 데이터를 payload로 사용한다. error는 에러 메세지가 발생했을 때, 처리할 action을 만든다. 이때도, loading은 false이다.

```js
// 사용 예시

//이벤트 발동시 dispatch 사용
const increment = async () => {
    dispatch({ type: "COUNTER/SETUP_START" })
    try {
        const response = await axios.post("http://localhost:3005/counters/increment")
        console.log(response)
        dispatch({ type: "COUNTER/SETUP_SUCCESS", payload: response.data })
    } catch (e) {
        dispatch({ type: "COUNTER/SETUP_ERROR", payload: e })
    }
}

//reducer.jsx
export const counter = (state = initialState, action) => {
    switch (action.type) {
        case "COUNTER/SETUP_START":
            return { ...state, loading: true }
        case "COUNTER/SETUP_SUCCESS":
            return { ...state, loading: false, data: action.payload }
        case "COUNTER/SETUP_ERROR":
            return { ...state, loading: false, error: action.payload }
        default:
            return state
    }
}
```

이 방법을 이용하여 요청/응답의 결과에 따른 상태를 관리할 수 있다.
