import { defineCollection, reference, z } from 'astro:content';

const fantasy = defineCollection({
    type: 'content',
    // Type-check frontmatter using a schema
    schema: z.object({
        title: z.string().max(45),
        description: z.string().max(80),
        // Transform string to Date object
        pubDate: z
            .string()
            .or(z.date())
            .transform((val) => new Date(val)),
        updatedDate: z
            .string()
            .optional()
            .transform((str) => (str ? new Date(str) : undefined)),
        imagePerson1: z.enum(["ishan", "mike", "prad", "joey", "sam", "neil", "ian", "savan", "brian"]),
        imagePerson2: z.enum(["ishan", "mike", "prad", "joey", "sam", "neil", "ian", "savan", "brian"]).optional(),
        prData: z.array(z.object({
            Team: z.string(),
            W: z.number(),
            L: z.number(),
            Rating: z.number(),
            Rank: z.number(),
            PF: z.number(),
            PA: z.number(),
        })),
    }),
});

export const collections = {
    'fantasy': fantasy,
};
