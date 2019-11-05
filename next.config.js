const withOffline = require('next-offline')
const withLess = require('@zeit/next-less')

module.exports = withOffline(withLess({
    target: process.env.NEXT_TARGET || 'serverless',
    lessLoaderOptions: {
        javascriptEnabled: true
    },
    workboxOpts: {
        swDest: 'static/service-worker.js',
        runtimeCaching: [
            {
                urlPattern: /[.](png|jpg|ico|css)/,
                handler: 'CacheFirst',
                options: {
                    cacheName: 'assets-cache',
                    cacheableResponse: {
                        statuses: [0, 200]
                    }
                }
            },
            {
                urlPattern: /^https:\/\/code\.getmdl\.io.*/,
                handler: 'CacheFirst',
                options: {
                    cacheName: 'lib-cache'
                }
            },
            {
                urlPattern: /^http.*/,
                handler: 'NetworkFirst',
                options: {
                    cacheName: 'http-cache'
                }
            }
        ]
    }
}))
