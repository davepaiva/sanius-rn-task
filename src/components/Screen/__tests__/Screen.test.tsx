import React from 'react';
import {Text} from 'react-native';
import {render, fireEvent, screen} from '@testing-library/react-native';
import Screen from '../index';

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    goBack: mockNavigate,
  }),
}));

jest.mock('react-native-vector-icons/Ionicons', () => ({
  default: 'Ionicons',
}));

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  }),
}));

describe('Screen', () => {
  it('renders children correctly', () => {
    render(
      <Screen>
        <Text>Test Content</Text>
      </Screen>,
    );

    expect(screen.getByText('Test Content')).toBeTruthy();
  });

  it('renders navbar when showNavbar is true', () => {
    render(
      <Screen showNavbar title="Test Title">
        <Text>Test Content</Text>
      </Screen>,
    );

    expect(screen.getByText('Test Title')).toBeTruthy();
  });

  it('handles back button press', () => {
    render(
      <Screen showNavbar showBackButton>
        <Text>Test Content</Text>
      </Screen>,
    );

    fireEvent.press(screen.getByTestId('back-button'));
    expect(mockNavigate).toHaveBeenCalled();
  });

  it('renders right icon when provided', () => {
    const onRightIconPress = jest.fn();
    render(
      <Screen
        showNavbar
        rightIcon={{
          name: 'settings',
          onPress: onRightIconPress,
        }}>
        <Text>Test Content</Text>
      </Screen>,
    );

    fireEvent.press(screen.getByTestId('right-icon'));
    expect(onRightIconPress).toHaveBeenCalled();
  });
});
