import type { CollectionEntry } from 'astro:content';

import { getCollection } from 'astro:content';

//----------------------------------------------------------------------------//

export type TCollectionEntry = CollectionEntry<'samples'>;

export const getEntries = async (): Promise<TCollectionEntry[]> =>
  await getCollection('samples');
