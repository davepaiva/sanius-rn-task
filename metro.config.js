const { mergeConfig, getDefaultConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  resolver: {
    extraNodeModules: {
      '@screens': `${__dirname}/src/screens`,
      '@components': `${__dirname}/src/components`,
      '@custom_types': `${__dirname}/src/types`,
      '@navigators': `${__dirname}/src/navigators`,
      '@app_store': `${__dirname}/src/store`,
      '@app_utils': `${__dirname}/src/utils`,
      '@styles': `${__dirname}/src/styles`,
      '@api': `${__dirname}/src/api`,
      '@hooks': `${__dirname}/src/hooks`,
    },
  },
  watchFolders: [__dirname],
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
