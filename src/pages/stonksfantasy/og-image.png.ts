// https://arne.me/writing/static-og-images-in-astro/

import fs from "fs/promises";
import satori from "satori";
import sharp from "sharp";
import type { APIRoute } from 'astro';
import { getCollection, getEntryBySlug } from "astro:content";
import OGTemplate from '../../image-generator/image-template';

export async function getStaticPaths() {
    const posts = await getCollection("stonksFantasyBlog");
    return posts.map((post) => ({
        params: { slug: post.slug },
        props: post,
    }));
}

export const get: APIRoute = async function get({ params, request }) {
    const interFont = await fs.readFile("./src/image-generator/fonts/Inter.ttf");
    const image = (await fs.readFile("./src/image-generator/_cover.jpg")).toString("base64");

    // const path = await fs.realpath("./src/image-generator/_cover.jpg");
    const imageD = "data:image/jpg;base64,".concat(image)

    const svg = await satori(
        OGTemplate(imageD),
        {
            width: 1200,
            height: 630,
            fonts: [
                {
                    name: "Inter",
                    data: interFont,
                    weight: 500,
                    style: "normal",
                },
            ]
        },
    )

    const png = await sharp(Buffer.from(svg)).png().toBuffer();

    return new Response(png, {
        headers: {
            "Content-Type": "image/png",
        },
    });
}