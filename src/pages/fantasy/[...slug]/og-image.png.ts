// https://arne.me/writing/static-og-images-in-astro/

import fs from "fs/promises";
import satori from "satori";
import sharp from "sharp";
import type { APIContext, APIRoute } from 'astro';
import { getCollection, getEntryBySlug } from "astro:content";
import OGTemplate from '../../../image-generator/image-template';

export async function getStaticPaths() {
    const posts = await getCollection("fantasy");

    return posts.map((post) => ({
        params: { slug: post.slug },
        props: post,
    }));
}


export const get: APIRoute = async function get({ params }: APIContext) {
    const OpenSans = await fs.readFile("./src/image-generator/fonts/OpenSans-Bold.ttf");
    const post = await getEntryBySlug("fantasy", params.slug as string);

    // defaults
    let person1 = "ishan";
    let person2 = undefined;
    let season = "2022";
    let week = "00";

    if (post && post.data && post.data.imagePerson1 && post.slug) {
        person1 = post.data.imagePerson1;
        person2 = post.data.imagePerson2;
        season = post.data.season;

        const slugWeek = post.slug.split("-")[2]
        if (slugWeek.length <= 1) {
            week = "0" + slugWeek;
        } else {
            week = slugWeek;
        }
        
    }

    const svg = await satori(
        OGTemplate(person1, person2, season, week),
        {
            width: 1200,
            height: 630,
            fonts: [
                {
                    name: "OpenSans",
                    data: OpenSans,
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