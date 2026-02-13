import type { Loader, LoaderContext } from 'astro/loaders';

import { samples } from '~/content/mock/samples';

//----------------------------------------------------------------------------//

export const samplesLoader = (): Loader => {
  const loadData = async ({
    store,
    generateDigest,
    parseData,
    renderMarkdown
  }: LoaderContext) => {
    for (const sample of samples) {
      const { slug: id, content } = sample;

      const data = await parseData<Record<string, any>>({ id, data: sample });

      const digest = generateDigest(data);

      const rendered = await renderMarkdown(content);

      store.set({ id, digest, data, rendered });
    }
  };

  const load = async (context: LoaderContext) => {
    const { meta, logger } = context;

    logger.info(`samplesLoader START`);

    const lastSynced = meta.get('lastSynced');

    if (lastSynced) {
      logger.info(`samplesLoader >  lastSynced ${lastSynced}`);
    }

    await loadData(context);

    logger.info(`samplesLoader DONE`);

    meta.set('lastSynced', String(Date.now()));
  };

  return {
    name: 'samples',

    load,

    schema: () => {
      throw new Error(
        'This default schema should not be used. Please specify your own when using `samplesLoader`.'
      );
    }
  };
};
