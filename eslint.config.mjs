import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import next from "eslint-config-next";
import prettier from "eslint-config-prettier";

// Mirrors the previous .eslintrc.json: "extends": ["next/core-web-vitals", "next", "prettier"]
const eslintConfig = [
  ...nextCoreWebVitals,
  ...next,
  prettier,
  {
    rules: {
      "react/no-unescaped-entities": "off",
      // eslint-config-next now bundles the newer React Compiler-oriented
      // react-hooks rules, which didn't exist in the old config (13.3.1).
      // Fixing the codebase to satisfy them is a separate refactor, not part
      // of this Next.js version upgrade, so they're disabled here to
      // preserve the previous effective rule set.
      "react-hooks/immutability": "off",
      "react-hooks/purity": "off",
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/static-components": "off",
    },
  },
  {
    ignores: [".next/**", "out/**", "build/**", "next-env.d.ts"],
  },
];

export default eslintConfig;
