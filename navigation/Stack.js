import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, TouchableOpacity, View } from 'react-native';

// 모든 native stack navigation의 component는 navigation이라는 prop을 갖는다.
// navigate function은 다른 스크린으로 이동하는 방법이다.
const ScreenOne = ({ navigation: { navigate } }) => (
  <TouchableOpacity onPress={() => navigate('Two')}>
    <Text>One</Text>
  </TouchableOpacity>
);
const ScreenTwo = ({ navigation: { navigate } }) => (
  <TouchableOpacity onPress={() => navigate('Three')}>
    <Text>Two</Text>
  </TouchableOpacity>
);

//goBack function은 이전 stack screen으로 돌아간다.
const ScreenThree = ({ navigation: { goBack } }) => (
  <TouchableOpacity onPress={() => goBack()}>
    <Text>Three</Text>
  </TouchableOpacity>
);

const NativeStack = createNativeStackNavigator();

const Stack = () => (
  //screenOptions과 options의 차이는 screenOptions은 모든 screen에 적용하는 거고 options은 해당 screen에만 적용한다는 것이다.
  <NativeStack.Navigator screenOptions={{ headerBackTitleVisible: false }}>
    <NativeStack.Screen
      name={'One'}
      component={ScreenOne}
      options={{ headerTitle: 'ONEONE' }}
    />
    <NativeStack.Screen name={'Two'} component={ScreenTwo} />
    <NativeStack.Screen name={'Three'} component={ScreenThree} />
  </NativeStack.Navigator>
);

export default Stack;
