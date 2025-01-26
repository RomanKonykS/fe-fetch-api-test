export default defineNuxtConfig({
	app: {
		head: {
			title: "My Nuxt App",
			meta: [{ name: "description", content: "Description of my Nuxt app" }],
		},
	},

	modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
	compatibilityDate: "2025-01-22",
	router: {
		base: "/fe-fetch-api-test/",
	},
});
