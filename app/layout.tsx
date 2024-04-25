import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { Analytics } from '@vercel/analytics/react';

import './globals.css';
import SectionContainer from '@/components/SectionContainer';
import Header from '@/components/Header';
import siteMetadata from '@/lib/siteMetadata';
import { PreloadResources } from './preload';

export const metadata: Metadata = {
	title: {
		default: siteMetadata.title,
		template: `%s | ${siteMetadata.title}`,
	},
	description: siteMetadata.description,
	openGraph: {
		title: siteMetadata.title,
		description: siteMetadata.description,
		url: './',
		siteName: siteMetadata.title,
		locale: 'en_AU',
		type: 'website',
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang='en'
			className={`${GeistSans.variable} text-black bg-white dark:text-white dark:bg-[#111010]`}
		>
			<body>
				<SectionContainer>
					<Header />
					<main className='mx-auto'>
						{children}
						<PreloadResources />
					</main>
				</SectionContainer>
				<Analytics />
			</body>
		</html>
	);
}
