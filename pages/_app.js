import App from 'next/app';
import Head from 'next/head';
import React from 'react';

class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        return { pageProps };
    }

    render() {
        const { Component, pageProps } = this.props;
        const description = 'Creating a non-SSR map component inside a Next.js project.';
        const title = `Next.js + Mapbox Demo - ${description}`;

        return (
            <div>
                <Head>
                    <title>{title}</title>
                    <meta charSet="utf-8" />
                    <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
                    <meta content="width=device-width, initial-scale=1" name="viewport" />
                    <meta name="theme-color" content="#673ab7" />
                    <link rel="manifest" href="static/manifest.json" />
                    <link rel="icon" href="static/img/favicon.ico" />
                    <link href="https://api.mapbox.com/mapbox-gl-js/v0.51.0/mapbox-gl.css" rel="stylesheet" />
                    <meta content={description} name="description" />
                    <meta property="og:title" content={title} />
                    <meta property="og:image" content="/static/banner.jpg" />
                    <meta content="en_US" property="og:locale" />
                    <meta content={description} property="og:description" />
                    <meta content="https://next-mapbox-demo.now.sh" property="og:url" />
                </Head>
                <Component {...pageProps} />
            </div>
        );
    }
}

export default MyApp;
