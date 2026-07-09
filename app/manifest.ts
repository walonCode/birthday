import type { MetadataRoute } from "next";
import { config } from "@/content/config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: config.headline,
    short_name: `${config.name.split(" ")[1] ?? config.name} 🎂`,
    description: "A birthday surprise made with love",
    start_url: "/",
    display: "standalone",
    background_color: "#1d1023",
    theme_color: "#1d1023",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
