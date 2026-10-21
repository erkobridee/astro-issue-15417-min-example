import type { Loader, LoaderContext } from 'astro/loaders';

import { samples } from '~/content/mock/samples';

import { replaceRemoteImages } from '~/utils/markdown/replaceRemoteImages';
import { downloadImage } from '~/utils/downloadImage';

//----------------------------------------------------------------------------//

export const samplesLoader = (): Loader => {
  const loadData = async ({
    store,
    generateDigest,
    parseData,
    renderMarkdown
  }: LoaderContext) => {
    store.clear();

    for (const sample of samples) {
      const { slug: id, content } = sample;

      const data = await parseData<Record<string, any>>({ id, data: sample });

      const digest = generateDigest(data);

      //const rawMarkdown = content;
      const rawMarkdown = await replaceRemoteImages(
        content,
        async (remoteUrl) => await downloadImage(remoteUrl)
      );

      const filePath = `src/content/mock/posts/${id}.md`;

      const rendered = await renderMarkdown(rawMarkdown, {
        fileURL: new URL(filePath, import.meta.url)
      });

      store.set({
        id,
        digest,
        data,
        rendered,
        filePath,
        assetImports: rendered.metadata?.imagePaths // register assets
      });
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

    // https://docs.astro.build/en/reference/content-loader-reference/#loadercreateschema
    createSchema: () => {
      throw new Error(
        'This default schema should not be used. Please specify your own when using `samplesLoader`.'
      );
    }
  } satisfies Loader;
};
