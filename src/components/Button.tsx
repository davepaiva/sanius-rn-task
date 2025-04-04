import React from 'react';
import { Pressable, PressableProps, StyleSheet, StyleProp, ViewStyle, View } from 'react-native';
import Text from './Text';
import palette from '@styles/palette';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface ButtonProps extends PressableProps {
  title: string;
  variant?: 'primary' | 'secondary';
  leftIcon?: string;
  rightIcon?: string;
  iconSpacing?: number;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  style,
  leftIcon,
  rightIcon,
  iconSpacing = 8,
  disabled = false,
  ...props
}) => {
  return (
    <Pressable
      style={({ pressed }): StyleProp<ViewStyle> => ([
        styles.button,
        styles[variant],
        pressed && styles.pressed,
        disabled && styles.disabled,
        style,
      ] as StyleProp<ViewStyle>)}
      disabled={disabled}
      {...props}
    >
      <View style={styles.contentContainer}>
        {leftIcon && (
          <View style={{ marginRight: iconSpacing }}>
            <Icon 
              name={leftIcon}
              size={20}
              color={disabled ? palette.disabled : '#FFFFFF'}
            />
          </View>
        )}
        <Text
          style={[
            styles.text,
            variant === 'secondary' && styles.secondaryText,
            disabled && styles.disabledText,
          ]}
          size="x_large"
          variant="light"
          weight="SemiBold"
        >
          {title}
        </Text>
        {rightIcon && (
          <View style={{ marginLeft: iconSpacing }}>
            <Icon 
              name={rightIcon}
              size={20}
              color={disabled ? palette.disabled : '#FFFFFF'}
            />
          </View>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    padding: 15,
  },
  primary: {
    backgroundColor: palette.primary,
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: palette.primary,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 20,
  },
  secondaryText: {
    color: palette.primary,
  },
  pressed: {
    opacity: 0.8,
  },
  disabled: {
    backgroundColor: 'rgba(166, 166, 166, 0.1)',
    borderColor: palette.disabled,
  },
  disabledText: {
    color: palette.disabled,
  },
});

export default Button;
