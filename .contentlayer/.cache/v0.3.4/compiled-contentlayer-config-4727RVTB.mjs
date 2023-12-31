// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";
var Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "The title of the post",
      required: true
    },
    description: {
      type: "string"
    },
    date: {
      type: "date",
      description: "Date post was published",
      required: true
    },
    category: {
      type: "string",
      required: true
    },
    tag: {
      type: "string"
    }
  },
  computedFields: {
    slug: { type: "string", resolve: (post) => post._raw.flattenedPath },
    url: {
      type: "string",
      resolve: (post) => `/posts/${post._raw.flattenedPath}`
    }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "./content",
  documentTypes: [Post]
});
export {
  Post,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-4727RVTB.mjs.map
