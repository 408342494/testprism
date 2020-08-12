const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HappyPack = require('happypack');
const os = require('os');
const fs = require('file-system');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

const mode = process.env.NODE_ENV;
// fs.mkdirSync(path.join(__dirname, 'output/views'));
const outputPath = path.join(process.cwd(), 'output/views'); // 输出目录


const loaders = [
  'html-loader',
  'css-loader',
  'postcss-loader',
  'less-loader',
  'url-loader',
  'image-webpack-loader',
  'vue-loader',
  'file-loader',
];

console.log('mode:', mode);
const webpackConfig = {
  mode,
  devtool: process.env.NODE_ENV === 'development' ?  'source-map' : 'none',
  performance: {
    hints: 'warning',
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  devServer: {
    disableHostCheck: true,
    port: 9000,
    inline: true,
    hot: true,
    host: '0.0.0.0',
    headers: {
      'Cache-Control': 'max-age=0',
    },
    historyApiFallback: true
  },
  entry: path.resolve(__dirname, './src/main.js'),
  output: {
    path: outputPath,
    filename: process.env.NODE_ENV === 'production' ? 'static/js/[name].[chunkhash:8].js' : 'static/js/[name].js',
    crossOriginLoading: 'anonymous',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'css', 'scss', '.vue'],
    alias: {
      lib: path.join(__dirname, 'lib'),
      components: path.join(__dirname, 'src/components'),
      '@': path.join(__dirname, 'src'),
    },
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      minChunks: 1,
      automaticNameDelimiter: '~',
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.ext$/,
        use: ['cache-loader', ...loaders],
        include: path.resolve('src'),
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: path.resolve('src'),
        use: 'happypack/loader?id=js',
      },
      {
        test: /\.(html)$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              interpolate: 'require', // supported html `${}` sytax
              attrs: [':src'],
            },
          },
        ].filter((item) => item),
      },
      {
        test: /\.(css|less)$/,
        use: [
          !process.env.NODE_ENV ? MiniCssExtractPlugin.loader : (process.env.NODE_ENV === 'development'? { loader: 'style-loader' } : {loader: MiniCssExtractPlugin.loader, options: {publicPath: '../../'}}),
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(png|svg|jpe?g|bmp|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024 * 2,
              fallback: 'file-loader',
              name: 'static/images/[name].[hash:8].[ext]',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                enabled: false,
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: '90-100',
                speed: 4,
              },
            },
          },
        ],
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/,
        loader: 'file-loader',
        options: {
          name: 'static/images/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
    ],
  },
  plugins: [
    process.env.NODE_ENV === 'development' && new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
    new webpack.HashedModuleIdsPlugin(),
    new HappyPack({
      id: 'js',
      threadPool: happyThreadPool,
      loaders: [
        {
          loader: 'babel-loader'
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: path.join(process.cwd(), 'src/index.html'),
    }),
    new VueLoaderPlugin(),
    new webpack.EnvironmentPlugin({
      NODE_ENV: mode,
      DEBUG: true,
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css/[id].[contenthash:8].css',
    }),
    new webpack.ProgressPlugin(),
  ].filter((item) => item),
};
module.exports = webpackConfig;
