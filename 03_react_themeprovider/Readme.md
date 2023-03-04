# npm과 npx

리액트를 배우면서 webpack를 이용해서 작성한 코드를 확인했었다. 이 때 사용한 명령어가 몇 가지있는데 그 중 3가지 방법에 대한 차이점에 대해서 알아보려한다.

```sh
$ npx webpack

$ npx webpack server

$ npm run dev
```

## npx webpack

npx webpack 명령어를 이용하게 되면 설정해둔 webpack.config.js 파일을 기반으로 해서 파일을 번들링한다. 설정해둔 디렉토리, 파일이름으로 번들링을 해주고 이를 확인하기 위해서 직접 서버를 열어서 확인해야한다.

## npx webpack server

npx webpack serve 명령어는 webpack dev server을 실행하기 위한 명령어로 변경된 사항을 감지하고 브라우저에 새로고침 없이 변경 사항을 확인할 수 있게 해준다. 하지만 이 내용을 메모리에 생성하여 보여주는 것이기 때문에, 번들 파일이 저장되지 않는다.
번들 파일을 만들기 위해서는 npx webpack 명령어를 이용해서 번들 파일을 생성해야 한다.

## npm run dev

npm run dev 명령어는 package.json 파일에 정의된 스크립트를 실행하는 명령어이다.
그렇기 때문에 이 명령어를 사용하기 위해서는 미리 package.json에 명령어를 정의해 두어야한다.

```js
//package.json
"script":{
    "dev": "webpack server"
}
```

이렇게 package.json에 설정해 뒀기 때문에 명령어를 사용할 수 있는 것이고, `npm run dev`를 이용해서 webpack server 명령어와 동일한 동작을 할 수 있게 해준다.
명령어를 정의할 때 npx를 사용하지 않아도 되는 이유는 npm 명령어를 통해 현재 설치되어있는 패키지 `webpack dev server`를 찾아서 실행하기 때문이다.

# props

리액트 컴포넌트를 만들고 렌더링하는 방법 3가지

```js
// 방법 1
return <App />

// 방법 2
return <App></App>

//방법 3
React.createElement(App)
```

렌더링 하는 과정에서 `id="1"` 이라는 props를 전달하는 방법

```js
// 방법 1
return <App id="1" />

// 방법 2
return <App id="1"></App>

//방법 3
React.createElement(App ,{id="1"})
```

이를 이용해서 렌더링을 진행한다면 App component에서 props로 전달 받을 수 있다. id는 프로퍼티의 'key' 이므로 id가 아닌 원하는 대로 지정해서 전달해줄 수 있다.

```js
const App = (props) => {
    console.log(props.id) //1
}
```

props에 children 키도 있는데, 컴포넌트에서 자식 요소들을 나타내는 prop이다.

```js
// 방법 1
return <App id="1">Hello</App>

//방법 2
React.createElement(App ,{id="1"}, "Hello")
```

위와 같은 방법 두 가지를 이용해서 자식요소를 전달할 수 있고, 이 내용은 해당 컴포넌트에서

```js
const App = (props) => {
    console.log(props.id) //1
    console.log(props.children) // Hello
}
```

props 안에 요소로 뽑아서 사용할 수 있다. prop을 조금 더 간결 하게 쓰기 위해서 구조 분해 할당을 하면 요소를 바로 이용할 수 있다.

```js
const App = ({ id, children }) => {
    console.log(id) //1
    console.log(children) // Hello
}
```

<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>

# styled-components

## 동적으로 css 관리하기

리엑트에서 CSS 적용하는 방법으로 `styled-components`를 사용했는데, CSS를 적용시키다보면 공통된 CSS 내용이 있다.

그러면 조금 간결하게 사용하기 위해서 공통된 내용을 css 함수를 이용하여 따로 뽑아서 사용할 수 있다.

```js
import styled, { css } from "styled-components"

const flexCenter = css`
    display: inline-flex;
    justify-content: center;
    align-items: center;
`

const Button = styled.button`
    ${flexCenter}
    border: none;
    outline: none;
    font-size: 20px;
    font-weight: bold;
    padding: 7px 14px;
`

const Div = styled.div`
    ${flexCenter}
    border: 1px solid #000;
    font-size: 24px;
    padding: 7px 14px;
`
```

위와 같은 방법으로 공통된 CSS 속성이 있다면 따로 관리하여 다른 컴포넌트에서도 재사용할 수 있다.

이를 이용해서 동적으로 CSS를 적용하는 방법도 있다.

```js

//상위 컴포넌트
return <Components fullWidth>
```

```js
//하위 컴포넌트
const fullWidthStyle = css`
    ${({ fullWidth }) => {
        return (
            fullWidth && //fullWidth 가 있을 때
            css`
                width: 100%;
            `
        )
    }}
`
```

이 방법은 컴포넌트의 Props와 css함수를 이용해서 css를 동적으로 관리하는 것인데, 컴포넌트에 fullWidth를 props로 받아서 fullWidth 가 있거나 true 일 때 css함수 내 css 속성을 적용시키는 방법이다.

## ThemeProvider

`styled-components`의 컴포넌트 중 하나로, 전역 테마 데이터를 사용할 수 있다. 이전까지 사용했던 root와 비슷한 역할을 한다고 생각하면 쉽다. `ThemeProvider`을 이용하여 모든 컴포넌트에서 사용할 CSS를 정해주고 이를 이용하여 하위 컴포넌트들에서 참조해서 사용하게 되면 일관된 스타일을 유지할 수 있다.

`ThemeProvider`를 사용되어 하위에 있는 모든 컴포넌트에서 사용할 수 있게 되고 이를 이용한 트리구조를 보면 아래와 같다

```js
const themes = {
    // 테마데이터
}

return (
    <ThemeProvider theme={themes}>
        <App>
            <Header />
            <Content />
            <Footer />
        </App>
    </ThemeProvider>
)
```

이런 트리구조로 react를 구성하게 되면 App, Header, Content, Footer의 컴포넌트에서 theme을 이용하여 일관된 css스타일을 이용할 수 있다.

## 사용 예시

### App.jsx

```js
import React from "react"
import Main from "./pages/main"
import { ThemeProvider } from "styled-components"

const App = () => {
    const colorChip = {
        blue: "#228be6",
        gray: "#adb5bd",
        pink: "#f06595",
    }
    return (
        <>
            <ThemeProvider theme={colorChip}>
                <Main />
            </ThemeProvider>
        </>
    )
}

export default App
```

### Main.jsx

```js
import React from "react"
import styled from "styled-components"

const Main = () => {
    return (
        <Div>
            <Title>Hello World!</Title>
            <Button>Click me!</Button>
        </Div>
    )
}

const Div = styled.div`
    background-color: ${({ theme }) => theme.blue};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
`

const Title = styled.h1`
    font-size: 3rem;
    color: ${({ theme }) => theme.gray};
`

const Button = styled.button`
    background-color: ${({ theme }) => theme.pink};
    color: white;
    padding: 1rem 2rem;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    margin-top: 2rem;

    &:hover {
        background-color: ${({ theme }) => theme.blue};
    }
`

export default Main
```
