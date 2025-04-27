const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devServer: {
    static: path.resolve(__dirname, 'public'),
    port: 3001,
    historyApiFallback: true,
  },
  output: {
    publicPath: 'auto',
    clean: true,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
   // music-library-remote/webpack.config.js
new ModuleFederationPlugin({
  name: 'musicLib', // Name for the remote app
  filename: 'remoteEntry.js',
  exposes: {
    './MusicLibrary': './src/MusicLibrary.jsx',  // The component exposed
  },
  shared: {
    react: { singleton: true, eager: true, requiredVersion: false },
    'react-dom': { singleton: true, eager: true, requiredVersion: false },
  }
  
}),

    
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
