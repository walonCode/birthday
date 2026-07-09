import type { MetadataRoute } from "next";
import { config } from "@/content/config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: config.siteUrl,
      changeFrequency: "yearly",
      priority: 1,
    },
  ];
}
