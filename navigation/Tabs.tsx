import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Movies from '../screens/Movies';
import Tv from '../screens/Tv';
import Search from '../screens/Search';
import { Ionicons } from '@expo/vector-icons';

export type ChildrenTabsParamList = {
  Movies: undefined;
  Tv: undefined;
  Search: undefined;
};

const Tab = createBottomTabNavigator<ChildrenTabsParamList>();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        // unmountOnBlur는 탭에서 탭으로 이동 시 기존 올라온 메모리를 다 지워버리는 역할
        unmountOnBlur: true,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="Movies"
        component={Movies}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name={'film-outline'} color={color} size={size} />;
          },
        }}
      />
      <Tab.Screen
        name="Tv"
        component={Tv}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name={'tv-outline'} color={color} size={size} />;
          },
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ color, size }) => {
            return (
              <Ionicons name={'search-outline'} color={color} size={size} />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
