import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './Tabs';
import Stack from './Stack';

export type RootStackParamList = {
  Stack: undefined;
  Tabs: undefined;
};

const Nav = createNativeStackNavigator<RootStackParamList>();

const Root = () => (
  <Nav.Navigator screenOptions={{ headerShown: false, presentation: 'modal' }}>
    <Nav.Screen name={'Tabs'} component={Tabs} />
    <Nav.Screen name={'Stack'} component={Stack} />
  </Nav.Navigator>
);

export default Root;
