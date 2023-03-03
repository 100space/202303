# React.Fragment

React를 처음 배울 때 컴포넌트 return에 최상위 엘리먼트는 1개여야 한다는 것을 설명한 적이 있다. 그때 모든 컴포넌트 대해서 `div`를 이용해서 감쌀 경우 원치 않은 div에 감싸지는 경우가 생긴다.

```html
<div>
    <div>컴포넌트 1-1</div>
    <div>컴포넌트 1-2</div>
</div>
<div>
    <div>컴포넌트 2-1</div>
    <div>컴포넌트 2-2</div>
</div>
```

최상위 `div`를 React.Fragment로 감싸게 되면

```html
<React.Fragment>
    <div>컴포넌트 1-1</div>
    <div>컴포넌트 1-2</div>
</React.Fragment>
<React.Fragment>
    <div>컴포넌트 2-1</div>
    <div>컴포넌트 2-2</div>
</React.Fragment>
```

코드를 작성할 때는 <React.Fragment> 태그가 있지만 실제로 출력되는 엘리먼트 요소는

```html
<div>컴포넌트 1-1</div>
<div>컴포넌트 1-2</div>
<div>컴포넌트 2-1</div>
<div>컴포넌트 2-2</div>
```

로 생략되어 나온다.

<React.Fragment> 는 <></> 빈 상태로 작성해서 간단하게 사용할 수 있다.

이를 활용해서 컴포넌트를 만들 때 default로 넣고 사용하는 경우가 많다.

```js
return (
    <>
        <div>컴포넌트 1-1</div>
        <div>컴포넌트 1-2</div>
        <div>컴포넌트 2-1</div>
        <div>컴포넌트 2-2</div>
    </>
)
```

# useRef

React Hook 함수중 `useRef`를 이용하여 DOM 요소를 선택하고 싶을 때 사용할 수 있다.

예를 들어 input 태그를 이용해서 해당 input에 focus()를 이용하고 싶을 때 vanilla JS에서는

```js
const userId = document.querySelector("#userId")
userId.focus()
```

위와 같이 사용했었다.

리액트에서는 함수형 컴포넌트를 사용할 때 위와 같은 방법이 아닌 useRef()를 이용하여 작성한다.

```js
const Ref = () => {
    const userId = useRef(null)
    console.log(userId, "최소 렌더시 생성")

    const handleSubmit = (e) => {
        e.preventDefault()
        userId.current.value = ""
        userId.current.focus()
        console.log(userId, "submit 발동시")
    }
    useEffect(() => {
        console.log(userId, "Mount시")
    }, [])

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" id="userId" ref={userId} />
                <input type="text" id="userPw" />
                <button type="submit"> 확인</button>
            </form>
        </>
    )
}
```

이를 이용하여

```js
userId.current.focus()
```

submit 이벤트 발동시 focus() 을 할 수 있다.

_Ref.png_

사진을 보면 최초 렌더링을 할 때 userId의 값은 비어있었다.
이후 마운트가 되면서 userId의 상태값이 바뀌고 이 때 userId의 값이 대입 된 것을 확인할 수 있다.

어느 시점에 값이 할당되어 사용이 가능한지를 알고 적용할 수 있어야 한다.

# Custom Hook

custom hook을 만드는 가장 큰 목적은 중복된 코드를 제거하기 위해서 만든다.
만약 input 박스가 여러개 있는 `회원가입 Form`을 리액트를 이용해서 만들 때, 상태를 관리하기 위해서 같은 역할을 하는 함수들이 많아지게 된다.

```js
const [userid, setUserid] = useState("")
const [userpw, setUserpw] = useState("")
const [userNick, setUserNick] = useState("")
const [userName, setUserName] = useState("")

.
.
.

const handleChange = (e) =>{
    e.preventDefault()
    setUserid(e.target.value)
}
const handleChange2 = (e) =>{
    e.preventDefault()
    setUserpw(e.target.value)
}
.
.
.

```

이러면 변수도 많아지고 이에 따라 이벤트 이름을 공통적으로 짓게 되면 나중에 유지보수, 중복된 코드가 많아지게 된다.

그래서 함수로 따로 관리하여 조금 더 간결하게 코드를 작성할 수 있다.

```js
// 컴포넌트
import useInput from "./useInput"

const obj = useInput("")
const obj2 = useInput("")

return (
    <>
        <form onSubmit={handleSubmit}>
            <input type="text" id="userId" ref={userId} {...obj} />
            <input type="text" id="userPw" ref={userPw} {...obj2} />
            <button type="submit"> 확인</button>
        </form>
    </>
)

//
// useInput
import React, { useState } from "react"

const useInput = (inital) => {
    const [value, setValue] = useState(inital)
    const onChange = (e) => {
        setValue(e.target.value)
    }
    return {
        value,
        onChange,
    }
}
export default useInput
```

useInput이라는 함수 하나로 상태를 관리할 수 있기 때문에 중복코드를 제거할 수 있다는 장점이 있다.
그리고 useInput()의 매개변수로 초기 value 값을 설정할 수 있다.

엘리먼트 속성의 {...obj} 부분을 보면 obj는 useInput()인데 return 값이 객체 형태이다.
JS문법을 이용하면 `...` 전개구문(스프레드 연산자)를 이용해서 객체 안에 요소를 다 사용할 수 있다.
그렇기 때문에

```js
const obj = useInput("") // {value, onChange}

return <input type="text" id="userId" ref={userId} {...obj} />
//의 내용은 아래

return <input type="text" id="userId" ref={userId} value="" onChange={() => {}} />
// 와 같다.
```

위에 input 내용과 아래의 input 내용은 같다.

# React CSS 적용하기

SPA의 특성상 URL이 바뀌지 않은 상태로 컴포넌트만 바뀌면서 페이지를 보여주는데,
이를 특성을 이용하면 CSS파일을 한개만 만들어서 bundle.js해서 이용하는 것이 정상이다.
하지만 이 과정에서 많은 문제점이 있다.

한 파일을 이용해서 관리를 하기 때문에 많은 내용의 CSS가 한 파일에 있어야하고, 그러면 나중에 관리가 힘들어진다.
중복되는 CSS가 발생될 수 있고, 정말 잘 짜지 않으면 처음 썼던 CSS 내용이 적용이 안될 수 있다.

React에서 CSS를 적용하는 방법은 4가지가 있다.

기본적으로 패키지를 선택하고 webpack.config.js 설정을 해주어야한다.

```sh
$ npm install style-loader css-loader
```

```js
// module.rules
    {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
    },
```

## 방법 1. inline-style 이용하기

return의 JSX 문법에서 Element에 style 속성을 이용하여 적용한다.

```js
return <input type="text" id="userId" ref={userId} {...obj} style={{ background: "red" }} />
```

## 방법 2. CSS파일 import 해서 이용하기

외부파일을 이용하는 것과 같이 css파일을 import해서 적용한다.
이 때, element의 class는 className으로 지정한다.

```css
/* style.css */
.red {
    background: red;
}
```

```js
import "./style.css"

return <input type="text" id="userId" ref={userId} {...obj} className="red" />
```

## 방법 3. CSS Module 이용하기

여러 파일을 만들 때, CSS 파일 내에 중복되는 이름이 있을 경우가 생긴다. 이때, css파일을 모듈파일로 만들어서

`파일이름`.module.css

로 저장하게 되면 컴포넌트 단위로 스타일이 적용되어 중복으로 인한 에러를 방지할 수 있다.

-   사용 예시

```css
/* style.module.css */
.username {
    width: 300px;
    padding: 7px 14px;
    border: 1px solid #333;
    color: #999;
    background-color: red;
}

/* style2.module.css */
.username {
    width: 300px;
    padding: 7px 14px;
    border: 1px solid #333;
    color: #999;
    background-color: blue;
}
```

```js

import style from style.module.css
import style2 from style2.module.css
.
.
.
return <>
    <input type="text" id="userId" ref={userId} {...obj} className={style.username} />
    <input type="password" id="userPw" ref={userPw} {...obj2}  className={style2.username}/>
</>


```

module로 만든 css는 주소창에 `~~~/index.css` 로 확인할 수 있다.

## 방법 4. Styled-components ( CSS-in-JS ) 라이브러리 이용하기

1. 관련 패키지 설치

```sh
$ npm install mini-css-extract-plugin
$ npm install process
```

2. webpack.config.js 설정

```js
// Webpack.config.js
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const webpack = require("webpack")

// module.rules
{
    test: /\.css$/,
    use: [MiniCssExtractPlugin.loader, "css-loader"],
},

//plugins - process 변수 설정
new webpack.ProvidePlugin({
    process: "process/browser",
})
```

3. 적용 예시

```js
import React from "react"
import styled from "styled-components"
// css가 적용된 컴포넌트를 만든다.

// style components 도 컴포넌트이기 때문에 첫글자가 대문자
//문법이 난해함...
const Div = styled.div`
    background: ${(props) => (props.background === "blue" ? "blue" : "yellow")};
`
const Button = styled.button`
    background: black;
    display: inline-block;
    width: ${(props) => props.size + `px`};
    height: 20px;
    color: #333;
    &:hover {
        background: white;
    }
`
const Style = () => {
    return (
        <>
            <Div background="yellow">hello</Div>
            <Button size="500">버튼</Button>
        </>
    )
}

export default Style
```

쉽게 생각하면 스타일이 적용된 컴포넌트를 만들 수 있다.
`(백택)을 이용해서 스타일을 적용시키기 때문에 스트링이라 보기 불편하고, 자동완성이 안되는데, 
확장 프로그램 중에 `vscode-styled-components` 라는 확장프로그램을 사용하면 CSS 파일처럼 속성과 값이 구분 된다.

props를 이용하여 조건문을 작성하고, 값을 줄 수 있다. &기호는 자기 자신을 말하는 기호이므로 `&:hover`는 자기 자신이 hover 됐을 때를 의미한다.
