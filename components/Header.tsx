'use client';
import headerNavLinks from '@/lib/headerNavLinks';
import siteMetadata from '@/lib/siteMetadata';
import Link from 'next/link';
import MobileNav from './MobileNav';
import { motion, LayoutGroup } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { Suspense } from 'react';
import Logo from '@/lib/CLLogo.svg';

const Header = () => {
	return (
		<header className='flex items-center justify-between py-10'>
			<LayoutGroup>
				<div>
					<Link href='/' aria-label={siteMetadata.headerTitle}>
						<div className='flex'>
							<div className='mr-3 text-yellow-400'>
								<svg
									width='25'
									height='41.29'
									role='img'
									aria-label='CHONGLAND Drip Logo'
								>
									<use href='/sprite.svg#cldrip' />
								</svg>
							</div>
							{typeof siteMetadata.headerTitle === 'string' ? (
								<div className='text-[40px] text-yellow-400 font-bold sm:block'>
									{siteMetadata.headerTitle}
								</div>
							) : (
								siteMetadata.headerTitle
							)}
						</div>
					</Link>
					<div className='text-sm mt-2'>
						<div className='italic'>{siteMetadata.description}</div>
						<div>
							<Link
								className='text-yellow-400 font-medium uppercase'
								href={siteMetadata.descriptionLink}
							>
								{siteMetadata.descriptionLinkText}
							</Link>
						</div>
					</div>
				</div>

				<div className='flex items-center space-x-4 leading-5 sm:space-x-6 mr-2'>
					<Suspense fallback={null}>
						{headerNavLinks.map((link) => {
							return (
								<NavItem key={link.title} path={link.href} name={link.title} />
							);
						})}
					</Suspense>
				</div>
			</LayoutGroup>
			<MobileNav />
		</header>
	);
};

function NavItem({ path, name }: { path: string; name: string }) {
	let pathname = usePathname() || '/';
	if (pathname.includes('/posts')) {
		pathname = '/posts';
	}
	let isActive = path === pathname;

	return (
		<Link
			key={path}
			href={path}
			className='transition-all align-middle text-[15px] tracking-[2px] uppercase font-semibold pb-2 sm:block hidden'
		>
			<span className='relative py-1 px-2'>
				{name}
				{path === pathname ? (
					<motion.div
						className='absolute h-[5px] top-7 mx-2 inset-0 bg-yellow-400 z-[-1]'
						layoutId='sidebar'
						transition={{
							type: 'spring',
							stiffness: 350,
							damping: 30,
						}}
					/>
				) : null}
			</span>
		</Link>
	);
}

export default Header;
