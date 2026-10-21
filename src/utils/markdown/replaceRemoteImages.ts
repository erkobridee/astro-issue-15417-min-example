import { escapeAttr } from '~/utils/html/escapeAttr';

//----------------------------------------------------------------------------//

export async function replaceRemoteImages(
  markdown: string,
  download: (url: string) => Promise<string>
) {
  const matches = [
    ...markdown.matchAll(
      /!\[([^\]]*)\]\(\s*(https?:\/\/[^)\s]+)(?:\s+"([^"]*)")?\s*\)/g
    )
  ];

  let result = markdown;

  for (const [full, alt, remoteUrl, title] of matches) {
    try {
      const localPath = await download(remoteUrl);
      const titlePart = title ? ` "${title}"` : '';

      result = result.replace(full, `![${alt}](${localPath}${titlePart})`);
    } catch (error) {
      console.warn(`Image download failed: ${remoteUrl}`, error);

      result = result.replace(
        full,
        `<img src="${escapeAttr(remoteUrl)}" alt="${escapeAttr(alt)}" loading="lazy" />`
      );
    }
  }

  return result;
}

//---//

export default replaceRemoteImages;
