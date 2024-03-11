// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import remarkSlug from "remark-slug";

/** @type { import('contentlayer/source-files').ComputedFields }*/
const computedFields = {
  slug: {
    type: "string",
    resolve: (doc) => `/${doc._raw.flattenedPath}`,
  },
  slugAsParams: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
  },
};

export const Writing = defineDocumentType(() => ({
  name: "Writing",
  filePathPattern: `writing/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: true,
    },
    date: {
      type: "string",
      default: "2022-6-4",
    },
    published: {
      type: "boolean",
      default: true,
    },
    protected: {
      type: "boolean",
      default: false,
    },
    protectedIntro: {
      type: "string",
    },
    protectedEnd: {
      type: "string",
    },
  },
  computedFields,
}));

export const Projects = defineDocumentType(() => ({
  name: "Projects",
  filePathPattern: `projects/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: true,
    },
    date: {
      type: "string",
      default: "2022-6-4",
    },
    published: {
      type: "boolean",
      default: true,
    },
    protected: {
      type: "boolean",
      default: false,
    },
    p2: {
      type: "string",
    },
  },
  computedFields,
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Writing, Projects],
  mdx: {
    remarkPlugins: [remarkSlug, remarkGfm],
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          theme: "github-dark",
        },
      ],
    ],
  },
});
