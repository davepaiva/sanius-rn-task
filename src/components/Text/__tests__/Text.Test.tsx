import React from 'react';
import {render} from '@testing-library/react-native';
import Text from '../index';
import palette from '@styles/palette';

describe('Text', () => {
  it('renders text correctly with default props', () => {
    const {getByText} = render(<Text>Test Text</Text>);
    const textElement = getByText('Test Text');

    expect(textElement.props.style).toContainEqual({
      color: palette.text_primary,
      fontSize: 14,
      fontFamily: 'Poppins-Regular',
    });
  });

  it('applies correct variant styles', () => {
    const {getByText} = render(<Text variant="secondary">Test Text</Text>);
    const textElement = getByText('Test Text');

    expect(textElement.props.style).toContainEqual({
      color: palette.text_secondary,
      fontSize: 14,
      fontFamily: 'Poppins-Regular',
    });
  });

  it('applies correct size styles', () => {
    const {getByText} = render(<Text size="x_large">Test Text</Text>);
    const textElement = getByText('Test Text');

    expect(textElement.props.style).toContainEqual({
      color: palette.text_primary,
      fontSize: 18,
      fontFamily: 'Poppins-Regular',
    });
  });

  it('applies correct weight styles', () => {
    const {getByText} = render(<Text weight="SemiBold">Test Text</Text>);
    const textElement = getByText('Test Text');

    expect(textElement.props.style).toContainEqual({
      fontFamily: 'Poppins-SemiBold',
      fontSize: 14,
      color: palette.text_primary,
    });
  });
});
