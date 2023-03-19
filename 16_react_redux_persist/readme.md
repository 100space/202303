# 전역 상태로 관리하기

리액트에서의 상태는 쉽게 생각해보면 자바스크립트의 변수일 뿐이다.
변수이기 때문에 새로고침, 페이지를 이동하게 되면 상태가 초기화가 되어 다시 그 페이지를 봤을 때, 초기 상태로 되어있다.

이러한 특징 때문에 생기는 가장 큰 문제가 사용자가 이용중에 새로고침을 하게 되면 로그인이 풀리는 상황이 있다. 이 문제를 해결하기 위해서 Redux를 사용해서 전역으로 상태를 관리하여 상태를 유지할 수 있었다.

하지만 Redux에서 store를 이용하여 해결하는 방법은 전역 페이지의 이동에 대해서는 해결할 수 있지만, 새로고침은 전체 파일을 다시 읽어서 재렌더를 하는 상황으로 번들링 된 파일들 다 다시 읽히므로 redux로도 상태를 유지할 수 없었다.

새로고침에 대한 문제를 해결하기 위해서 리액트가 실행되는 환경인 브라우저의 기능을 이용하여 해결 할 수 있다. localStorage를 이용하는 방법이다.

localStorage는 브라우저의 기능이다. localStorage와 비슷한 기능으로 sessionStorage를 이용하는 방법이 있다. 기능은 같지만 사소한 차이가 있다. ( 브라우저 탭간 공유가 안되는 점 등등..)

이전에 localStorage를 이용하여 상태를 전역으로 관리하는 것을 직접 구현한 적이 있지만, 오늘은 `Redux-persist`라는 라이브러리를 이용한 방법으로 구현할 것이다.

# Redux-persist

전역 상태인 Redux Store의 상태를 브라우저가 켜있는 동안 유지할 수 있도록 브라우저의 localStorage에 저장할 수 있도록 도와주는 라이브러리이다.

```sh
$ npm install redux-persist
```

로그인 상태 같은 중요한 상태를 특정 localStorage에 저장한다. store의 상태는 특정 key로 식별한다.

redux-persist는 middleware로 구현되어 있기 때문에, Redux Store를 생성할 때 Middleware로 등록하여 사용한다.
store에 새로운 상태가 저장될 때마다 자동으로 저장소에 업데이트를 한다.
즉, 상태가 변하면 전역 상태가 바뀌고, 전역 상태가 바뀌면 저장소에 상태도 전역 상태와 동일하게 업데이트된다.

## Redux-persist 사용하기

```js
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["user"],
}

const persistedReducer = persistReducer(persistConfig, rootReducer) // 1. config:Obj, 2. roeducer

export const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)))
export const persistor = persistStore(store)
```

위와 같이 코드를 작성하고 상태를 확인하면 새로고침을 하더라도 재렌더가 일어나지 않는다.

하지만 위의 코드에서는 전역상태에 있는 모든 상태를 관리하게 된다. (rootReducer의 상태들 )

이렇게 되면 많은 상태를 관리하는 경우에는 불필요한 데이터나 중요하지 않은 데이터까지 localStorage로 저장되기 때문에 낭비가 있다 이를 해결하기 위해서
`persistConfig` 객체에 `whitelist` 속성을 이용하여 관리할 상태만 선택 할 수 있다.

# 중첩라우팅

중첩라우터를 이용하는 예시는 board 게시판이 있다.

/board/list
/board/write
/board/view/1

/board/modify/1
/board/delete/1

보통 board CRUD를 진행할 때 라우터가 중첩되는 경우가 많다.
기본적인 라우터를 작성한 것을 보면

```js
<Route path="/board/*">
    <Route path="" element={<BoardList />} />
    <Route path="write" element={<BoardWrite />} />
    <Route path="view/:id" element={<BoardView />} />
</Route>
```

이렇게 작성할 수 있다.

`*(와일드카드)`를 이용하여 작성하며, 하위 라우터의 path의 처음 `/` 없이 작성한다.

## Route 파일 분리

```js
// AppRouter.jsx
// 엘리먼트에 하위 라우터컴포넌트를 작성한다.
<Route path="/board/*" element={<BoardRouter />}></Route>
```

```js
// BoardRouter.jsx
import { Routes, Route } from "react-router-dom"
import { BoardList, BoardWrite, BoardView } from "../pages"

export const BoardRouter = () => {
    return (
        <Routes>
            <Route path="" element={<BoardList />} />
            <Route path="write" element={<BoardWrite />} />
            <Route path="view/:id" element={<BoardView />} />
        </Routes>
    )
}
```
