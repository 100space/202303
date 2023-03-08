# Create-React-App

react에 필요한 패키지 및 디렉토리의 기본 구조를 구성해주는 명령어가 있다.
CRA를 이용하여 설치하게 되면 webpack & babel 등 기본 기능에 대한 세팅이 완료된다.

```sh
# 1. npx
$ npx create-react-app [프로젝트명]

# 2. npm
$ npm init react-app [프로젝트명]
```

npx를 이용한 방법이 많이 쓰인다. 동일한 결과가 나온다.

# CRA

package.json의 script에 보면 4가지 명령어가 적혀있는것을 확인할 수 있는데,
`npm run [명령어]`를 이용하여 4가지를 실행 시킬 수 있다.

1. start

```sh
npm run start
```

위의 명령어를 이용해서 `dev server`을 열 수 있다.
`http://localhost:3000` 로 확인할 수 있고, 명령어를 실행하게 되면 자동으로 브라우저를 열어서 이동시켜 준다. 이전까지 `dev server` 패키지를 이용해서 수동 설정했던과 같은 역할이다.

2. build

```sh
npm run build
```

위의 명령어를 이용하면 build폴더에 작성한 코드들을 번들링된 파일을 생성해준다.

3. test

```sh
npm run test
```

위의 명령어를 이용하면 jest를 이용한 테스트를 진행한다.

4. eject

```sh
npm run eject
```

위의 명령어를 이용하면 숨겨진 파일이나 폴더가 나타나며, 사용자가 원하는 대로 설정을 바꿀 수 있다.(webpack 등등..) 기본적으로 잘 되어있기 때문에 수정해서 써야하는 경우는 드물다.

기본적인 개발을 위해서는 1,2번 명령어로 만들 수 있다.

CRA 툴을 설치하면 App.js와 index.js 파일이 있는데 구분을 위해서 .jsx로 바꾸고 진행하는 것이 좋다.

# CSS

기본적으로 App.css 와 index.css가 있는데, App.css는 삭제하고, index.css에서 전역에 들어가는 공통된 사항을 적어줄 것이다.

```css
* {
    margin: 0;
    padding: 0;
}
ul,
li {
    list-style: none;
}

a {
    text-decoration: none;
}
html {
    /* 1rem = 10px로 설정하기 위함.*/
    font-size: 62.5%;
}
```

styled-components를 이용하여 컴포넌트마다 css를 적용시킬 것이다.

# 페이지 구성하기

## 디렉토리 및 컴포넌트

```
| - src
| --- components
| ----- header
| ----- footer
| --- hooks
| --- layouts
| ----- header.jsx
| --- pages
| ----- Home.jsx
| ----- About.jsx
| ----- Login.jsx
| ----- Contact.jsx
| - App.jsx

```

### 디렉토리

1. components : 조그만한 컴포넌트에 대한 내용을 만든다.

    - ex : 버튼, input, checkbox...

-   큰 컴포넌트를 기준으로 하위 디렉토리를 더 나눠서 할 수 있다.

    -   components/header/button.jsx
    -   components/header/headerWarp.styled.jsx
    -   components/footer/button.jsx

        같이 사용할 수 있다. 스타일을 위한 컴포넌트는 .styled.jsx로 구분할 수 있다.

2. hooks : 커스텀 훅에 대한 내용을 만든다.

3. layouts : header, footer, sidebar 같은 페이지 컴포넌트에 들어갈 컴포넌트의 내용을 만든다.

4. pages : 실제 앱의 페이지에 대한 컴포넌트이다.
    - ex: Home, About, Login, 등등...
      pages 안에 있는 디렉토리는 components, hooks, layouts에 있는 컴포넌트를 조합해서 실제 보여지는 페이지가 나온다. 그렇기 때문에 페이지의 개수와 컴포넌트의 개수가 같다.

### 컴포넌트

한 페이지에 구성하는 컴포넌트가 많아지면서 import 영역이 지저분해 진다.
예를 들면

-   App.jsx

```js
import { Home } from "./pages/home.jsx"
import { About } from "./pages/home.jsx"
import { Login } from "./pages/home.jsx"
import { Contact } from "./pages/home.jsx"
```

이렇게 App에 4가지 페이지를 넣기 위해서 import문의 종류가 많아질텐데
이를 깔끔하게 사용하기 위해 index.jsx 파일을 이용할 수 있다.

위에 4가지 컴포넌트는 다 같은 디렉토리에 있는 내용이다. 그렇기 때문에 디렉토리 내에 index.jsx파일을 만들어 4가지를 다 불러오고 index를 다시 내보내서 import 영역을 간단하게 쓸 수 있다.

-   index.jsx

```js
export * from "./About"
export * from "./Contact"
export * from "./Home"
export * from "./Login"
```

-   App.jsx

```js
// index는 생략 가능하다.
import { Home, About, Login, Contact } from "./pages"
```

## 컴포넌트 변경

웹페이지에서 화면을 바꿀 때 변하는 것이 url이다.
react에서도 url을 이용하여 컴포넌트를 바꿀 수 있다. 하지만 react에서 기본적으로 라우터가 지원되지 않기 때문에 별도의 패키지를 설치해야한다.

```sh
$ npm install react-router-dom
```

### header

가장 먼저 url을 바꾸기 위해서 기존에 같은 경우

```js

return (
    <>
        <div id="nav">
            <ul>
                <li><a href="/">Home</a><li>
                <li><a href="/about">About</a><li>
                <li><a href="/login">Login</a><li>
                <li><a href="/contact">Contact</a><li>
            </ul>
        </div>
    </>
)
```

와 같은 방법으로 컴포넌트를 만들었을 것이다. 이렇게 되면 a 태그에 의해 링크가 변하면서 화면이 새로고침(새로 렌더링)이 될 것이다. 하지만 React는 SPA(single page application)이기 때문에 url이 변경되더라도 새로고침이 일어나면 안된다.

그래서 NavLink라는 컴포넌트를 이용하여 a태그의 역할을 할 수 있다.

```js
import { NavLink } from "react-router-dom"

return (
    <>
        <div id="nav">
            <ul>
                <li><NavLink to="/">Home</NavLink><li>
                <li><NavLink to="/about">About</NavLink><li>
                <li><NavLink to="/login">Login</NavLink><li>
                <li><NavLink to="/contact">Contact</NavLink><li>
            </ul>
        </div>
    </>
)
```

NavLink 컴포넌트는 to prop을 사용하여 이동할 URL을 지정할 수 있고, URL이 이동하여도 새로고침, 재렌더링이 되지 않는다.

App 컴포넌트에서 라우터를 거쳐 url을 판단하여 그 url에 맞는 컴포넌트를 변경해줘야한다.

라우터 컴포넌트를 표현한 간단한 트리구조를 보면 사진과 같다.

<!-- 사진 -->

라우터 컴포넌트를 이용한 코드의 작성 예시를 보면

```js
import { BrowserRouter, Routes, Route } from "react-router-dom"

return (
    <BrowserRouter>
        {/* Header에 관련된 Routes */}
        <Routes>
            <Route path="/" element={<Header user={user} logout={logout} />} />
            <Route path="/about" element={<Header2 user={user} logout={logout} />} />
            <Route path="*" element={<Header3 user={user} logout={logout} />} />
        </Routes>

        {/* Contents 관련된 Routes */}
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login login={login} />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<>페이지를 찾을 수 없습니다.</>} />
        </Routes>
    </BrowserRouter>
)
```

위와 같이 작성될 수 있다.

BrowserRouter 컴포넌트를 사용하여 브라우저의 url과 React의 라우팅을 연결할 수 있다.
BrowserRouter 컴포넌트는 현재의 URL을 추적하고 브라우저의 주소창과 동기화한다.

Routes 컴포넌트는 여러개의 Route 컴포넌트를 포함하는 컨테이너 컴포넌트이다.
Routes 컴포넌트는 브라우저의 현재 URL을 참고하여 매칭을 하여 일치하는 첫 번쨰 Route 컴포넌트를 렌더링 한다.

Route 컴포넌트는 경로와 경로에 대한 컴포넌트를 지정해준다. 중요한 prop 2가지가 있는데, path와 element이다. path prop은 경로를 지정하고, element prop은 경로와 일치했을 때 보여줄 컴포넌트를 지정할 수 있다.

#### useNavigate

useNavigate 훅은 react-router-dom 안에 있는 훅으로 사용하기 위해서는 import로 불러온 후 사용할 수 있다.

```js
import { useNavigate } from "react-router-dom"

const navigate = useNavigate()

navigate("/")
```

useNavigate 훅은 고차함수로 되어있고, 매개변수로 URL을 스트링타입으로 받아서 사용할 수 있다.

navigate는 위의 NavLink 처럼 새로고침 없이 URL을 변경할 수 있다.
