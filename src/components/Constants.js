import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const SCREEN_HEIGHT = height;

export const SCREEN_WIDTH = width;

export const BUTTON_HEIGHT = 70;

export const FOOTER_HEIGHT = 10;

export const LOGIN_VIEW_HEIGHT = BUTTON_HEIGHT + FOOTER_HEIGHT;