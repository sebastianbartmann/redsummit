/* empty css                          */import { c as createAstro, a as createComponent, r as renderTemplate, e as renderComponent, m as maybeRenderHead } from './astro.2baccee1.mjs';
import 'html-escaper';
import { c as create_ssr_component, e as each, a as escape, $ as $$Layout } from './pages/all.c5e9c506.mjs';

/* src/components/home/Hero.svelte generated by Svelte v3.55.1 */

const Hero = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	return `<div class="${"m-12 text-center"}"><h1 class="${"text-3xl font-semibold tracking-wide text-white"}"><b>bold</b> statements based on <i>mediocre</i> data
  </h1>
  <br>
  <span>what is absolute truth anyway?</span></div>`;
});

/* src/components/home/LineBars.svelte generated by Svelte v3.55.1 */

const LineBars = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	return `<div class="${"grid grid-cols-3"}"><div class="${"h-10 lg:p-16 m-4"}"></div>
  <div class="${"md:col-span-2 col-span-3 flex flex-col items-end"}"><div class="${"m-0.5 rounded-l-xl bg-c1 h-12 flex items-center pl-4"}" style="${"width:53%"}"><a href="${"https://search.brave.com/images?q=cute%20cat%20pics&source=web"}" target="${"_blank"}"><span class="${"text-2xl font-semibold tracking-wide text-mainred"}">joy</span></a></div>
    <div class="${"m-0.5 rounded-l-xl bg-c2 h-12 flex items-center pl-4"}" style="${"width:61%"}"><a href="${"https://brenebrown.com/book/daring-greatly/"}" target="${"_blank"}"><span class="${"text-2xl font-semibold tracking-wide text-mainred"}">vulnearability</span></a></div>
    <div class="${"m-0.5 rounded-l-xl bg-c3 h-12 flex items-center pl-4"}" style="${"width:74%"}"><a href="${"https://en.wikipedia.org/wiki/Prudence"}" target="${"_blank"}"><span class="${"text-2xl font-semibold tracking-wide text-mainred"}">prudence</span></a></div>
    <div class="${"m-0.5 rounded-l-xl bg-c4 h-12 flex items-center pl-4"}" style="${"width:95%"}"><span class="${"text-2xl font-semibold tracking-wide text-mainred"}">honesty</span></div></div></div>`;
});

/* src/components/blog/PostsOverview.svelte generated by Svelte v3.55.1 */

const PostsOverview = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let posts;

	posts = [
		{
			title: "how it started",
			slug: "how-it-started",
			creation_date: "2021-10-13",
			category: "personal"
		},
		{
			title: "have a basic structure",
			slug: "principles/have-a-basic-structure",
			creation_date: "2021-12-08",
			category: "principles"
		}
	];

	return `<div class="${"py-4 flex flex-col text-center"}"><ul class="${"posts"}">${each(posts, post => {
		return `<li class="${"my-4"}"><a rel="${"prefetch"}" href="${"/blog/posts/" + escape(post.slug, true)}"><h2 class="${"text-xl"}">${escape(post.title)}</h2>
          <div class="${"date"}">${escape(post.creation_date)}
          </div></a>
      </li>`;
	})}</ul></div>`;
});

const $$Astro$5 = createAstro();
const prerender$5 = true;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "redsummit" }, { "default": () => renderTemplate`${maybeRenderHead($$result)}<div>
    ${renderComponent($$result, "Hero", Hero, {})}
    <div class="my-12">${renderComponent($$result, "PostsOverview", PostsOverview, {})}</div>
    ${renderComponent($$result, "LineBars", LineBars, {})}
  </div>` })}`;
}, "C:/Users/black/Desktop/dev/__redsummit website/redsummit/src/pages/index.astro");

const $$file$5 = "C:/Users/black/Desktop/dev/__redsummit website/redsummit/src/pages/index.astro";
const $$url$5 = "";

const _page0 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file$5,
  prerender: prerender$5,
  url: $$url$5
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$4 = createAstro();
const prerender$4 = true;
const $$Overview$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Overview$1;
  let title = "comming soon";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title }, { "default": () => renderTemplate`${maybeRenderHead($$result)}<div class="m-auto max-w-screen-md p-6">comming soon</div>` })}`;
}, "C:/Users/black/Desktop/dev/__redsummit website/redsummit/src/pages/projects/overview.astro");

const $$file$4 = "C:/Users/black/Desktop/dev/__redsummit website/redsummit/src/pages/projects/overview.astro";
const $$url$4 = "/projects/overview";

const _page3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Overview$1,
  file: $$file$4,
  prerender: prerender$4,
  url: $$url$4
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$3 = createAstro();
const prerender$3 = true;
const $$About = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$About;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "about" }, { "default": () => renderTemplate`${maybeRenderHead($$result)}<div class="flex justify-center">
    <img class="rounded-full shadow-2xl" alt="redsummit" src="/redsummit_800x800.webp">
  </div>` })}`;
}, "C:/Users/black/Desktop/dev/__redsummit website/redsummit/src/pages/about.astro");

const $$file$3 = "C:/Users/black/Desktop/dev/__redsummit website/redsummit/src/pages/about.astro";
const $$url$3 = "/about";

const _page4 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$About,
  file: $$file$3,
  prerender: prerender$3,
  url: $$url$3
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$2 = createAstro();
const prerender$2 = true;
const $$Overview = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Overview;
  let title = "comming soon";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title }, { "default": () => renderTemplate`${maybeRenderHead($$result)}<div class="my-12">${renderComponent($$result, "PostsOverview", PostsOverview, {})}</div>` })}`;
}, "C:/Users/black/Desktop/dev/__redsummit website/redsummit/src/pages/blog/overview.astro");

const $$file$2 = "C:/Users/black/Desktop/dev/__redsummit website/redsummit/src/pages/blog/overview.astro";
const $$url$2 = "/blog/overview";

const _page5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Overview,
  file: $$file$2,
  prerender: prerender$2,
  url: $$url$2
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$1 = createAstro();
const prerender$1 = true;
const $$HowItStarted = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$HowItStarted;
  let title = "how it started";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title }, { "default": () => renderTemplate`${maybeRenderHead($$result)}<div class="m-auto max-w-screen-md p-6"># Hello World!</div>` })}`;
}, "C:/Users/black/Desktop/dev/__redsummit website/redsummit/src/pages/blog/posts/how-it-started.astro");

const $$file$1 = "C:/Users/black/Desktop/dev/__redsummit website/redsummit/src/pages/blog/posts/how-it-started.astro";
const $$url$1 = "/blog/posts/how-it-started";

const _page6 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$HowItStarted,
  file: $$file$1,
  prerender: prerender$1,
  url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro = createAstro();
const prerender = true;
const $$HaveABasicStructure = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$HaveABasicStructure;
  let title = "have a basic structure";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title }, { "default": () => renderTemplate`${maybeRenderHead($$result)}<div class="m-auto max-w-screen-md p-6">
    <div>
      While it might sound nice to have everything structured.<br>
      Have everything put into algorithms, systems, machines.<br>
      It is not easy to maintain all those machines.
      <br>
      I have had, for example, a complex redirection system of all my email adresses.
      <br><br>
      If you are not able to forget about your system for months, come back and still
      be able to maintain it, it's a shitty system.
      <br><br>
      Either it is very well documented, or basic enough but still valuable for you
      to easily use and change it.
    </div>
  </div>` })}`;
}, "C:/Users/black/Desktop/dev/__redsummit website/redsummit/src/pages/blog/posts/principles/have-a-basic-structure.astro");

const $$file = "C:/Users/black/Desktop/dev/__redsummit website/redsummit/src/pages/blog/posts/principles/have-a-basic-structure.astro";
const $$url = "/blog/posts/principles/have-a-basic-structure";

const _page7 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$HaveABasicStructure,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { _page0 as _, _page3 as a, _page4 as b, _page5 as c, _page6 as d, _page7 as e };
