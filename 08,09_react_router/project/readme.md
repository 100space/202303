# 중첩 라우팅

웹 페이지에서 게시판을 만들 때 필요한 페이지가 크게 4가지가 있다.

1. 전체 목록을 보여주는 List
2. 글을 작성하는 Write
3. 글을 볼 수 있는 View
4. 글을 수정 하는 Modify

이렇게 4가지 페이지가 필요하고, 이를 이용하여 라우터를 만들때,

1. board/list
2. board/write
3. board/view
4. board/modify

로 만들 수 있다.

이미 board 라우터로 나뉘고 거기서 라우터를 또 나눠야하는 상황이 있다.

이때 중첩 라우팅을 이용하여 페이지를 구성할 수 있다.

```js
return (
    <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/board/*">
            <Route path="list" element={<BoardList />} />
            <Route path="write" element={<BoardWrite />} />
            <Route path="modify/:id" element={<BoardModify />} />
            <Route path="view/:id" element={<BoardView />} />
        </Route>
    </Routes>
)
```

위의 코드를 보면 `/ , /login, /board`를 이용하여 크게 3가지 라우터로 나누고 `/board`라우터 같은 경우 `/board/*`을 이용하여 `/board/~~~`로 접근 하는 모든 요청을 받은 후 `Route`컴포넌트를 이용하여 세분화했다.

## Params

View와 Modify의 경우 게시물에 대한 고유값을 알아야 해당 게시물을 확인 또는 수정 할 수 있다.

위에 path를 보면 `~~/:id`를 확인할 수 있다. 이를 이용하여 라우터도 `/board/view/1` `/board/modify/1` 이런 식으로 1번 게시물에 대한 접근이 가능하다.

`:id`는 params를 이용하여 구할 수 있다.

```js
//BoardView component
//상위라우터 : /board/*
//하위 라우터:      view/:id

// 1번 게시물을 확인하고 싶다면
// URL : localhost:3000/board/view/1

import { useParams } from "react-router-dom"

export const BoardView = () => {
    const params = useParams()
    console.log(params) // {*: 'view/1', id: '1'}
    console.log(params.id) // 1
    return <>View페이지</>
}
```

위와 같은 방법으로 지금 라우터의 `:id`값을 구할 수 있다.
이 id 값을 이용하여 view, modify, delete를 구현할 수 있다.

# 전역 상태 관리하기

## useContext() 와 useReducer()

1. useContext()를 이용해서 상태를 관리하면 값을 한 개만 전달 받을 수 있다.
2. 여러개의 상태를 관리하기 위해서 객체를 이용해서 사용했다.
3. useState를 이용해서 관리를 하게 되면 상태를 가지고 있는 변수 와 상태를 변하게 하는 함수를 사용해서 두 개를 한 쌍으로 관리했다. (user, setUser)

이렇게 되면 많은 상태를 관리하기 불편했다. 그래서 클래스형 컴포넌트의 this.state와 this.setState() 방식과 비슷한 방법을 이용하여 관리를 시작했다.

현재 상태를 모두 state 객체로 관리하고 상태의 변화가 필요할 때 setState()를 이용하여 상태를 변경시킨다.

4. reducer 함수와 action 객체를 이용하여 상태를 관리한다.

5. dispatch 라는 함수에 매개변수로 action을 받아서 reducer을 실행하고, 새로운 상태로 변경한다.
   `dispatch(action)`

6. reducer(state, action)으로 두개의 인자를 받는다.
   state는 이전 상태를 받고, action은 객체로 변경할 함수와, 바꿀 내용을 가진다
   `{type : "~~", payload: 변경할 값}`
   reducer 함수는 switch문을 이용하여 상태를 변경하고, 그 변경된 상태를 리턴해준다.

    ```js
    //reducer 함수 예시
    //dispatch(action)
    //dispatch({ type: "LOGIN", payload: !state.isLogin })

    export const rootReducer = (state, action) => {
        switch (action.type) {
            case "LOGIN":
                return { ...state, isLogin: action.payload }
            default:
                return state
        }
    }
    //type이 LOGIN이라면 isLogin을 변경한다.
    ```

7. useReducer()

```
const [state, dispatch] = useReducer(rootReducer, initialState)
```

최초 렌더시 state의 값은 initialState가 대입된다.
dispatch()함수의 인자값으로 action을 받으면, rootReducer()함수가 state(초기엔 initialState)와 action을 인자값으로 받아 처리한(6번과정) 후 변경된 state값을 state값에 대입하여 상태를 변경시킨다.

## store

전역 상태 관리를 하는 하나의 객체로 여러 컴포넌트에 전역 상태를 전달 할 수 있다.

```js
import { createContext, useContext, useReducer } from "react"
import { rootReducer } from "./reducer"

export const Context = createContext()
export const useStore = () => useContext(Context)
export const StoreProvider = ({ children }) => {
    const initialState = {
        isLogin: false,
        user: {},
    }
    const [state, dispatch] = useReducer(rootReducer, initialState)
    return <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
}
```

Context 변수에 createContext()를 이용하여 새로운 컨텍스트를 생성한다. 이 컨텍스트는 여러 컴포넌트에서 데이터에 접근할 수 있게 해준다. 이를 이용하여 상태를 다른 컴포넌트에서 쉽게 접근 할 수 있도록 했다.

useStore 커스텀 훅을 이용하여 다른 컴포넌트에서 접근할 때 호출을 쉽고, 간단하게 할 수 있게 했다.

StoreProvider 컴포넌트는 상위 컴포넌트로 자식 컴포넌트 감싸고 children을 받아 children에 있는 컴포넌트에서 useStore()을 사용하면 value 로 전달된 [state, dispatch]를 접근할 수 있게 한다.

```js
//App.jsx

const App = () => {
    return <StoreProvider>{/* 하위 컴포넌트.... */}</StoreProvider>
}
```

상태를 변화시킬 땐 rootReducer() 함수가 필요하고, 인자 값으로 state, action 두 가지를 받는다.

```js
export const rootReducer = (state, action) => {
    console.log(state, action)

    switch (action.type) {
        case "LOGIN":
            return { ...state, isLogin: action.payload }
        default:
            return state
    }
}
```

하위에 있는 컴포넌트에서 StoreProvider 컴포넌트에서 전달한 value값 을 사용하기 위해서는 useStore함수를 호출 해야한다.

```js
//하위 컴포넌트인 Login.jsx

import { useNavigate } from "react-router-dom"
import { useStore } from "../store"

export const Login = () => {
    const [state, dispatch] = useStore()
    const navigate = useNavigate()
    const handleClick = () => {
        dispatch({ type: "LOGIN", payload: !state.isLogin })
        navigate("/")
    }
    return (
        <>
            <button onClick={handleClick}>로그인</button>
        </>
    )
}
```

로그인 페이지에서 로그인 버튼을 누르면 State에 있는 isLogin의 상태를 바꿔주는 로직이다.
import로 useStore을 불러온 후 실행하면 state와 dispatch()가 있는 객체를 반환한다.

이를 구조분해할당으로 사용하면 된다.
