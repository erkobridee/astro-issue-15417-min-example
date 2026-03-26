import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';

import { samplesLoader } from '~/content/loader/samples';

//----------------------------------------------------------------------------//

const schema = z.object({
  slug: z.string(),
  title: z.string(),
  heroImage: z.string().optional(),
  heroImageAltText: z.string().optional(),
  content: z.string()
});

export const collection = defineCollection({
  loader: samplesLoader(),
  schema
});
