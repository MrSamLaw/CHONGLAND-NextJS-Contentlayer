import { allPages } from "@/.contentlayer/generated";
import { Mdx } from "@/components/mdx-components";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface PageProps {
	params: {
		slug: string[];
	};
}

async function getPageFromParams(params: PageProps["params"]) {
	const slug = params?.slug?.join("/");
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

export async function generateStaticParams(): Promise<PageProps["params"][]> {
	return allPages.map((page) => ({
		slug: page.slugAsParams.split("/"),
	}));
}

export default async function PagePage({ params }: PageProps) {
	const page = await getPageFromParams(params);

	if (!page) {
		notFound();
	}

	return (
		<main className="flex flex-col md:px-0">
			<article className="py-6 prose max-w-none dark:prose-invert">
				<h1 className="mb-2 tracking-[-0.075em] uppercase font-semibold text-5xl">
					{page.title}
				</h1>
				{page.description && <p className="text-xl">{page.description}</p>}
				<hr />
				<Mdx code={page.body.code} />
			</article>
		</main>
	);
}
