module.exports = {
  preset: 'react-native',
  moduleNameMapper: {
    '\\.(ttf)$': '<rootDir>/__mocks__/file-mock.js',
    '^react-native-vector-icons/Ionicons$':
      '<rootDir>/src/__mocks__/react-native-vector-icons/Ionicons.tsx',
  },
};
