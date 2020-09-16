module.exports = (api) => {
  const babelEnv = api.env();
  const plugins = [];
  //appliquer juste sur env de production
  if (babelEnv !== 'development') {
    plugins.push(['transform-remove-console']);
  }
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins,
  };
};
