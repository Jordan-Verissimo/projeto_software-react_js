module.exports = function override(config, env) {
  // Configurar polyfills para módulos Node.js
  config.resolve.fallback = {
    ...config.resolve.fallback,
    crypto: require.resolve('crypto-browserify'),
    buffer: require.resolve('buffer/'),
    util: require.resolve('util/'),
    stream: require.resolve('stream-browserify'),
    vm: require.resolve('vm-browserify'),
  };

  return config;
};
