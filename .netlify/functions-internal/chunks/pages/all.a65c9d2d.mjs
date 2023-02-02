/* empty css                           */import { SimpleBarChart } from '@carbon/charts';
import { c as createAstro, a as createComponent, r as renderTemplate, b as addAttribute, d as renderHead, e as renderComponent, f as renderSlot, m as maybeRenderHead } from '../astro.2baccee1.mjs';
import 'html-escaper';
/* empty css                              */import { createChart } from 'lightweight-charts';

function run(fn) {
    return fn();
}
function blank_object() {
    return Object.create(null);
}
function run_all(fns) {
    fns.forEach(run);
}
function compute_rest_props(props, keys) {
    const rest = {};
    keys = new Set(keys);
    for (const k in props)
        if (!keys.has(k) && k[0] !== '$')
            rest[k] = props[k];
    return rest;
}
function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
    const e = document.createEvent('CustomEvent');
    e.initCustomEvent(type, bubbles, cancelable, detail);
    return e;
}

let current_component;
function set_current_component(component) {
    current_component = component;
}
function get_current_component() {
    if (!current_component)
        throw new Error('Function called outside component initialization');
    return current_component;
}
/**
 * Creates an event dispatcher that can be used to dispatch [component events](/docs#template-syntax-component-directives-on-eventname).
 * Event dispatchers are functions that can take two arguments: `name` and `detail`.
 *
 * Component events created with `createEventDispatcher` create a
 * [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent).
 * These events do not [bubble](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#Event_bubbling_and_capture).
 * The `detail` argument corresponds to the [CustomEvent.detail](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/detail)
 * property and can contain any type of data.
 *
 * https://svelte.dev/docs#run-time-svelte-createeventdispatcher
 */
function createEventDispatcher() {
    const component = get_current_component();
    return (type, detail, { cancelable = false } = {}) => {
        const callbacks = component.$$.callbacks[type];
        if (callbacks) {
            // TODO are there situations where events could be dispatched
            // in a server (non-DOM) environment?
            const event = custom_event(type, detail, { cancelable });
            callbacks.slice().forEach(fn => {
                fn.call(component, event);
            });
            return !event.defaultPrevented;
        }
        return true;
    };
}
Promise.resolve();

// source: https://html.spec.whatwg.org/multipage/indices.html
const boolean_attributes = new Set([
    'allowfullscreen',
    'allowpaymentrequest',
    'async',
    'autofocus',
    'autoplay',
    'checked',
    'controls',
    'default',
    'defer',
    'disabled',
    'formnovalidate',
    'hidden',
    'inert',
    'ismap',
    'itemscope',
    'loop',
    'multiple',
    'muted',
    'nomodule',
    'novalidate',
    'open',
    'playsinline',
    'readonly',
    'required',
    'reversed',
    'selected'
]);

const invalid_attribute_name_character = /[\s'">/=\u{FDD0}-\u{FDEF}\u{FFFE}\u{FFFF}\u{1FFFE}\u{1FFFF}\u{2FFFE}\u{2FFFF}\u{3FFFE}\u{3FFFF}\u{4FFFE}\u{4FFFF}\u{5FFFE}\u{5FFFF}\u{6FFFE}\u{6FFFF}\u{7FFFE}\u{7FFFF}\u{8FFFE}\u{8FFFF}\u{9FFFE}\u{9FFFF}\u{AFFFE}\u{AFFFF}\u{BFFFE}\u{BFFFF}\u{CFFFE}\u{CFFFF}\u{DFFFE}\u{DFFFF}\u{EFFFE}\u{EFFFF}\u{FFFFE}\u{FFFFF}\u{10FFFE}\u{10FFFF}]/u;
// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
// https://infra.spec.whatwg.org/#noncharacter
function spread(args, attrs_to_add) {
    const attributes = Object.assign({}, ...args);
    if (attrs_to_add) {
        const classes_to_add = attrs_to_add.classes;
        const styles_to_add = attrs_to_add.styles;
        if (classes_to_add) {
            if (attributes.class == null) {
                attributes.class = classes_to_add;
            }
            else {
                attributes.class += ' ' + classes_to_add;
            }
        }
        if (styles_to_add) {
            if (attributes.style == null) {
                attributes.style = style_object_to_string(styles_to_add);
            }
            else {
                attributes.style = style_object_to_string(merge_ssr_styles(attributes.style, styles_to_add));
            }
        }
    }
    let str = '';
    Object.keys(attributes).forEach(name => {
        if (invalid_attribute_name_character.test(name))
            return;
        const value = attributes[name];
        if (value === true)
            str += ' ' + name;
        else if (boolean_attributes.has(name.toLowerCase())) {
            if (value)
                str += ' ' + name;
        }
        else if (value != null) {
            str += ` ${name}="${value}"`;
        }
    });
    return str;
}
function merge_ssr_styles(style_attribute, style_directive) {
    const style_object = {};
    for (const individual_style of style_attribute.split(';')) {
        const colon_index = individual_style.indexOf(':');
        const name = individual_style.slice(0, colon_index).trim();
        const value = individual_style.slice(colon_index + 1).trim();
        if (!name)
            continue;
        style_object[name] = value;
    }
    for (const name in style_directive) {
        const value = style_directive[name];
        if (value) {
            style_object[name] = value;
        }
        else {
            delete style_object[name];
        }
    }
    return style_object;
}
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
function escape_attribute_value(value) {
    // keep booleans, null, and undefined for the sake of `spread`
    const should_escape = typeof value === 'string' || (value && typeof value === 'object');
    return should_escape ? escape(value, true) : value;
}
function escape_object(obj) {
    const result = {};
    for (const key in obj) {
        result[key] = escape_attribute_value(obj[key]);
    }
    return result;
}
function each(items, fn) {
    let str = '';
    for (let i = 0; i < items.length; i += 1) {
        str += fn(items[i], i);
    }
    return str;
}
function validate_component(component, name) {
    if (!component || !component.$$render) {
        if (name === 'svelte:component')
            name += ' this={...}';
        throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules. Otherwise you may need to fix a <${name}>.`);
    }
    return component;
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
function style_object_to_string(style_object) {
    return Object.keys(style_object)
        .filter(key => style_object[key])
        .map(key => `${key}: ${escape_attribute_value(style_object[key])};`)
        .join(' ');
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

const $$Astro$2 = createAstro();
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width">
    <link rel="icon" type="image/png" href="/favicon.png">
    <meta name="generator"${addAttribute(Astro2.generator, "content")}>
    <meta name="description" content="climbing the red mountain">
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

/* node_modules/@carbon/charts-svelte/src/BaseChart.svelte generated by Svelte v3.55.1 */

const BaseChart = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $$restProps = compute_rest_props($$props, ["Chart","chart","data","options","theme","id","ref"]);
	let { Chart = undefined } = $$props;
	let { chart = null } = $$props;
	let { data = [] } = $$props;
	let { options = {} } = $$props;
	let { theme = "white" } = $$props;
	let { id = "chart-" + Math.random().toString(36) } = $$props;
	let { ref = null } = $$props;
	const dispatch = createEventDispatcher();

	if ($$props.Chart === void 0 && $$bindings.Chart && Chart !== void 0) $$bindings.Chart(Chart);
	if ($$props.chart === void 0 && $$bindings.chart && chart !== void 0) $$bindings.chart(chart);
	if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
	if ($$props.options === void 0 && $$bindings.options && options !== void 0) $$bindings.options(options);
	if ($$props.theme === void 0 && $$bindings.theme && theme !== void 0) $$bindings.theme(theme);
	if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
	if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0) $$bindings.ref(ref);

	{
		if (chart) {
			chart.model.setData(data);
			chart.model.setOptions({ theme, ...options });
			dispatch("update", { data, options });
		}
	}

	return `<div${spread(
		[
			escape_object($$restProps),
			{
				"data-carbon-theme": escape_attribute_value(theme)
			},
			{ id: escape_attribute_value(id) }
		],
		{}
	)}${add_attribute("this", ref, 0)}></div>`;
});

/* node_modules/@carbon/charts-svelte/src/BarChartSimple.svelte generated by Svelte v3.55.1 */

const BarChartSimple = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $$restProps = compute_rest_props($$props, ["chart","ref"]);
	let { chart = null } = $$props;
	let { ref = null } = $$props;
	if ($$props.chart === void 0 && $$bindings.chart && chart !== void 0) $$bindings.chart(chart);
	if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0) $$bindings.ref(ref);
	let $$settled;
	let $$rendered;

	do {
		$$settled = true;

		$$rendered = `${validate_component(BaseChart, "BaseChart").$$render(
			$$result,
			Object.assign({}, $$restProps, { Chart: SimpleBarChart }, { ref }, { chart }),
			{
				ref: $$value => {
					ref = $$value;
					$$settled = false;
				},
				chart: $$value => {
					chart = $$value;
					$$settled = false;
				}
			},
			{}
		)}`;
	} while (!$$settled);

	return $$rendered;
});

/* src/components/dashboards/LineChart.svelte generated by Svelte v3.55.1 */

const LineChart = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	return `${validate_component(BarChartSimple, "BarChartSimple").$$render(
		$$result,
		{
			data: [
				{ group: "Qty", value: 65000 },
				{ group: "More", value: 29123 },
				{ group: "Sold", value: 35213 },
				{ group: "Restocking", value: 51213 },
				{ group: "Misc", value: 16932 }
			],
			options: {
				title: "Simple bar (discrete)",
				height: "400px",
				axes: {
					left: { mapsTo: "value" },
					bottom: { mapsTo: "group", scaleType: "labels" }
				}
			}
		},
		{},
		{}
	)}`;
});

const $$Astro$1 = createAstro();
const $$Overview = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Overview;
  let title = "comming soon";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title }, { "default": () => renderTemplate`${maybeRenderHead($$result)}<div class="m-auto max-w-screen-md p-6">
    comming soon
    ${renderComponent($$result, "LineChart", LineChart, {})}
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
