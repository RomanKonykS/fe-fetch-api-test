import { createRouter, createWebHistory } from "vue-router";
import App from "@/App.vue";
import Booking from "@/pages/Booking.vue";

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: "/",
			name: "main",
			component: App,
		},
		{
			path: "/:id/:movieId",
			name: "selectedItem",
			component: App,
		},
		{
			path: "/booking/:movie_id/:showdate/:daytime",
			name: "Booking",
			component: Booking,
		},
	],
});

export default router;
