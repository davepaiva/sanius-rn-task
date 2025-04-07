import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import SearchBar from '../components/Searchbar';

describe('SearchBar Component', () => {
  const mockOnSearch = jest.fn();
  const mockToggleResultMode = jest.fn();
  const defaultProps = {
    onSearch: mockOnSearch,
    searchQuery: '',
    toggleResultMode: mockToggleResultMode,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly with default props', () => {
    const {getByPlaceholderText} = render(<SearchBar {...defaultProps} />);

    expect(getByPlaceholderText('TV shows, movies and more')).toBeTruthy();
  });

  test('renders with custom placeholder', () => {
    const {getByPlaceholderText} = render(
      <SearchBar {...defaultProps} placeholder="Search movies" />,
    );

    expect(getByPlaceholderText('Search movies')).toBeTruthy();
  });

  test('calls onSearch when text input changes', () => {
    const {getByPlaceholderText} = render(<SearchBar {...defaultProps} />);
    const input = getByPlaceholderText('TV shows, movies and more');

    fireEvent.changeText(input, 'Avengers');

    expect(mockOnSearch).toHaveBeenCalledWith('Avengers');
  });

  test('displays clear icon when searchQuery is not empty', () => {
    const {queryByTestId, rerender} = render(
      <SearchBar {...defaultProps} searchQuery="" />,
    );

    // Add testID to the clear icon in the component first
    expect(queryByTestId('clear-icon')).toBeNull();

    rerender(<SearchBar {...defaultProps} searchQuery="Avengers" />);

    expect(queryByTestId('clear-icon')).toBeTruthy();
  });

  test('clears search query when clear icon is pressed', () => {
    const {getByTestId} = render(
      <SearchBar {...defaultProps} searchQuery="Avengers" />,
    );

    fireEvent.press(getByTestId('clear-icon'));

    expect(mockOnSearch).toHaveBeenCalledWith('');
  });

  test('calls toggleResultMode when search is submitted with non-empty query', () => {
    const {getByPlaceholderText} = render(
      <SearchBar {...defaultProps} searchQuery="Avengers" />,
    );

    fireEvent(
      getByPlaceholderText('TV shows, movies and more'),
      'submitEditing',
    );

    expect(mockToggleResultMode).toHaveBeenCalledWith(true);
  });

  test('does not call toggleResultMode when search is submitted with empty query', () => {
    const {getByPlaceholderText} = render(<SearchBar {...defaultProps} />);

    fireEvent(
      getByPlaceholderText('TV shows, movies and more'),
      'submitEditing',
    );

    expect(mockToggleResultMode).not.toHaveBeenCalled();
  });

  test('applies autoFocus when specified', () => {
    const {getByPlaceholderText} = render(
      <SearchBar {...defaultProps} autoFocus={true} />,
    );

    const input = getByPlaceholderText('TV shows, movies and more');
    expect(input.props.autoFocus).toBe(true);
  });
});
