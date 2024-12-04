export const baseUrl = "http://localhost:3000/api/v1";

export const getUrlFromSlugEndpoint = (slug: string) =>
  `${baseUrl}/short-url/${slug}`;
