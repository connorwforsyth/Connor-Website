import { defineDocumentType, makeSource } from "contentlayer/source-files";

// export const Page = defineDocumentType(() => ({
//   name: "page",
//   filePathPattern: `**/*.mdx`,
//   contentType: "mdx",
//   fields: {
//     title: {
//       type: "string",
//       required: true,
//     },
//     description: {
//       type: "string",
//     },
//   },
// }));

// export const Writing = defineDocumentType(() => ({
//   name: "writing",
//   filePathPattern: `**/writing/*.mdx`,
//   contentType: "mdx",
//   fields: {
//     title: {
//       type: "string",
//       required: true,
//     },
//     description: {
//       type: "string",
//     },
//     date: {
//       type: "date",
//       required: true,
//     },
//   },
//   computedFields: {
//     url: {
//       type: "string",
//       resolve: (writing) => `content/writing/${writing._raw.flattenedPath}`,
//     },
//   },
// }));

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.mdx`,
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    date: { type: "string", required: true },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (post) => `/posts/${post._raw.flattenedPath}`,
    },
  },
}));

export default makeSource({
  documentTypes: [Post],
  contentDirPath: "posts",
  // contentDirExclude: ["internal-docs"],
});
