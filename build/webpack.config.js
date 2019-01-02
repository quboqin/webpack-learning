const path = require('path'),
      webpack = require('webpack'),
      CleanWebpackPlugin = require('clean-webpack-plugin'),
      HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
  mode: 'development',
  // absolute path for project root
  context: path.resolve(__dirname, '..'),

  entry: {
    // relative path declaration
    app: './src/app/app.js'
  },

  output: {
    // absolute path declaration
    // publicPath: '/dist/',
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].bundle.js'
  },

  module: {
    rules: [
      // babel-loader with 'env' preset
      { 
        test: /\.js$/, 
        include: /src/, 
        exclude: /node_modules/, 
        use: { 
          loader: "babel-loader", 
          options: { 
            presets: ['env'] 
          }
        } 
      },
      // html-loader
      { 
        test: /\.html$/, 
        use: ['html-loader'] 
      },
      // sass-loader with sourceMap activated
      {
        test: /\.scss$/,
        include: [path.resolve(__dirname, '../assets', 'scss')],
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      // file-loader(for images)
      { 
        test: /\.(jpg|png|gif|svg)$/, 
        use: [ 
          { loader: 'file-loader', 
            options: { 
              name: '[name].[ext]', 
              outputPath: './assets/media/' 
            } 
          } 
        ] 
      },
      // file-loader(for fonts)
      { 
        test: /\.(woff|woff2|eot|ttf|otf)$/, 
        use: ['file-loader'] 
      }
    ]
  },
  plugins: [
    // cleaning up only 'dist' folder
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: './assets/index.html',
      filename: './index.html'
    })
  ],
  devServer: {
    // static files served from here
    // publicPath: '/dist/',
    contentBase: path.resolve(__dirname, "./dist/assets/media"),
    compress: true,
    // open app in localhost:2000
    port: 2000,
    stats: 'errors-only',
    open: true
  },
  devtool: 'inline-source-map'
}

module.exports = config
