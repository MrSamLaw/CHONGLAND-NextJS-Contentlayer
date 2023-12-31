import { notFound } from "next/navigation";
import { allPosts } from "@/.contentlayer/generated";
import Link from "next/link";
import { Metadata } from "next";
import { Mdx } from "@/components/mdx-components";
import { formatDate } from "@/lib/utils";

interface PostProps {
	params: {
		slug: string[];
	};
}

async function getPostFromParams(params: PostProps["params"]) {
	const slug = params?.slug?.join("/");
	const post = allPosts.find((post) => post.slugAsParams === slug);

	if (!post) {
		null;
	}

	return post;
}

export async function generateMetadata({
	params,
}: PostProps): Promise<Metadata> {
	const post = await getPostFromParams(params);

	if (!post) {
		return {};
	}

	return {
		title: post.title,
		description: post.description,
	};
}

export async function generateStaticParams(): Promise<PostProps["params"][]> {
	return allPosts.map((post) => ({
		slug: post.slugAsParams.split("/"),
	}));
}

export default async function PostPage({ params }: PostProps) {
	const post = await getPostFromParams(params);

	if (!post) {
		notFound();
	}
	return (
		<main className="flex flex-col md:px-0">
			<article className="py-6 prose max-w-none dark:prose-invert">
				<h1 className="mb-2 tracking-[-0.075em] uppercase font-semibold text-5xl">
					{post.title}
				</h1>
				<header className="mb-4 text-sm text-slate-600">
					{post.description && (
						<p className="text-xl mt-0 text-slate-700 dark:text-slate-200">
							{post.description}
						</p>
					)}
					<time className="order-first " dateTime={post.date}>
						{formatDate(post.date)}
					</time>
					<span>{` • `}</span>
					<span>{post.readingTime.text}</span>

					<div className="text-sm mt-2 uppercase">
						<Link
							href={`/categories/${encodeURIComponent(
								post.category.toLowerCase()
							)}`}
						>
							{post.category}
						</Link>
					</div>
					<div className="text-sm mt-2">
						{post.tags.map((tag) => {
							return (
								<Link key={tag.title} href={`/tag/${tag.title}`}>
									<button className="bg-white hover:bg-gray-100 text-gray-800 font-medium py-0.25 px-1 border border-gray-400 rounded shadow mx-1">
										#{tag.title}
									</button>
								</Link>
							);
						})}
					</div>
				</header>
				<div className="prose-xl font-light leading-6">
					<Mdx code={post.body.code} />
				</div>
			</article>
		</main>
	);
}
[
	/* Old Implementation */
];
/*import { Post, allPosts } from "@/.contentlayer/generated";
import { MDXComponents } from "mdx/types";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { useMDXComponent } from "next-contentlayer/hooks";
import { notFound } from "next/navigation";

function getPost(slug: string): Post {
	const post = allPosts.find((p) => p.slug === slug);
	if (!post) notFound();
	return post;
}

export function generateStaticParams() {
	return allPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({
	params,
}: {
	params: { slug: string };
}): Metadata {
	const post = getPost(params.slug);
	return { title: post.title };
}

function formatDate(date: string) {
	let currentDate = new Date();
	if (!date.includes("T")) {
		date = `${date}T00:00:00`;
	}
	let targetDate = new Date(date);

	let yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
	let monthsAgo = currentDate.getMonth() - targetDate.getMonth();
	let daysAgo = currentDate.getDate() - targetDate.getDate();

	let formattedDate = "";

	if (yearsAgo > 0) {
		formattedDate = `${yearsAgo}y ago`;
	} else if (monthsAgo > 0) {
		formattedDate = `${monthsAgo}mo ago`;
	} else if (daysAgo > 0) {
		formattedDate = `${daysAgo}d ago`;
	} else {
		formattedDate = "Today";
	}

	let fullDate = targetDate.toLocaleString("en-au", {
		month: "long",
		day: "numeric",
		year: "numeric",
	});

	return `${fullDate} (${formattedDate})`;
}

const mdxComponents: MDXComponents = {};

export default function Post({ params }: { params: { slug: string } }) {
	const post = getPost(params.slug);
	const MDXContent = useMDXComponent(post.body.code);

	return (
		<main className="mx-auto max-w-2xl py-16">
			<article className="prose dark:prose-invert">
				{post.image && (
					<div className="relative mb-12 h-[345px] w-full">
						<Image
							className="m-0 w-full rounded-lg object-cover"
							src={post.image}
							alt={post.title}
							fill
							priority
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						/>
					</div>
				)}

				<header>
					<h1 className="mb-2">{post.title}</h1>
					{post.description && (
						<p className="mb-6 mt-0 text-xl text-center text-gray-700 dark:text-gray-200">
							{post.description}
						</p>
					)}
					<time
						className="order-first mb-4 text-sm text-slate-600"
						dateTime={post.date}
					>
						{formatDate(post.date)}
					</time>
					<span>{` • `}</span>
					<span>{post.readingTime.text}</span>
					<span>{` • `}</span>
					<span>
						<Link
							href={`/categories/${encodeURIComponent(
								post.category.toLowerCase()
							)}`}
						>
							{post.category}
						</Link>
					</span>
				</header>
				<div className="prose mt-16">
					<MDXContent components={mdxComponents} />
				</div>
			</article>
		</main>
	);
}
*/
