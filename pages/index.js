import React from 'react';
import Lottie from 'react-lottie';
import { withRedux } from '../lib/redux'
import { useSelector, useDispatch } from 'react-redux'
import Counter from '../components/counter'
import * as pinjump from '../db/pinjump.json'
import * as worldspin from '../db/worldspin.json'
import {
	FlexboxGrid,
	Container,
	Header,
	Footer,
	Button
} from 'rsuite';
import SignIn from '../components/Onboarding/SignIn';
import SignUp from '../components/Onboarding/SignUp';
import HomeState from '../constants/homeState';
import SignUpState from '../constants/signUpState';
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

const useHome = () => {
	const homeState = useSelector(state => state.homeState)
	const dispatch = useDispatch()
	const homeSignIn = () =>
		dispatch({
			type: 'homeSignIn',
			signUp: SignUpState.none
		})
	const homeSignUp = () =>
		dispatch({
			type: 'homeSignUp',
			signUp: SignUpState.userName
		})
	return { homeState, homeSignIn, homeSignUp }
}

const Home = () => {
	const { homeState, homeSignIn, homeSignUp } = useHome()
	return (
		< div >
			<Container>
				<Header>
					<FlexboxGrid justify="center">
						<FlexboxGrid.Item colspan={12}>
							<h1 className="title">Blocks</h1>
							<Lottie
								options={pinjumpOptions}
								isClickToPauseDisabled={true}
							/>
							{/* <Lottie
							options={worldspinOptions}
							isClickToPauseDisabled={true}
						/> */}
						</FlexboxGrid.Item>
					</FlexboxGrid>
				</Header>
				<FlexboxGrid justify="center">
					<FlexboxGrid.Item colspan={12}>
						{(function () {
							switch (homeState) {
								case HomeState.signIn:
									return <Button block appearance="primary" onClick={homeSignUp}>Sign Up</Button>;
								case HomeState.signUp:
									return <Button block appearance="primary" onClick={homeSignIn}>Sign In</Button>;
								default:
									return null;
							}
						})()}
					</FlexboxGrid.Item>
				</FlexboxGrid>
				<br />
				{(function () {
					switch (homeState) {
						case HomeState.signIn:
							return <SignIn />;
						case HomeState.signUp:
							return <SignUp />;
						default:
							return null;
					}
				})()}
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
	)
};

export default withRedux(Home);