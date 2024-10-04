const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

const {
  resolver: { sourceExts, assetExts },
} = getDefaultConfig(__dirname);

const config = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: assetExts.filter(ext => ext !== 'svg' && ext !== 'ttf'), // Filter out 'ttf' to handle font files
    sourceExts: [...sourceExts, 'svg', 'ttf'], // Add 'ttf' to support custom fonts
  },
};

module.exports = mergeConfig(defaultConfig, config);
