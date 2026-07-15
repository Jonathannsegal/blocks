/** @type {import('next').NextConfig} */
module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.geojson$/,
      type: 'asset/source',
    })
    return config
  },
}
