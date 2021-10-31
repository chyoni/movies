import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Detail from '../screens/Detail';
import { IMovies } from '../screens/Movies';
import { ITvs } from '../screens/Tv';

export type ChildrenStackParamList = {
  Detail: { fullData: IMovies | ITvs };
};

const NativeStack = createNativeStackNavigator<ChildrenStackParamList>();

const Stack = () => (
  //screenOptions과 options의 차이는 screenOptions은 모든 screen에 적용하는 거고 options은 해당 screen에만 적용한다는 것이다.
  <NativeStack.Navigator screenOptions={{ headerBackTitleVisible: false }}>
    <NativeStack.Screen name={'Detail'} component={Detail} />
  </NativeStack.Navigator>
);

export default Stack;
