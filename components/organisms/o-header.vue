<template>
	<header class="bg-gray-800 text-white p-4 shadow-md">
		<div class="max-w-7xl mx-auto flex justify-between items-center">
			<button
				v-if="!isHomePage"
				@click="goBack"
				class="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
			>
				Назад
			</button>
			<NuxtLink :to="`/`">
				<h1 class="text-2xl font-semibold">Movie App</h1>
			</NuxtLink>
		</div>
	</header>
</template>

<script setup lang="ts">
	import { useRouter, useRoute } from "vue-router";

	const router = useRouter();
	const route = useRoute();

	const goBack = () => {
		router.back();
	};

	const isHomePage = computed(() => route.path === "/");
</script>
