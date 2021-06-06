module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          alias: {
            '@assets': './src/assets',
            '@components': './src/components',
            '@views': './src/views',
            '@src': './src',
            '@styles': './src/styles',
          },
          extensions: ['.js', '.jsx', '.json', '.tsx', '.ts', '.native.js'],
        },
      ],
    ],
  }
}
