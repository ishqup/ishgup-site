import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
    site: "https://ishqup.github.io/",
    integrations: [react(), tailwind(), sitemap(), mdx()],
    experimental: {
        assets: true
    }
});
