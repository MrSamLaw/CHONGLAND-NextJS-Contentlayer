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
									viewBox='0 0 461.08 761.6'
									width='25'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										fill='CurrentColor'
										d='M445.27,300.36l15.81-15.81V65.87c0-36.38-29.49-65.87-65.87-65.87H65.87C29.49,0,0,29.49,0,65.87v329.34c0,36.38,29.49,65.87,65.87,65.87h218.68l18.44-18.44v270.22h.02c.35,26.98,22.32,48.74,49.38,48.74s49.03-21.76,49.38-48.74h.02v-369.03l17.13-17.13v263.64c0,7.27,5.9,13.17,13.17,13.17s13.17-5.9,13.17-13.17v-289.98Z'
									/>
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
