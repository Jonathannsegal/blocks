import React from 'react';
import Lottie from 'react-lottie';
import { useDispatch } from 'react-redux'
import { withRedux } from '../lib/redux'
import useInterval from '../lib/useInterval'
import Clock from '../components/clock'
import Counter from '../components/counter'
import * as pinjump from '../db/pinjump.json'
import * as worldspin from '../db/worldspin.json'
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

const pinjumpOptions = {
	loop: true,
	autoplay: true,
	animationData: pinjump.default,
	rendererSettings: {
		preserveAspectRatio: 'xMidYMid slice'
	}
};

const worldspinOptions = {
	loop: true,
	autoplay: true,
	animationData: worldspin.default,
	rendererSettings: {
		preserveAspectRatio: 'xMidYMid slice'
	}
};

const IndexPage = () => {
	// Tick the time every second
	const dispatch = useDispatch()
	// useInterval(() => {
	// 	dispatch({
	// 		type: 'TICK',
	// 		light: true,
	// 		lastUpdate: Date.now()
	// 	})
	// }, 1000)
	return (
		<>
			{/* <Clock /> */}
			<Counter />
		</>
	)
}

const Home = () => (
	<div>
		<Container>
			<Header>
				<FlexboxGrid justify="center">
					<FlexboxGrid.Item colspan={12}>
						<h1 className="title">Blocks</h1>
						{/* <Lottie
							options={pinjumpOptions}
							isClickToPauseDisabled={true}
						/> */}
						<Lottie
							options={worldspinOptions}
							isClickToPauseDisabled={true}
						/>
					</FlexboxGrid.Item>
				</FlexboxGrid>
			</Header>
			{/* <SignIn /> */}

			<IndexPage />
			<SignUp />

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

IndexPage.getInitialProps = ({ reduxStore }) => {
	// Tick the time once, so we'll have a
	// valid time before first render
	const { dispatch } = reduxStore
	dispatch({
		type: 'TICK',
		light: typeof window === 'object',
		lastUpdate: Date.now()
	})

	return {}
}

export default withRedux(Home);