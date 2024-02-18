// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";

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
      default: "20-6-4",
    },
    published: {
      type: "boolean",
      default: true,
    },
    protected: {
      type: "boolean",
      default: false,
    },
  },
  computedFields,
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Writing],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          theme: "github-dark",
          // onVisitLine(node) {
          //   // Prevent lines from collapsing in `display: grid` mode, and allow empty
          //   // lines to be copy/pasted
          //   if (node.children.length === 0) {
          //     node.children = [{ type: "text", value: " " }];
          //   }
          // },
          // onVisitHighlightedLine(node) {
          //   node.properties.className.push("line--highlighted");
          // },
          // onVisitHighlightedWord(node) {
          //   node.properties.className = ["word--highlighted"];
          // },
        },
      ],
    ],
  },
});
