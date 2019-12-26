module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
          '.png',
        ],
        alias: {
          _assets: './src/assets',
          _components: './src/components',
          _navigations: './src/navigations',
          _scenes: './src/scenes',
          _hooks: './src/hooks',
          _styles: './src/styles',
          _utils: './src/utils',
          _config: './src/config',
        },
      },
    ],
  ],
};
