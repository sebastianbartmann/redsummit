/* empty css                           */import { c as createAstro, a as createComponent, r as renderTemplate, b as addAttribute, d as renderHead, e as renderComponent, f as renderSlot, m as maybeRenderHead } from '../astro.2baccee1.mjs';
import 'html-escaper';
import { createChart } from 'lightweight-charts';

function run(fn) {
    return fn();
}
function blank_object() {
    return Object.create(null);
}
function run_all(fns) {
    fns.forEach(run);
}

let current_component;
function set_current_component(component) {
    current_component = component;
}
Promise.resolve();
const ATTR_REGEX = /[&"]/g;
const CONTENT_REGEX = /[&<]/g;
/**
 * Note: this method is performance sensitive and has been optimized
 * https://github.com/sveltejs/svelte/pull/5701
 */
function escape(value, is_attr = false) {
    const str = String(value);
    const pattern = is_attr ? ATTR_REGEX : CONTENT_REGEX;
    pattern.lastIndex = 0;
    let escaped = '';
    let last = 0;
    while (pattern.test(str)) {
        const i = pattern.lastIndex - 1;
        const ch = str[i];
        escaped += str.substring(last, i) + (ch === '&' ? '&amp;' : (ch === '"' ? '&quot;' : '&lt;'));
        last = i + 1;
    }
    return escaped + str.substring(last);
}
function each(items, fn) {
    let str = '';
    for (let i = 0; i < items.length; i += 1) {
        str += fn(items[i], i);
    }
    return str;
}
let on_destroy;
function create_ssr_component(fn) {
    function $$render(result, props, bindings, slots, context) {
        const parent_component = current_component;
        const $$ = {
            on_destroy,
            context: new Map(context || (parent_component ? parent_component.$$.context : [])),
            // these will be immediately discarded
            on_mount: [],
            before_update: [],
            after_update: [],
            callbacks: blank_object()
        };
        set_current_component({ $$ });
        const html = fn(result, props, bindings, slots);
        set_current_component(parent_component);
        return html;
    }
    return {
        render: (props = {}, { $$slots = {}, context = new Map() } = {}) => {
            on_destroy = [];
            const result = { title: '', head: '', css: new Set() };
            const html = $$render(result, props, {}, $$slots, context);
            run_all(on_destroy);
            return {
                html,
                css: {
                    code: Array.from(result.css).map(css => css.code).join('\n'),
                    map: null // TODO
                },
                head: result.title + result.head
            };
        },
        $$render
    };
}
function add_attribute(name, value, boolean) {
    if (value == null || (boolean && !value))
        return '';
    const assignment = (boolean && value === true) ? '' : `="${escape(value, true)}"`;
    return ` ${name}${assignment}`;
}

/* src/components/Header.svelte generated by Svelte v3.55.1 */

const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	return `<nav><div class="${"navbar"}"><div class="${"navbar-start"}"><div class="${"dropdown"}"><label tabindex="${"0"}" class="${"btn btn-ghost lg:hidden"}"><svg xmlns="${"http://www.w3.org/2000/svg"}" class="${"h-5 w-5"}" fill="${"none"}" viewBox="${"0 0 24 24"}" stroke="${"currentColor"}"><path stroke-linecap="${"round"}" stroke-linejoin="${"round"}" stroke-width="${"2"}" d="${"M4 6h16M4 12h8m-8 6h16"}"></path></svg></label>
        <ul tabindex="${"0"}" class="${"menu menu-compact dropdown-content mt-3 p-2 shadow bg-snd rounded-box w-52"}"><li><a href="${"/dashboards/overview"}">Dashboards</a></li>
          <li><a href="${"/projects/overview"}">Projects</a></li>
          <li><a href="${"/blog/overview"}">Blog</a></li></ul></div>
      <a class="${"flex"}" href="${"/"}"><img class="${"shadow-xl h-8 mr-4"}" src="${"/profile_pic.png"}" alt="${"redSummit"}">
        <span class="${"font-semibold text-xl tracking-tight text-white"}">redSummit</span></a></div>

    <div class="${"navbar-center hidden lg:flex"}"><ul class="${"menu menu-horizontal px-1"}"><li><a href="${"/dashboards/overview"}">Dashboards</a></li>
        <li><a href="${"/projects/overview"}">Projects</a></li>
        <li><a href="${"/blog/overview"}">Blog</a></li></ul></div>

    <div class="${"navbar-end"}"><a href="${"mailto:hey@bartmann.xyz"}" class="${"btn btn-ghost btn-circle"}"><div class="${"indicator"}"><svg xmlns="${"http://www.w3.org/2000/svg"}" class="${"h-5 w-5"}" fill="${"none"}" viewBox="${"0 0 24 24"}" stroke="${"currentColor"}"><path stroke-linecap="${"round"}" stroke-linejoin="${"round"}" d="${"M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"}"></path></svg></div></a></div></div></nav>`;
});

/* src/components/Footer.svelte generated by Svelte v3.55.1 */

let socialCss = "h-6 w-full hover:text-highlight";

const Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	return `<footer class="${"flex justify-between"}"><span class="${"text-white m-6"}">© ${escape(new Date().getFullYear())}</span>
  <nav><ul class="${"flex space-x-4 m-6"}"><li><a href="${"/about"}" class="${"text-white hover:text-highlight"}">src</a></li></ul></nav>
  <span class="${"text-white flex space-x-2 m-6"}"><a${add_attribute("href", "https://twitter.com/redsummitDev", 0)}><span class="${"sr-only"}">Twitter</span>
      <svg${add_attribute("class", socialCss, 0)} fill="${"currentColor"}" role="${"img"}" viewBox="${"0 0 24 24"}" xmlns="${"http://www.w3.org/2000/svg"}"><title>Twitter</title><path d="${"M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"}"></path></svg></a></span></footer>`;
});

const $$Astro$3 = createAstro();
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width">
    <link rel="icon" type="image/png" href="/favicon.png">
    <meta name="generator"${addAttribute(Astro2.generator, "content")}>
    <meta name="description" content="climbing the red mountain">
    <link rel="script" href="https://unpkg.com/lightweight-charts/dist/lightweight-charts.standalone.production.js">
    <title>${title}</title>
  ${renderHead($$result)}</head>
  <body class="flex h-screen flex-col justify-between bg-mainred text-white">
    ${renderComponent($$result, "Header", Header, {})}
    <main>
      ${renderSlot($$result, $$slots["default"])}
    </main>
    <div class="flex-grow"></div>
    ${renderComponent($$result, "Footer", Footer, {})}
  </body></html>`;
}, "C:/Users/black/Desktop/dev/__redsummit website/redsummit/src/layouts/Layout.astro");

const $$Astro$2 = createAstro();
const $$LineChart = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$LineChart;
  return renderTemplate`

${maybeRenderHead($$result)}<div class="card w-3/5 shadow-xl">
  <div class="card-body">
    <div class="m-6 flex h-60 min-w-fit justify-center rounded-lg bg-snd">
      <div id="chart" class="h-10/12 w-10/12"></div>
    </div>
  </div>
</div>`;
}, "C:/Users/black/Desktop/dev/__redsummit website/redsummit/src/components/dashboards/LineChart.astro");

const $$Astro$1 = createAstro();
const $$Overview = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Overview;
  let title = "comming soon";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title }, { "default": () => renderTemplate`${maybeRenderHead($$result)}<div class="m-auto max-w-screen-md p-6">
    comming soon
    ${renderComponent($$result, "LineChart", $$LineChart, {})}
  </div>` })}`;
}, "C:/Users/black/Desktop/dev/__redsummit website/redsummit/src/pages/dashboards/overview.astro");

const $$file$1 = "C:/Users/black/Desktop/dev/__redsummit website/redsummit/src/pages/dashboards/overview.astro";
const $$url$1 = "/dashboards/overview";

const _page1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Overview,
    file: $$file$1,
    url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro = createAstro();
const $$Charttest = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Charttest;
  const chartOptions = {
    layout: { textColor: "black", background: { type: "solid", color: "white" } }
  };
  const chart = createChart(document.getElementById("chart"), chartOptions);
  const lineSeries = chart.addLineSeries({ color: "#2962FF" });
  const data = [
    { value: 0, time: 1642425322 },
    { value: 8, time: 1642511722 },
    { value: 10, time: 1642598122 },
    { value: 20, time: 1642684522 },
    { value: 3, time: 1642770922 },
    { value: 43, time: 1642857322 },
    { value: 41, time: 1642943722 },
    { value: 43, time: 1643030122 },
    { value: 56, time: 1643116522 },
    { value: 46, time: 1643202922 }
  ];
  lineSeries.setData(data);
  chart.timeScale().fitContent();
  return renderTemplate`${renderComponent($$result, "Layout", Layout, { "title": "redsummit" }, { "default": () => renderTemplate`${maybeRenderHead($$result)}<div id="chart"></div>` })}`;
}, "C:/Users/black/Desktop/dev/__redsummit website/redsummit/src/pages/charttest.astro");

const $$file = "C:/Users/black/Desktop/dev/__redsummit website/redsummit/src/pages/charttest.astro";
const $$url = "/charttest";

const _page2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Charttest,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const _page8 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Layout as $, _page1 as _, escape as a, _page2 as b, create_ssr_component as c, _page8 as d, each as e };
