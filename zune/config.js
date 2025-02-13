export default {
	duration: 300, 
	init: {
		type: "ready",
		preloader: null
	},
	events: {
		click: true
	},
	api: {
		url: "/",
		method: "POST",
		headers: false,
		format: "json"
	},
	spa: {
		main: {
			api: {
				url: "/",
				method: "GET",
				headers: false,
				format: "json",
				body: {
					method: "getPage",
					path: "{{href}}"
				}
			},
			update: null,
			loader: null,
			mode: false,
			scroll: {
				it: null,
				target: null,
				speed: 300,
				type: "smooth",
				align: "top",
				offset: 0,
				axis: "Y"
			}
		}
	},
	cache: {
		component: 50,
		module: 50,
		api: 50,
		state: 5
	},
	cacheTime: 300
}