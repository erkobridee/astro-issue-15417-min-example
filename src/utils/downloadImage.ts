import path from 'node:path';
import { existsSync, mkdirSync } from 'node:fs';
import { writeFile } from 'node:fs/promises';

import sharp from 'sharp';

import { getFilenameFromUrl } from './getFilenameFromUrl';

//----------------------------------------------------------------------------//

const IMAGE_CACHE_DIR = `image-cache`;
const IMAGE_CACHE_PATH = `src/${IMAGE_CACHE_DIR}`;

//---//

export async function downloadImage(imageUrl: string) {
  const filename = getFilenameFromUrl(imageUrl);

  const relativeFilepath = `~/${IMAGE_CACHE_DIR}/${filename}`;

  if (existsSync(path.resolve(`${IMAGE_CACHE_PATH}/${filename}`))) {
    return relativeFilepath;
  }

  //---//

  const response = await fetch(imageUrl, {
    signal: AbortSignal.timeout(15_000)
  });

  if (!response.ok) {
    throw new Error(`Failed to download: ${imageUrl}`);
  }

  const input = Buffer.from(await response.arrayBuffer());

  // Normalize the source image only; let Astro perform final optimization.
  const output = await sharp(input)
    .resize({ width: 2400, withoutEnlargement: true })
    .png()
    .toBuffer();

  const dirPath = path.resolve(IMAGE_CACHE_PATH);

  if (!existsSync(dirPath)) {
    mkdirSync(dirPath, { recursive: true });
  }

  await writeFile(path.join(dirPath, filename), output);

  //---//

  return relativeFilepath;
}

//---//

export default downloadImage;
