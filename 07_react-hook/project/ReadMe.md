# React

hook

-   useCallback
-   useMemo
-   memo

-   useContext
-   useReducer

컴포넌트 랜더가 될 때 마다 함수형 컴포넌트 같은 경우에는 상태를 가지고 있는 함수 전체를 다시 실행시킨다. 그래서 컴포넌트 안에 로직이 많은 경우 오랜 시간이 걸릴 수 있다.

컴포넌트가 재실행되면서 안에 있는 함수들이 다시 만들어진다.

변화가 없는 함수나 컴포넌트를 재렌더하면서 불필요한 자원을 쓰기 때문에 많은 낭비가 생길 수 있다.

이러한 문제를 함수형 컴포넌트의 훅을 이용하여 방지할 수 있다.

> function component 로 구현했을 때, 리랜더링이 발동되면, 안에 있는 코드들이(상태, 함수, 변수) 다시 실행된다.

## useCallback, useMemo

두개의 목적은 같지만
Callback은 함수, Memo는 값을 반환한다.

## useCallback

useCallback(function, [상태])
리턴값은 function 값

상태가 변해야 callback을 실행한다.

메모이제이션 : 한번 연산한 내용을 메모리에 기억해뒀다가 필요할 때 값을 호출해서 사용한다

useCallback은 function값을 기억하고 있다가 해당 함수 값이 변할 때만 그 함수를 실행하고 그것이 아니라면 기존에 가지고 있던 함수를 사용한다.

상태값을 잘 적어줘야한다. 빈값으로 둘 경우 상태는 올라가지만 화면에 보여지지 않는다.
빈 값을 기억하고 있기 때문에..(함수를 만들 때, count가 0인 상태로 최초 마운트를 할 때 상태를 계속 기억하고 있다...)
그러므로 상태를 count로 기입하여 count가 변화할 때를 추적할 수 있도록 해야한다.

함수를 쓸 때 함수 뒤에 써서 효율적으로 관리할 수 있도록 한다.

```js
//useCallback 사용전
const increment = () => {
    setCount(count + 1)
}

//useCallback 사용후
const increment = useCallback(() => {
    setCount(count + 1)
}, [count])
```

## useMemo

`useMemo(()=>{}, [상태])` 상태가 변경될 때만 함수를 호출하여, 결과값을 반환한다.
반환된 결과값을 이후에 렌더링할 때 재사용한다.

useCallback는 함수 자체를 메모이제이션해서 함수를 다시 생성하지 않고, 이전에 생성된 함수를 반환하는 것이지만 useMemo는 인자로 받은 함수를 실행한 결과 값을 기억하고, 해당 값이 변경되지 않았다면 이전에 계산한 값을 사용한다.
값이 변하지 않았을 때에도 재랜더 되는 현상을 막을 수 있다.

useMemo의 첫 번째 인자로 전달된 함수는 계산 결과를 반환하며, 두 번째 인자로 전달된 배열에 포함된 값이 변경될 때마다 함수를 실행하여 새로운 결과 값을 반환한다.

```js
import { useState, useMemo } from "react"

export const Memo = () => {
    const [numbers, setNumbers] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    const [value, setValue] = useState(0)

    // useMemo가 있을 때,
    const oddNumbers = useMemo(() => {
        return numbers.filter((v) => {
            console.log("hello Memo")
            return v % 2 !== 0
        })
    }, [numbers])

    // useMemo가 없을 때,
    const oddNumbers = numbers.filter((v) => {
        console.log("hello Memo")
        return v % 2 !== 0
    })

    const handleClick = () => {
        setNumbers([...numbers, numbers.length + 1])
    }
    return (
        <div>
            <p>숫자 : {numbers.join(", ")}</p>
            <p>홀수 : {oddNumbers.join(", ")}</p>
            <button onClick={handleClick}>요소추가</button>
            <button onClick={() => setValue(value + 1)}>value</button>
        </div>
    )
}
```

useMemo()를 사용하지 않았을 경우에는 oddNumbers와 관계없는 value 버튼을 눌렀을 경우에도 "hello Memo"가 출력이 된다.
하지만 useMemo()를 사용하면 value 버튼을 눌렀을 때 numbers가 변하지 않기 때문에 "hello Memo"가 출력 되지 않는다. numbers 상태를 추적하고 있기 때문에 numbers의 상태와 관련이 있는 요소추가 버튼을 눌렀을 때만 "hello Memo"가 실행된다.

## memo

prop의 내용이나 내용의 결과물이 같으면 리랜더를 하지않는 방법이 있다.

useMemo와 memo의 차이는 useMemo는 컴포넌트 내부에 있는 변수를 메모이제이션 할 때 쓰는것 이지만 memo는 컴포넌트 자체를 메모이제이션 한 것이다.

컴포넌트의 prop이 바뀌지 않았다면 컴포넌트는 변경되지 않은 것이기 때문에 memo를 이용하여 재랜더를 하지않고 이전에 랜더링된 값을 사용한다.

그런데 컴포넌트 내에서 useCallback을 쓰지 않는다면 상태가 변할 때 마다 새로운 함수 인스턴스가 생성되어 함수의 메모리주소가 달라진다.
그러면 값은 같더라도 새로운 주소로 인식하기 때문에 memo만으로 재랜더를 막을 수 없다.

## useContext

prop을 이용하여 하위 컴포넌트로 1개씩 상태를 전해줄 수 있었지만 전역으로 상태를 관리하는 컴포넌트를 이용하게 되면 상위 컴포넌트에서 몇단계 밑에 있는 컴포넌트에 직접 상태값을 전달 해줄 수 있다. 이를 이용하면 컴포넌트간 데이터를 전달하는 작업을 줄이고 바로 상태 값을 공유 할 수 있다.

redux 라이브러리와 같은 역할을 하지만 redux보다 기능이 빠져있다.

```js
import { useState, createContext, useContext } from "react"

const Global = createContext()

const D = () => {
    const value = useContext(Global)
    return <>Hello Context : {value}</>
}
const C = () => {
    return <D />
}
const B = () => {
    return <C />
}
const A = () => {
    return <B />
}

export const Context = () => {
    const [user, setUser] = useState("web7722")
    return (
        <Global.Provider value="web7722">
            <A />
        </Global.Provider>
    )
}
```

Global.provider 컴포넌트에 value를 이용하여 데이터를 넘겨줄 수 있다.

위의 코드에서 value에 전역상태 데이터를 스트링 타입으로 넣어서 확인을 해봤다.
이렇게 1가지 데이터만 넘기게 되는 경우 전달해서 값을 쓸 수 있지만 값을 변경시킬 수 없었는데, 객체를 이용하여 객체를 전역으로 관리하고 필요한 컴포넌트에서 가져다 쓸 수 있다.

```js
import { useState, createContext, useContext } from "react"

const Global = createContext()

const D = () => {
    const obj = useContext(Global)
    return <>Hello Context : {obj.user}</>
}
const C = () => {
    return <D />
}
const B = () => {
    return <C />
}
const A = () => {
    return <B />
}

export const Context = () => {
    const [user, setUser] = useState("web7722")
    const initialState = {
        user,
        setUser,
    }
    return (
        <Global.Provider value={initialState}>
            <A />
        </Global.Provider>
    )
}
```

위와 같은 방법으로 객체를 이용하여 전역으로 상태를 관리하고 사용할 수 있었다.
하지만 위와 같은 방법을 사용할 때 관리할 상태 값과, 상태 변화를 위한 함수를 각각 가지고 있다보니, 관리해야할 상태 값이 많아지면 문제가 생겼다.

그래서 useReducer를 이용하여 이 문제를 해결 할 수 있다.

## useReducer

클래스 컴포넌트에서 state에 모든 데이터를 setState로 관리했던 것처럼 hook에서 하나의 함수로 여러 상태를 관리하기 위해서 생겼다.

### 상태 바꾸기

```js
this.state = {
    user: {},
    board: {},
    next: false,
}

//방법1. next만 바꾸고 싶을 때,
this.setState({
    ...this.state,
    user: { ...this.state.user },
    board: { ...this.state.board },
    next: true,
})

//방법2. 함수로 다시 빼서
const nextUpdate = {
    ...this.state,
    user: { ...this.state.user },
    board: { ...this.state.board },
    next: true,
}

this.setState(nextUpdate)
```

클래스 컴포넌트에서 상태를 하나의 객체로로 관리할 수 있지만 상태를 변경할 때는 1개를 변경하기 위해서 다른 상태 값들도 같이 변경해야하는 경우가 있었다.

함수형 컴포넌트의 상태 값을 관리하기 위해서 useState를 이용해서 할 수 있지만 단순한 값을 변경하는데에는 효율적이 였지만 복잡한 상태관리 로직에는 한계가 있었다. 이 한계를 해결하기 위해 `useReducer()`가 생겼다.

### useReducer()

```js
useReducer(function 값, 초기상태값)
//첫 번째 인자 : [상태값을 바꾸는 함수]
//두 번째 인자 : 초기 상태 값 (대체로 객체형태)

const initialState = {}
const reducer = (state, action) =>{
    console.log(state)
}
const [state, dispatch] = useReducer(reducer, initialState)
```

reducer는 초기에 랜더될 때는 함수가 실행되지 않고, dispatch가 실행될 때 useReducer의 함수가 실행된다.

useReducer의 첫 번째 인자값인 function은 상태를 변화시키는 함수로 this.setState와 같은 역할이라고 할 수 있다.

reducer에 첫번째 매개 변수로 최초 렌더시 최초의 상태를 다 담고 있다.
reducer는 반드시 return이 포함되어야 한다. (바꿀 상태 값)

dispatch() 의 인자값은 보통 객체가 들어간다.

### reducer()

useReducer 훅에서 상태를 업데이트하기 위한 함수이다.
reducer() 함수는 2가지의 인자 값을 받는다.

1. state
2. action

reducer 함수는 보통 switch 문으로 작성을 한다. reducer 함수 내부에서 state나 action을 변경하면 안되고, 받아온 값을 이용하여 새로운 상태를 반환하는 로직만 구현되어야 한다.

switch 에서 action의 type 값에 따른 조건으로 다른 동작을 수행한다. action안에 type말고 payload도 있는데 이 payload는 문자열, 숫자열, 배열, 객체 등등 담을 수 있고, 이를 이용하여 action에 필요한 추가적인 데이터를 넘겨줄 수 있다.
