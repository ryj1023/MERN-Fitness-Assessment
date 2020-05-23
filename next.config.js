const withCSS = require('@zeit/next-css')
const withSass = require('@zeit/next-sass')
const withOffline = require('next-offline')
module.exports = withCSS(withSass(withOffline({ generateInDevMode: true })))
// module.exports = withCSS(
//     withSass(
//         withOffline({
//             generateInDevMode: true,
//             webpack: (config, options) => {
//                 // console.log('plugins', config.plugins)
//                 // config.plugins.push('styled-jsx/babel')
//                 //  console.log('config.plugins', config.plugins)
//                 //  config.module.rules.push({
//                 //      use: [
//                 //          options.defaultLoaders.babel,
//                 //          {
//                 //              loader: '@babel/plugin-proposal-optional-chaining',
//                 //              //  options: pluginOptions.options,
//                 //          },
//                 //      ],
//                 //  })
//                 //  config.plugins.push('@babel/plugin-proposal-optional-chaining')
//                 return config
//             },
//         })
//     )
// )
