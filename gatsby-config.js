const path = require('path')

module.exports = {
  plugins: [
    '@chakra-ui/gatsby-plugin',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'markdown-pages',
        path: path.join(__dirname, '/src/tutorials')
      }
    },
    'gatsby-transformer-remark',
    'gatsby-plugin-loadable-components-ssr',
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp'
  ]
}
