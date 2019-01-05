const path = require('path'),
      CleanWebpackPlugin = require('clean-webpack-plugin'),
      HtmlWebpackPlugin = require('html-webpack-plugin')

const env = process.env.NODE_ENV      

const config = {
  // absolute path for project root, the default one is process.cwd()
  // context: path.resolve(__dirname, '..'),

  entry: {
    // relative path declaration
    app: './src/app/app.js'
  },

  output: {
    // One of the below
    // publicPath: '/notdist/',
    // publicPath: '/dist/',
    // publicPath: 'dist/',
    publicPath: env === 'development' ? '' : 'https://cdn.example.com/assets/',

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
            presets: ["@babel/preset-env"]
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
      {
        // 匹配.css文件
        test: /\.css$/,
        /*
        先使用css-loader处理, 返回的结果交给style-loader处理.
        css-loader将css内容存为js字符串, 并且会把background, @font-face等引用的图片,
        字体文件交给指定的loader打包, 类似上面的html-loader, 用什么loader同样在loaders对象中定义, 等会下面就会看到.
        */
        use: ['style-loader', 'css-loader']
      },
      // file-loader(for images)
      { 
        test: /\.(jpg|png|gif|svg)$/, 
        use: [ 
          { 
            loader: 'file-loader', 
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
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '../'),
    }),
    new HtmlWebpackPlugin({
      template: './assets/index.html',
      filename: './index.html'
    })
  ],
  devServer: {
    // static files served from here
    // publicPath: '/dist/',

    port: 2000,
    stats: 'errors-only',
    open: true,
    /*
    historyApiFallback用来配置页面的重定向

    SPA的入口是一个统一的html文件, 比如
    http://localhost:8010/foo
    我们要返回给它
    http://localhost:8010/index.html
    这个文件

    配置为true, 当访问的文件不存在时, 返回根目录下的index.html文件
    */
    historyApiFallback: true
  },
  devtool: 'inline-source-map'
}

module.exports = config
