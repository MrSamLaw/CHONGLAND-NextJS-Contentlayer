import Link from "next/link";
import { Post, allPosts } from "@/.contentlayer/generated";

export default function Posts() {
	const posts = allPosts.sort((a, b) => {
		const dateA = new Date(a.date);
		const dateB = new Date(b.date);
		return dateB.getTime() - dateA.getTime();
	});

	return (
		<main className="mx-auto max-w-2xl py-16 text-center">
			<h1 className="mt-16 flex flex-col gap-8">Posts</h1>
			<ul className="mt-16 flex flex-col gap-8">
				{posts.map((post) => (
					<li key={post.slug}>
						<PostCard post={post} />
					</li>
				))}
			</ul>
		</main>
	);
}

function PostCard({ post }: { post: Post }) {
	return (
		<div className="mb-6">
			<time dateTime={post.date} className="block text-sm text-slate-600">
				{new Date(post.date).toLocaleDateString()}
			</time>
			<h2 className="text-lg">
				<Link className="text-blue-700 hover:text-blue-900" href={post.url}>
					{post.title}
				</Link>
			</h2>
		</div>
	);
}
