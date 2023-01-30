export const pushToDataLayer = (obj: object) => {
	window.dataPlayer = window.dataPlayer || [];
	window.dataPlayer.push(obj);
};

export const pushDatalayerEvent = (
	name: string,
	category: string = '-',
	action: string = '-',
	label: string = '-'
) => {
	var event = { event: 'cEvent', event_name: name };
	event[name] = {
		category: category,
		action: action,
		label: label
	};

	pushToDataLayer(event);
};

export const pushPageView = (type: string, category: string = '-') => {
	var event = {
		event: 'cEvent',
		event_name: 'page_view',
		page_view: {
			type: type,
			category: category
		}
	};

	pushToDataLayer(event);
};
