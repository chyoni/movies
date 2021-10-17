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
