import { b as createAstro, c as createComponent, d as addAttribute, i as renderScript, a as renderTemplate, r as renderComponent, j as renderHead, e as renderSlot, F as Fragment, u as unescapeHTML, m as maybeRenderHead, s as spreadAttributes } from './astro/server-C1fvILgS.js';
import 'piccolore';
import { clsx } from 'clsx';
/* empty css                         */
import { twMerge } from 'tailwind-merge';

const $$Astro$2 = createAstro("https://erkobridee.github.io");
const $$ClientRouter = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$ClientRouter;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>${renderScript($$result, "/home/runner/work/astro-issue-15417-min-example/astro-issue-15417-min-example/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/runner/work/astro-issue-15417-min-example/astro-issue-15417-min-example/node_modules/astro/components/ClientRouter.astro", void 0);

const baseUrl = `${"/astro-issue-15417-min-example"}`;
const redefineUrl = (url) => {
  let newUrl = baseUrl;
  const hrefStartWithSlash = url.startsWith("/");
  if (baseUrl === "/") {
    newUrl = hrefStartWithSlash ? url : `/${url}`;
  } else {
    const baseUrlEndWithSlash = baseUrl.endsWith("/");
    newUrl = `${baseUrl}${!baseUrlEndWithSlash && !hrefStartWithSlash ? `/` : ""}${url}`;
  }
  return newUrl;
};

const $$Astro$1 = createAstro("https://erkobridee.github.io");
const $$Main = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Main;
  const { content } = Astro2.props;
  const styleFragment = `
<style>
  :root {
    --externalIconUrl: url(${redefineUrl("images/external-link.svg")});
  }
</style>
`;
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml"${addAttribute(redefineUrl("/favicon.svg"), "href")}><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${content.title}</title>${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(styleFragment)}` })}${renderComponent($$result, "ClientRouter", $$ClientRouter, {})}${renderHead()}</head> <body> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "/home/runner/work/astro-issue-15417-min-example/astro-issue-15417-min-example/src/layouts/main.astro", void 0);

const cn = (...args) => twMerge(clsx(args));

const $$Astro = createAstro("https://erkobridee.github.io");
const $$Link = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Link;
  const {
    href,
    external = href.startsWith("http"),
    class: className
  } = Astro2.props;
  let extraLinkProps = {
    href,
    rel: "noopener nofollow",
    target: "_blank"
  };
  if (!external) {
    extraLinkProps = {
      href: redefineUrl(href),
      rel: "prefetch"
    };
  }
  return renderTemplate`${maybeRenderHead()}<a${spreadAttributes(extraLinkProps)}${addAttribute(cn(
    `
    underline
    transition-colors
    duration-200 ease-in-out
    hover:text-purple-500
  `,
    className,
    { "external-link": external }
  ), "class")} data-astro-cid-mbqdmgin> ${renderSlot($$result, $$slots["default"])} </a>`;
}, "/home/runner/work/astro-issue-15417-min-example/astro-issue-15417-min-example/src/components/Link.astro", void 0);

const title = "Astro issue #15417 minimum example";
const samplePageTitle = "Astro Content Collection from a custom loader";

export { $$Main as $, $$Link as a, cn as c, samplePageTitle as s, title as t };
