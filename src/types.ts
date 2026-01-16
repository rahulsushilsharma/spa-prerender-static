export interface SEOTagOptions {
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

export interface RouteConfig {
  path: string;
  tags: string | SEOTagOptions;
}

export interface PrerenderOptions {
  routes: RouteConfig[];
  template: string;
  dist: string;
  render: (route: RouteConfig) => string;
  headTags: string;
}
