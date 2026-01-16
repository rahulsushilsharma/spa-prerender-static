# spa-prerender-static

A lightweight TypeScript library for prerendering Single Page Applications (SPAs) with SEO optimization. Generate static HTML files for your SPA routes with proper meta tags and Open Graph data.

## Features

- 🚀 Prerender SPA routes to static HTML
- 🎯 SEO optimization with meta tags generation
- 📱 Open Graph and Twitter Card support
- 🗂️ Structured data (JSON-LD) support
- 📦 TypeScript support with full type definitions
- ⚡ Zero dependencies (besides Node.js built-ins)

## Installation

```bash
npm install spa-prerender-static
```

## Quick Start

```typescript
import { prerender, generateSEOTags } from "spa-prerender-static";

// Define your routes with SEO configuration
const routes = [
  {
    path: "/",
    tags: {
      title: "My App - Home",
      description: "Welcome to my amazing single page application",
      url: "https://myapp.com",
      keywords: "spa, javascript, webapp",
    },
  },
  {
    path: "/about",
    tags: {
      title: "About - My App",
      description: "Learn more about our company and team",
      url: "https://myapp.com/about",
      author: "My Company",
    },
  },
];

// Prerender your SPA
prerender({
  routes,
  template: "./template.html",
  dist: "./dist",
  render: (route) => {
    // Your SPA rendering logic here
    return `<div id="app">Content for ${route.path}</div>`;
  },
});
```

## API Reference

### `prerender(options)`

Main function to prerender your SPA routes.

**Parameters:**

- `options` (`PrerenderOptions`): Configuration object
  - `routes` (`RouteConfig[]`): Array of routes to prerender
  - `template` (`string`): Path to HTML template file
  - `dist` (`string`): Output directory for static files
  - `render` (`function`): Function that renders route content

**Example:**

```typescript
prerender({
  routes: [{ path: "/", tags: { title: "Home", description: "Welcome" } }],
  template: "./public/template.html",
  dist: "./build",
  render: (route) => `<div>App content for ${route.path}</div>`,
});
```

### `generateSEOTags(options)`

Generate SEO meta tags from configuration.

**Parameters:**

- `options` (`SEOTagOptions`): SEO configuration

**Returns:**

- `string`: HTML meta tags

**Example:**

```typescript
const tags = generateSEOTags({
  title: "My Page",
  description: "Page description",
  url: "https://example.com",
  image: "https://example.com/image.jpg",
  keywords: "example, page",
  canonical: "https://example.com/page",
  robots: "index, follow",
  schema: {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "My Page",
  },
});
```

## Types

### `SEOTagOptions`

```typescript
interface SEOTagOptions {
  title: string;
  description: string;
  author?: string;
  url?: string;
  image?: string;
  keywords?: string;
  canonical?: string;
  robots?: string;
  ampUrl?: string;
  schema?: Record<string, unknown>;
}
```

### `RouteConfig`

```typescript
interface RouteConfig {
  path: string;
  tags: string | SEOTagOptions;
}
```

### `PrerenderOptions`

```typescript
interface PrerenderOptions {
  routes: RouteConfig[];
  template: string;
  dist: string;
  render: (route: RouteConfig) => string;
}
```

## HTML Template

Create an HTML template with placeholders that will be replaced during prerendering:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    %TITLE% %LINKS%
  </head>
  <body>
    <div id="app">%APP%</div>
  </body>
</html>
```

Placeholders:

- `%TITLE%` - Page title
- `%APP%` - Rendered app content
- `%LINKS%` - SEO meta tags

## Usage Examples

### Basic SPA Prerendering

```typescript
import { prerender } from "spa-prerender-static";

const routes = [
  { path: "/", tags: { title: "Home", description: "Welcome home" } },
  {
    path: "/products",
    tags: { title: "Products", description: "Our products" },
  },
];

prerender({
  routes,
  template: "./template.html",
  dist: "./public",
  render: (route) => {
    // Simulate SPA routing
    const content = route.path === "/" ? "Home content" : "Products content";
    return `<div class="page">${content}</div>`;
  },
});
```

### Advanced SEO Configuration

```typescript
import { prerender, generateSEOTags } from "spa-prerender-static";

const routes = [
  {
    path: "/blog/my-first-post",
    tags: {
      title: "My First Post - My Blog",
      description: "This is my first blog post about web development",
      url: "https://myblog.com/blog/my-first-post",
      image: "https://myblog.com/images/post1.jpg",
      keywords: "blog, web development, tutorial",
      author: "John Doe",
      canonical: "https://myblog.com/blog/my-first-post",
      schema: {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: "My First Post",
        author: {
          "@type": "Person",
          name: "John Doe",
        },
        datePublished: "2024-01-01",
      },
    },
  },
];

prerender({
  routes,
  template: "./template.html",
  dist: "./dist",
  render: (route) => `<article>Blog post content here...</article>`,
});
```

### Custom SEO Tags

```typescript
import { generateSEOTags } from "spa-prerender-static";

// Generate custom SEO tags
const customTags = generateSEOTags({
  title: "Product Page",
  description: "Check out our amazing product",
  url: "https://example.com/product",
  image: "https://example.com/product-image.jpg",
  keywords: "product, ecommerce, shopping",
  robots: "index, follow",
  schema: {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Amazing Product",
    offers: {
      "@type": "Offer",
      price: "29.99",
      priceCurrency: "USD",
    },
  },
});

console.log(customTags);
```

## Integration with Build Tools

### Vite Integration

```typescript
// vite.config.ts
import { defineConfig } from "vite";
import { prerender } from "spa-prerender-static";

export default defineConfig({
  build: {
    rollupOptions: {
      plugins: [
        {
          name: "prerender",
          generateBundle() {
            prerender({
              routes: [
                { path: "/", tags: { title: "Home", description: "Welcome" } },
              ],
              template: "./dist/index.html",
              dist: "./dist",
              render: (route) => '<div id="app"></div>',
            });
          },
        },
      ],
    },
  },
});
```

### Next.js Custom Build

```typescript
// scripts/prerender.js
import { prerender } from "spa-prerender-static";

const routes = [
  { path: "/", tags: { title: "Home", description: "Welcome" } },
  { path: "/about", tags: { title: "About", description: "About us" } },
];

prerender({
  routes,
  template: "./out/index.html",
  dist: "./out",
  render: async (route) => {
    // Your Next.js page rendering logic
    return `<div>Static content for ${route.path}</div>`;
  },
});
```

## License

MIT © [Rahul Sharma](https://github.com/rahulsushilsharma/spa-prerender-static/blob/main/LICENSE)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
