import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';

import { samplesLoader } from '~/content/loader/samples';

//----------------------------------------------------------------------------//

export const collection = defineCollection({
  loader: samplesLoader(),
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    heroImage: z.string().optional(),
    heroImageAltText: z.string().optional(),
    content: z.string()
  })
});
