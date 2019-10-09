const withCSS = require("@zeit/next-css");

// apparently required because https://github.com/zeit/next-plugins/issues/392
// thanks to @marcusstenbeck - https://github.com/zeit/next-plugins/issues/392#issuecomment-475845330

function HACK_removeMinimizeOptionFromCssLoaders(config) {
  console.warn(
    'HACK: Removing `minimize` option from `css-loader` entries in Webpack config',
  );
  config.module.rules.forEach(rule => {
    if (Array.isArray(rule.use)) {
      rule.use.forEach(u => {
        if (u.loader === 'css-loader' && u.options) {
          delete u.options.minimize;
        }
      });
    }
  });
}

module.exports = withCSS({
  webpack(config) {
    HACK_removeMinimizeOptionFromCssLoaders(config);

    config.module.rules.push({
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
      use: {
        loader: 'url-loader'
      }
    });

    config.module.rules.push({
      test: /^index\.html$/,
      loader: 'string-replace-loader',
      options: {
        search: "\%SITE_NAME\%",
        replace: (JSON.parse(require("fs").readFileSync("generated/meta.json")).name)
      }
    });

    return config;
  },
});