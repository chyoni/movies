# Movies App

### Not Expo But Create-React-Native-App

    - we are using expo
    - we are customized android, ios build files

```bash
npx create-react-native-app
```

- #01 Preload

- #02 React-Navigation Install

  ```bash
  npm install @react-navigation/native
  expo install react-native-screens react-native-safe-area-context

  npx pod-install ios (if you are using Mac OS and developing ios app)

  npm install @react-navigation/bottom-tabs
  ```

- #03 Tab Navigation Initialized

- #04 Dark Mode, TabBarIcon

- #05 Native Stack Navigation

  - stack navigation과 native stack navigation의 차이는 native는 platform기반 즉, ios나 안드로이드의 navigation을 사용하는 것이고
  - stack navigation은 javascript로 만든 navigator를 사용하는 것이다.
  - 성능적인 면에서는 native가 더 좋고 커스텀 적인 면에서는 stack navigation이 더 좋지만 우리는 native를 사용한다.

  ```bash
  npm install @react-navigation/native-stack
  ```

- #06 different between screenOptions with options

- #07 Interact Tab navigation with Stack navigation

  - tab navigation과 stack navigation을 같이 사용하는 법은 저 두개의 navigation을 감싸는 root navigation을 하나 새로 만드는 것이다
    root navigation은 stack navigation이 될거고 root navigation의 screen으로 tab과 stack을 받고 component를 저 두 navigation으로 만든다.
    그럼 기본적으로 tab과 stack이 동일 선상에 놓여지게 된다. 그리고 여기서 같은 navigation안에 screen은 상관이 없는데 다른 navigation(예를 들면, tabs에 있는 screen에서 stack에 있는 screen으로)
    의 두 스크린의 이동을 하려면 navigation props의 navigate function을 그대로 사용하는 건 맞는데 앞에 어떤 navigation으로 갈 건지 말해줘야한다.
    navigate('Tabs', {screen: '[screen name in Tabs navigation]'}) 이런식으로

- #08 styled-components

  - styled-components가 제공하는 theme을 활용하여 dark mode, light mode를 손쉽게 구현할 수 있는 장점
  - View, Text, ...등 항상 import하여 사용할 때의 불편함을 styled 하나만 임포트하여 좀 더 생산성이 높아짐
  - 한 컴포넌트에서 여러 hierarchy구조일 때 View, View, View, View ...등 알아보기 힘듬 -> Container, Header, Main, Footer 등 우리가 원하는 이름으로 사용 가능한 장점

  ```bash
  npm i --save styled-components
  ```

- #09 Apply Typescript

  ```bash
  npm install -D typescript @types/jest @types/react @types/react-native @types/react-test-renderer

  npm install @types/styled-components @types/styled-components-react-native
  ```

- #10 Movies Swiper 1

  ```bash
  npm i react-native-web-swiper --save
  ```

- #11 Movies Swiper 2

  - 블러처리를 뒤에해주고 특정 View를 보여주려는 뷰를 사용할 때 쓰는 BlurView
  - BlurView를 사용할 때 ios 개발에 대해서는 아래 pod-install을 해줘야한다.
  - 그리고 Stylesheet.absoluteFill은 width: 100%; height: 100%; position: absolute; 이렇게 css를 만드는것과 동일하다. 너무 자주사용되니 하나 만들었나보다.

  ```bash
  expo install expo-blur
  npx pod-install ios
  ```

- #12 Swiper Changed and now playing movies

  - Bounce효과를 없애기 위함

  ```bash
  npm i --save react-native-swiper@next
  ```

- #13 Styled Component how to pass props

- #14 Refactoring
