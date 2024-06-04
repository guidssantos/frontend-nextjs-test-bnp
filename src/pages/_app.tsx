import type { AppProps } from 'next/app';
import Head from 'next/head';

import '@/styles/globals.css';
import { MessageProvider } from '@/contexts/MessageContext';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>Teste Front-End - BNP</title>
			</Head>

			<MessageProvider>
				<Component {...pageProps} />
			</MessageProvider>
		</>
	);
}

