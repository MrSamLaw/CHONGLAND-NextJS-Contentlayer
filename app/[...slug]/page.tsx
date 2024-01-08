import { allPages } from '@/.contentlayer/generated';
import { Mdx } from '@/components/mdx-components';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface PageProps {
	params: {
		slug: string[];
	};
}

async function getPageFromParams(params: PageProps['params']) {
	const slug = params?.slug?.join('/');
	const page = allPages.find((page) => page.slugAsParams === slug);

	if (!page) {
		null;
	}

	return page;
}

export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	const page = await getPageFromParams(params);

	if (!page) {
		return {};
	}

	return {
		title: page.title,
		description: page.description,
	};
}

export async function generateStaticParams(): Promise<PageProps['params'][]> {
	return allPages.map((page) => ({
		slug: page.slugAsParams.split('/'),
	}));
}

export default async function PagePage({ params }: PageProps) {
	const page = await getPageFromParams(params);

	if (!page) {
		notFound();
	}

	return (
		<article className='prose max-w-none'>
			<h1 className='tracking-[-0.075em] uppercase font-semibold leading-9 mb-4 text-4xl md:text-5xl'>
				{page.title}
			</h1>
			{page.description && (
				<p className='mt-0 text-slate-700 dark:text-slate-200'>
					{page.description}
				</p>
			)}
			<hr className='my-8' />
			<div className='prose-lg lg:prose-xl font-light prose-headings:font-medium prose-headings:tracking-tighter'>
				<Mdx code={page.body.code} />
			</div>
		</article>
	);
}
