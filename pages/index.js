import React from 'react'
import Lottie from 'react-lottie'
import { withRedux } from '../src/lib/redux'
import { useSelector, useDispatch } from 'react-redux'
import * as pinjump from '../src/db/pinjump.json'
import * as worldspin from '../src/db/worldspin.json'
import * as shapes from '../src/db/shapes.json'
import * as error from '../src/db/error.json'
import * as success from '../src/db/success.json'
import {
	FlexboxGrid,
	Container,
	Header,
	Button,
	Message
} from 'rsuite';
import SwipeableViews from 'react-swipeable-views';
import ForgotPassword from '../src/components/onBoarding/ForgotPassword'
import SignIn from '../src/components/onBoarding/SignIn'
import SignUp from '../src/components/onBoarding/SignUp'
import {
	HomeState,
	RefreshTime,
	SignUpState,
	PasswordForgotFormState
} from '../src/constants'
require('rsuite/lib/styles/index.less');

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

const shapesOptions = {
	loop: true,
	autoplay: true,
	animationData: shapes.default,
	rendererSettings: {
		preserveAspectRatio: 'xMidYMid slice'
	}
};

const errorOptions = {
	loop: true,
	autoplay: true,
	animationData: error.default,
	rendererSettings: {
		preserveAspectRatio: 'xMidYMid slice'
	}
};

const successOptions = {
	loop: true,
	autoplay: true,
	animationData: success.default,
	rendererSettings: {
		preserveAspectRatio: 'xMidYMid slice'
	}
};

const useHome = () => {
	const homeState = useSelector(state => state.homeState)
	const dispatch = useDispatch()
	const signUpFormErrorMessage = useSelector(state => state.signUpFormError)
	const passwordForgotFormState = useSelector(state => state.passwordForgotFormState)
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
	const updateForgotPasswordEmail = (input) => (
		dispatch({
			type: 'UPDATE_FORGOTPASSWORD_EMAIL',
			payload: { txt: input }
		})
	)
	const passwordForgotStateUnsubmit = () =>
		dispatch({
			type: 'passwordForgotStateUnsubmit'
		})
	return { homeState, passwordForgotFormState, homeSignIn, homeSignUp, signUpFormErrorMessage, updateForgotPasswordEmail, passwordForgotStateUnsubmit }
}

const Home = () => {
	const { homeState, passwordForgotFormState, homeSignIn, homeSignUp, signUpFormErrorMessage, updateForgotPasswordEmail, passwordForgotStateUnsubmit } = useHome()
	const handleChangeIndex = index => {
		if (index === HomeState.signIn) {
			homeSignIn();
		} else if (index === HomeState.signUp) {
			homeSignUp();
		}
	}
	if (passwordForgotFormState === PasswordForgotFormState.sent) {
		updateForgotPasswordEmail("");
		setTimeout(() => {
			passwordForgotStateUnsubmit();
		}, RefreshTime.fiveSeconds);
	}
	if (passwordForgotFormState === PasswordForgotFormState.error) {
		updateForgotPasswordEmail("");
		setTimeout(() => {
			passwordForgotStateUnsubmit();
		}, RefreshTime.fiveSeconds);
	}
	return (
		< div >
			<Container>
				{
					signUpFormErrorMessage != "" ? (
						<div className="stickyHeader">
							< Message
								showIcon
								type="error"
								title="Error"
								description={signUpFormErrorMessage}
							/>
						</div>
					) : (
							null
						)
				}
				{
					passwordForgotFormState === PasswordForgotFormState.sent ? (
						<div className="stickyHeader">
							<Message
								showIcon
								type="success"
								title="Sent"
								description="Check your email for the reset link."
							/>
						</div>
					) : (
							null
						)
				}
				<Header>
					<FlexboxGrid justify="center">
						<FlexboxGrid.Item colspan={12}>
							<h1 className="title">Blocks</h1>
							<div className="animationBox">
								{(function () {
									switch (homeState) {
										case HomeState.forgotPassword:
											switch (passwordForgotFormState) {
												case PasswordForgotFormState.sent:
													return (
														<Lottie
															options={successOptions}
															isClickToPauseDisabled={true}
														/>
													);
												case PasswordForgotFormState.error:
													return (
														<Lottie
															options={errorOptions}
															isClickToPauseDisabled={true}
														/>
													);
												default:
													return (
														<Lottie
															options={shapesOptions}
															isClickToPauseDisabled={true}
														/>);
											};
										case HomeState.signIn:
											return <Lottie
												options={pinjumpOptions}
												isClickToPauseDisabled={true}
											/>;
										case HomeState.signUp:
											return <Lottie
												options={worldspinOptions}
												isClickToPauseDisabled={true}
											/>;
										default:
											return null;
									}
								})()}
							</div>
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
						case HomeState.forgotPassword:
							return (
								<ForgotPassword />
							);
						default:
							return (
								<SwipeableViews index={homeState} onSwitching={handleChangeIndex} resistance>
									<SignIn />
									<SignUp />
								</SwipeableViews>);
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
			.animationBox {
				height: 30vh;
			}
			.stickyHeader {
				z-index: 1;
				top: 0;
				position: fixed;
				width: 100vw;
			}
		`}</style>
		</div >
	)
};

export default withRedux(Home);