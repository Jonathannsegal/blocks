import React from 'react';
import App from 'next/app';
import Head from 'next/head';

class MyApp extends App {
	render() {
		const { Component, pageProps } = this.props;
		const description = 'Blocks a map game built for SE319';
		const title = `Blocks`;

		return (
			<React.Fragment>
				<Head>
					<link href="https://fonts.googleapis.com/css?family=Lexend+Deca&display=swap" rel="stylesheet" key="google-font-lexenddeca" />
					<title>{title}</title>
					<meta charSet="utf-8" />
					<meta content="IE=edge" httpEquiv="X-UA-Compatible" />
					<meta content="width=device-width, initial-scale=1" name="viewport" />
					<meta name="theme-color" content="#6FC8B9" />
					<link rel="manifest" href="static/manifest.json" />
					<link rel="icon" href="static/img/favicon.ico" />
					<link rel="apple-touch-icon" href="static/img/android-chrome-144x144.png" />
					<link href="https://api.mapbox.com/mapbox-gl-js/v0.51.0/mapbox-gl.css" rel="stylesheet" />
					<meta content={description} name="description" />
					<meta property="og:title" content={title} />
					<meta property="og:image" content="/static/banner.jpg" />
					<meta content="en_US" property="og:locale" />
					<meta content={description} property="og:description" />
					<meta content="https://next-mapbox-demo.now.sh" property="og:url" />
				</Head>
				<Component {...pageProps} />
				<style global jsx>{`
					body {
						font-family: 'Lexend Deca', sans-serif;
					}
				`}</style>
			</React.Fragment>
		);
	}
}

export default MyApp;
