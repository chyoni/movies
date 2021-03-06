import React from 'react';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native';
import { Asset } from 'expo-asset';
import { useState } from 'react';
import { useEffect } from 'react';
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from 'react-query';
import useColorScheme from 'react-native/Libraries/Utilities/useColorScheme';
import Root from './navigation/Root';
import { ThemeProvider } from 'styled-components/native';
import { darkTheme, lightTheme } from './styled';

const queryClient = new QueryClient();

const loadFonts = (fonts) => fonts.map((font) => Font.loadAsync(font));

const loadImages = (images) =>
  images.map((image) => {
    if (typeof image === 'string') {
      // 받은 배열의 인자가 string인 경우
      return Image.prefetch(image);
    } else {
      // 받은 배열의 인자가 string이 아닌 require()인 경우
      return Asset.loadAsync(image);
    }
  });

export default function App() {
  const [ready, setReady] = useState(false);
  const preload = async () => {
    // 원하는 모든 폰트를 배열안에 넣고 전부 로드하기 위함
    const fonts = loadFonts([Ionicons.font]);
    //원하는 모든 이미지를 배열안에 넣고 전부 로드하기 위함
    const assets = loadImages([
      require('./assets/model.jpeg'),
      'https://i.mdel.net/oftheminute/images/2019/07/Jill-06.jpg',
    ]);
    // loadAsync가 전부 로드 될 때까지 기다림
    await Promise.all([...fonts, ...assets]);
  };
  useEffect(() => {
    try {
      preload();
      setReady(true);
    } catch (e) {
      console.log(e);
    }
  }, []);
  const isDark = useColorScheme() === 'dark';
  if (!ready) {
    return <AppLoading />;
  }
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
          <Root />
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
