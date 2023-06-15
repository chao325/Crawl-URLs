/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
  dev: {
    '/site-site_api.html': {
      target: 'https://lubida.ikafan.com',
      changeOrigin: true,
      // pathRewrite: { '^': '' },
      pathRewrite: { '^': '' },
    },
    '/baidurank': {
      target: 'https://apistore.aizhan.com/', //
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  test: {
    '/getAddr/': {
      // target: 'https://preview.pro.ant.design',
      target: 'http://192.168.8.102:8080',

      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  pre: {
    '/getAddr/': {
      // target: 'your pre url',
      target: 'http://192.168.8.102:8080',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
};
