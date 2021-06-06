module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            $assets: './src/assets/*',
            $components: './src/components/*',
            $src: './src/*',
            $styles: './src/styles/theme',
          },
          extensions: ['.js', '.jsx', '.json', '.tsx', '.ts', '.native.js'],
        },
      ],
    ],
  }
}
