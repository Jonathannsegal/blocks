import React from 'react';
import Lottie from 'react-lottie';
import * as animationData from '../db/pinjump.json'
import {
	FlexboxGrid,
	Container,
	Header
} from 'rsuite';
import SignIn from '../components/Onboarding/SignIn';
import SignUp from '../components/Onboarding/SignUp';
require('rsuite/lib/styles/index.less');

// import Link from 'next/link'
// import Nav from '../components/nav'
// import 'rsuite/lib/styles/themes/default/index.less';
// import 'rsuite/lib/styles/index.less';

const defaultOptions = {
	loop: true,
	autoplay: true,
	animationData: animationData.default,
	rendererSettings: {
		preserveAspectRatio: 'xMidYMid slice'
	}
};

{/* <Nav /> */ }
{/* <p className="description">
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
		<span>    </span>
		<a href="https://trello.com/b/ChA7nedI/g40">Trello</a>
		<br />
	</span>
</p> */}

const Home = () => (
	<div>
		<Container>
			<Header>
				<FlexboxGrid justify="center">
					<FlexboxGrid.Item colspan={12}>
						<h1 className="title">Blocks</h1>
						<Lottie
							options={defaultOptions}
							isClickToPauseDisabled={true}
						/>
					</FlexboxGrid.Item>
				</FlexboxGrid>
			</Header>
			<SignIn />
			{/* <SignUp /> */}
			{/* <Footer>
				<FlexboxGrid align="bottom">
					<FlexboxGrid.Item colspan={6}>
						Footer
					</FlexboxGrid.Item>
				</FlexboxGrid>
			</Footer> */}
		</Container>
		<style jsx>{`
			:global(body) {
				margin: 0;
			}
			.title {
				text-align: center;
				color: #1c3748;
				padding-top: 40px;
				line-height: 1.15;
				font-size: 48px;
			}
		`}</style>
	</div >
);

export default Home;