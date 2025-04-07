import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import MovieListItem from '../components/MovieListItem';
import {renderTMDBImage} from '@app_utils/helperfuncs';

// Mock the dependencies
jest.mock('@app_utils/helperfuncs', () => ({
  renderTMDBImage: jest.fn(
    () => `https://image.tmdb.org/t/p/w500//hD2SN5bbqxk0kcRmsATJkXObgnZ.jpg`,
  ),
}));

jest.mock('react-native-linear-gradient', () => 'LinearGradient');
jest.mock('date-fns', () => ({
  format: jest.fn(() => 'Jan 1, 2023'),
}));

describe('MovieListItem', () => {
  const mockProps = {
    title: 'Test Movie',
    posterUrl: '/test-poster.jpg',
    onPress: jest.fn(),
    isFirstItem: false,
    releaseDate: '2023-01-01',
    voteAverage: 8.5,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with all props', () => {
    const {getByText} = render(<MovieListItem {...mockProps} />);

    expect(getByText('Test Movie')).toBeTruthy();
    expect(getByText('Jan 1, 2023')).toBeTruthy();
    expect(getByText('Rating 8.5')).toBeTruthy();
    expect(renderTMDBImage).toHaveBeenCalledWith('/test-poster.jpg', 500);
  });

  it('applies first item styling when isFirstItem is true', () => {
    const {getByTestId} = render(
      <MovieListItem {...mockProps} isFirstItem={true} testID="movie-item" />,
    );

    const movieItem = getByTestId('movie-item');
    // Check if the firstItem style is applied (marginTop: 30)
    expect(movieItem.props.style).toContainEqual(
      expect.objectContaining({marginTop: 30}),
    );
  });

  it('does not apply first item styling when isFirstItem is false', () => {
    const {getByTestId} = render(
      <MovieListItem {...mockProps} isFirstItem={false} testID="movie-item" />,
    );

    const movieItem = getByTestId('movie-item');
    // Check that the firstItem style is not applied
    expect(movieItem.props.style).not.toContainEqual(
      expect.objectContaining({marginTop: 30}),
    );
  });

  it('calls onPress when pressed', () => {
    const {getByTestId} = render(
      <MovieListItem {...mockProps} testID="movie-item" />,
    );

    fireEvent.press(getByTestId('movie-item'));
    expect(mockProps.onPress).toHaveBeenCalledTimes(1);
  });

  it('truncates long movie titles', () => {
    const longTitle =
      'This is an extremely long movie title that should be truncated when displayed in the UI';
    const {getByText} = render(
      <MovieListItem {...mockProps} title={longTitle} />,
    );

    const titleElement = getByText(longTitle);
    expect(titleElement.props.numberOfLines).toBe(2);
  });

  it('formats vote average to one decimal place', () => {
    const {getByText} = render(
      <MovieListItem {...mockProps} voteAverage={7.6789} />,
    );

    expect(getByText('Rating 7.7')).toBeTruthy();
  });
});
