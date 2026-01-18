import fs from "fs";
import path from "path";
import { generateSEOTags } from "./seo";
import type { PrerenderOptions } from "./types";

export function prerender({
  routes,
  template,
  dist,
  render,
  headTags,
}: PrerenderOptions) {
  const templateHtml = fs.readFileSync(template, "utf-8");

  for (const route of routes) {
    const appHtml = render(route);

    const seo =
      typeof route.tags === "string" ? route.tags : generateSEOTags(route.tags);

    const finalHtml = templateHtml
      .replace(
        "%TITLE%",
        typeof route.tags === "string" ? "Untitled" : route.tags.title
      )
      .replace("%APP%", appHtml)
      .replace("%LINKS%", `${headTags}\n${seo}`);

    const filePath =
      route.path === "/" ? "index.html" : `${route.path}/index.html`;

    const fullPath = path.join(dist, filePath);
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    fs.writeFileSync(fullPath, finalHtml);
  }
}
