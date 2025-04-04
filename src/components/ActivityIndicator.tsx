import React from 'react';
import { ActivityIndicator as RNActivityIndicator, ActivityIndicatorProps as RNActivityIndicatorProps } from 'react-native';

interface ActivityIndicatorProps extends RNActivityIndicatorProps {
    size?: 'small' | 'large';
    color?: string;
}

const ActivityIndicator = ({ size = 'large', color = '#000' }: ActivityIndicatorProps) => {
    return (
        <RNActivityIndicator size={size} color={color} />
    );
};

export default ActivityIndicator;
