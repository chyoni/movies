import { Dimensions } from 'react-native';
export const makeImgPath = (img: string, width: string = 'w500') =>
  `https://image.tmdb.org/t/p/${width}${img}`;
export const { height: SCREEN_HIGHT } = Dimensions.get('window');
