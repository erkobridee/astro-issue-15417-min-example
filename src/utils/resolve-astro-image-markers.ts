// https://docs.astro.build/en/reference/modules/astro-assets/#getimage
// DO NOT CALL INSIDE OF A CUSTOM LOADER
import { getImage } from 'astro:assets';

const MARKER_REGEX = /<img\s+__ASTRO_IMAGE_="([^"]*)"[^>]*>/g;

function decodeHtmlEntities(value: string) {
  return value
    .replaceAll('&quot;', '"')
    .replaceAll('&#34;', '"')
    .replaceAll('&#x22;', '"')
    .replaceAll('&#x27;', "'")
    .replaceAll('&#39;', "'")
    .replaceAll('&amp;', '&');
}

function escapeAttr(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export async function resolveAstroImageMarkers(html: string): Promise<string> {
  const matches = [...html.matchAll(MARKER_REGEX)];

  if (matches.length === 0) return html;

  const replacements = await Promise.all(
    matches.map(async (match) => {
      const [markerHtml, encodedProps] = match;

      let props: Record<string, unknown>;

      try {
        props = JSON.parse(decodeHtmlEntities(encodedProps));
      } catch (error) {
        console.warn('Invalid __ASTRO_IMAGE_ marker:', markerHtml, error);
        return { from: markerHtml, to: markerHtml };
      }

      const { src, alt, title, ...imageProps } = props as {
        src: string;
        alt?: string;
        title?: string;
        [key: string]: unknown;
      };

      try {
        const result = await getImage({
          src,
          alt,
          // Required for remote images unless you use inferSize.
          // Prefer explicit dimensions from your CMS when available.
          inferSize: true,
          ...imageProps
        } as Parameters<typeof getImage>[0]);

        const attributes = Object.entries(result.attributes)
          .map(([key, value]) => `${key}="${escapeAttr(String(value))}"`)
          .join(' ');

        return {
          from: markerHtml,
          to: `<img src="${result.src}" ${attributes} data-img-src="${src}"/>`
        };
      } catch (error) {
        console.warn(`Failed to optimize image: ${src}`, error);

        // Safe fallback: ordinary, unoptimized image.
        return {
          from: markerHtml,
          to: `<img src="${escapeAttr(src)}" alt="${escapeAttr(alt ?? '')}" loading="lazy" />`
        };
      }
    })
  );

  return replacements.reduce(
    (result, { from, to }) => result.replaceAll(from, to),
    html
  );
}
