import { z } from "zod";
const jsonNodeSchema: z.ZodType<any> = z.lazy(() =>
  z.object({
    type: z.string().optional(),
    text: z.string().optional(),
    attrs: z.record(z.any()).optional(),
    marks: z.array(z.record(z.any())).optional(),
    content: z.array(jsonNodeSchema).optional()
  })
);

export const tiptapDocumentSchema = z.object({
  type: z.literal("doc"),
  content: z.array(jsonNodeSchema).optional().default([])
});

export const postInputSchema = z.object({
  title: z.string().trim().min(1, "Title is required."),
  slug: z
    .string()
    .trim()
    .min(1, "Slug is required.")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase and hyphenated."),
  excerpt: z
    .string()
    .trim()
    .max(320, "Excerpt is too long.")
    .nullable(),
  content: tiptapDocumentSchema,
  coverImage: z.string().trim().url().nullable(),
  category: z.null(),
  isPublished: z.boolean(),
  featured: z.boolean()
});
