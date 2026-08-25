/// <reference types="astro/client" />

// Raw-string import of the committed Substack feed snapshot (Vite `?raw`).
// Used as the CI fallback in the article components — see src/lib/rss.ts.
declare module '*.xml?raw' {
  const content: string;
  export default content;
}
