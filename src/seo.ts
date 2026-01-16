import type { SEOTagOptions } from "./types";

export function generateSEOTags(options: SEOTagOptions): string {
  const {
    title,
    description,
    author = "Unknown",
    url = "",
    image = "",
    keywords = "",
    canonical,
    robots = "index, follow",
    ampUrl,
    schema,
  } = options;

  const escape = (s: string) =>
    s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  let tags = `
<title>${escape(title)}</title>
<meta name="description" content="${escape(description)}">
<meta name="author" content="${escape(author)}">
<meta name="keywords" content="${escape(keywords)}">
<meta name="robots" content="${robots}">
${canonical ? `<link rel="canonical" href="${escape(canonical)}">` : ""}
${ampUrl ? `<link rel="amphtml" href="${escape(ampUrl)}">` : ""}

<meta property="og:title" content="${escape(title)}">
<meta property="og:description" content="${escape(description)}">
<meta property="og:type" content="website">
${url ? `<meta property="og:url" content="${escape(url)}">` : ""}
${image ? `<meta property="og:image" content="${escape(image)}">` : ""}

<meta name="twitter:card" content="${image ? 'summary_large_image' : 'summary'}">
<meta name="twitter:title" content="${escape(title)}">
<meta name="twitter:description" content="${escape(description)}">
${image ? `<meta name="twitter:image" content="${escape(image)}">` : ""}
`.trim();

  if (schema) {
    tags += `
<script type="application/ld+json">
${JSON.stringify(schema, null, 2)}
</script>`;
  }

  return tags;
}
