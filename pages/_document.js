import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import GlobalStyle from '../src/components/GlobalStyle';

export default class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const sheet = new ServerStyleSheet();
		const originalRenderPage = ctx.renderPage;
		try {
			ctx.renderPage = () => originalRenderPage({
				enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
			});
			const initialProps = await Document.getInitialProps(ctx);
			return {
				...initialProps,
				styles: <>{initialProps.styles}{sheet.getStyleElement()}</>,
			};
		} finally {
			sheet.seal();
		}
	}

	render() {
		return (
			<html lang="en">
				<Head />
				<body>
					<noscript>
						<a href="http://devhumor.com/tags/javascript">You dont have javascript enabled, Big Sad</a>
					</noscript>
					<GlobalStyle />
					<Main />
					<NextScript />
				</body>
			</html>
		);
	}
}
