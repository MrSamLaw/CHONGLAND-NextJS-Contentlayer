import Image from 'next/image';
import Link from 'next/link';
import { Post, allPosts } from '@/.contentlayer/generated';
import { formatDate } from '@/lib/utils';

export default function Home() {
	const posts = allPosts.sort((a, b) => {
		const dateA = new Date(a.date);
		const dateB = new Date(b.date);
		return dateB.getTime() - dateA.getTime();
	});

	return (
		<ul className='mt-4 flex flex-col gap-8'>
			{posts.map((post) => (
				<li key={post._id}>
					<PostCard post={post} />
				</li>
			))}
		</ul>
	);
}

function PostCard({ post }: { post: Post }) {
	return (
		<div className='prose max-w-none'>
			<h2 className='mb-2 tracking-[-0.075em] uppercase font-bold text-2xl'>
				<Link className=' hover:text-yellow-400 no-underline' href={post.slug}>
					{post.title}
				</Link>
			</h2>
			<div className='mb-1 text-sm'>
				{post.description && (
					<p className=' mt-0 text-slate-700 dark:text-slate-200'>
						{post.description}
					</p>
				)}
			</div>
			<div className='mb-6 text-sm text-slate-600'>
				<time className='order-first mb-4 ' dateTime={post.date}>
					{formatDate(post.date)}
				</time>
				<span>{` | `}</span>
				<span>
					<Link
						className='text-sm mt-2 uppercase text-yellow-400 font-semibold no-underline'
						href={`/categories/${encodeURIComponent(
							post.category.toLowerCase()
						)}`}
					>
						{post.category}
					</Link>
				</span>
				<span>{` | `}</span>
				<span>{post.readingTime.text}</span>
			</div>
		</div>
	);
}
