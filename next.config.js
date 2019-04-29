const withCSS = require('@zeit/next-css')
const withSass = require('@zeit/next-sass')
module.exports = withCSS(withSass({
   webpack: (config) => {
      // config.module.rules.push(
      //    {
      //      test: /\.scss$/,
      //    //   loader: 'babel-loader!raw-loader!sass-loader'
      //    loader: 'sass-loader'
      //    }
      //  )
      return config
   }
}))