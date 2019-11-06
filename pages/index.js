import React from 'react';
import Head from 'next/head';
import { Button, Message } from 'rsuite';
require('rsuite/lib/styles/index.less');

// import Link from 'next/link'
// import Nav from '../components/nav'
// import 'rsuite/lib/styles/themes/default/index.less';
// import 'rsuite/lib/styles/index.less';

const Home = () => (
	<div>
		<Head>
			<title>Home change</title>
			<link rel="icon" href="/favicon.ico" />
		</Head>

		{/* <Nav /> */}
		<Message type="success" description="Success" />

		<div className="hero">
			<h1 className="title">Blocks</h1>
			<p className="description">
				Here is our exciting Game it is using <br />
				NextJS, React, and Mapbox, it is a PWA.
				<br />
				<br />
				<span>
					<a href="https://leerob.io/blog/using-mapbox-with-next-js">
						link to blog about how to work with mapbox
					</a>
					<br />
					<a href="https://git.linux.iastate.edu/fall2019-cs319-gitprojects/g40">Gitlab</a>
					<br />
					<a href="https://trello.com/b/ChA7nedI/g40">Trello</a>
					<br />
				</span>
			</p>
			<Button appearance="primary" href="/game">
				Play Game
			</Button>
		</div>
		<style jsx>{`
			:global(body) {
				margin: 0;
			}
			.hero {
				width: 100%;
				color: #333;
				padding: 50px;
			}
			.title {
				margin: 0;
				width: 100%;
				padding-top: 80px;
				line-height: 1.15;
				font-size: 48px;
			}
		`}</style>
	</div>
);

export default Home;
