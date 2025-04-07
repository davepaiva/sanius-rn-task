import React from 'react';
import {render} from '@testing-library/react-native';
import Tag from '../index';

describe('Tag', () => {
  it('renders with label', () => {
    const {getByText} = render(<Tag label="Test Tag" />);
    expect(getByText('Test Tag')).toBeTruthy();
  });

  it('renders with custom color', () => {
    const customColor = '#FF0000';
    const {getByTestId} = render(<Tag label="Test Tag" color={customColor} />);

    const tag = getByTestId('tag-container');
    expect(tag.props.style).toContainEqual({backgroundColor: customColor});
  });

  it('applies style prop to container', () => {
    const {getByTestId} = render(<Tag label="Test Tag" style={{margin: 10}} />);

    const tag = getByTestId('tag-container');
    expect(tag.props.style).toContainEqual({margin: 10});
  });
});
