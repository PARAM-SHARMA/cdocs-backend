import { z } from "zod";


export const createDocumentSchema = z.object({
	title: z
		.string()
		.min(1)
		.max(200)
		.optional()
});


export const deleteDocumentSchema = z.object({
	id: z.string()
});


export type CreateDocumentInput =
	z.infer<typeof createDocumentSchema>;
