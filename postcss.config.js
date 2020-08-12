const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const devMode = process.env.NODE_ENV === 'development';

module.exports = {
  plugins: [
    autoprefixer({ browsers: [ 'Android >= 2.1', 'iOS >= 6' ] }),
    !devMode && cssnano(),
  ].filter(item => item),
};
