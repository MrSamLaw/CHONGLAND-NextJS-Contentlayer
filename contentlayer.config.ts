import {
	defineDocumentType,
	makeSource,
	defineNestedType,
} from "contentlayer/source-files";
import readingTime from "reading-time";

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields = {
	slug: {
		type: "string",
		resolve: (doc) => `/${doc._raw.flattenedPath}`,
	},
	slugAsParams: {
		type: "string",
		resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
	},
	readingTime: {
		type: "json",
		resolve: (doc) => readingTime(doc.body.raw),
	},
};

const Tag = defineNestedType(() => ({
	name: "Tag",
	fields: {
		title: { type: "string" },
	},
}));

export const Page = defineDocumentType(() => ({
	name: "Page",
	filePathPattern: `pages/**/*.mdx`,
	contentType: "mdx",
	fields: {
		title: {
			type: "string",
			required: true,
		},
		description: {
			type: "string",
		},
	},
	computedFields,
}));

export const Post = defineDocumentType(() => ({
	name: "Post",
	filePathPattern: `posts/**/*.mdx`,
	contentType: "mdx",
	fields: {
		title: {
			type: "string",
			required: true,
		},
		description: {
			type: "string",
		},
		date: {
			type: "date",
			required: true,
		},
		category: {
			type: "string",
			required: true,
		},
		tags: {
			type: "list",
			of: Tag,
			required: true,
		},
	},
	computedFields,
}));

export default makeSource({
	contentDirPath: "./content",
	documentTypes: [Post, Page],
});
