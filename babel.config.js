module.exports = {
  presets: ['@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@screens': './src/screens',
          '@components': './src/components',
          '@custom_types': './src/types',
          '@navigators': './src/navigators',
          '@app_store': './src/store',
          '@app_utils': './src/utils',
          '@styles': './src/styles',
          '@api': './src/api',
          '@hooks': './src/hooks',
        },
      },
    ],
  ],
};
