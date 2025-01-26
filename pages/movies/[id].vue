<template>
	<div class="max-w-7xl mx-auto px-4 py-8">
		<div class="flex flex-col md:flex-row items-center md:items-start mb-8">
			<div class="flex-shrink-0 mb-6 md:mb-0 md:w-1/3">
				<img
					v-if="movieDetails?.value?.image"
					:src="movieDetails.value.image"
					alt="Movie Poster"
					class="rounded-lg shadow-lg w-full h-auto object-cover"
				/>
			</div>

			<div class="md:ml-8 flex-1">
				<h1 class="text-4xl font-extrabold text-gray-900 mb-4">
					{{ movieDetails?.value?.name || "Loading..." }}
				</h1>

				<div v-if="movieDetails?.value" class="mb-4">
					<p class="text-xl font-semibold text-gray-700">
						Genre:
						<span class="font-normal text-gray-500">
							{{ getGenre(movieDetails.value.genre) }}
						</span>
					</p>
				</div>

				<div v-if="movieDetails?.value" class="prose lg:prose-xl mb-6">
					<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
						<p
							v-html="
								movieDetails?.value?.description || 'Description is loading...'
							"
							class="text-lg text-gray-700"
						></p>
					</div>
				</div>
				<div class="mb-8">
					<button
						@click="toggleAdditionalInfo"
						class="px-4 py-2 bg-gray-800 text-white rounded-md shadow-sm hover:bg-gray-700 transition-colors w-fit text-left"
					>
						Додаткова інформація
					</button>
					<div
						v-if="isAdditionalInfoVisible"
						class="mt-4 text-lg text-gray-600"
					>
						<p
							v-html="
								movieDetails?.value?.additional ||
								'No additional information available.'
							"
						></p>
					</div>
				</div>
			</div>
		</div>

		<div>
			<h2 class="text-2xl font-semibold text-gray-800 mb-4">Sessions</h2>

			<ul v-if="sessions" class="custom-ul">
				<template
					v-for="(sessionGroup, movieId) in sessions.value"
					:key="movieId"
				>
					<li
						v-for="session in sessionGroup"
						:key="session.showdate"
						class="custom-li"
					>
						<div class="text-lg text-gray-800">
							<div>{{ formatDate(session.showdate) }}</div>
							<div>
								<span
									v-for="time in formatTime(session.daytime)"
									:key="time"
									class="inline-block rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
								>
									<button
										@click="selectSession(movieId, session, time)"
										class="text-blue-500 hover:underline"
									>
										{{ time }}
									</button>
								</span>
							</div>
						</div>
					</li>
				</template>
			</ul>
			<p v-else class="text-gray-500 mt-4">No sessions available.</p>
		</div>
	</div>
</template>
<script setup lang="ts">
	import { useMovies } from "@/store";
	import { useRoute, useRouter } from "vue-router";
	import { ref, computed, onMounted } from "vue";

	const route = useRoute();
	const router = useRouter();

	const moviesStore = useMovies();

	const isAdditionalInfoVisible = ref(false);

	const fetchData = async () => {
		await moviesStore.fetchMovieDetails(route.params.id);
		await moviesStore.fetchSessions(route.params.id);
	};

	const selectSession = (
		movieId: number,
		session: { showdate: string; daytime: string },
		selectedTime: string
	) => {
		router.push({
			path: "/booking",
			query: {
				movie_id: movieId,
				showdate: session.showdate || "",
				daytime: selectedTime || "",
			},
		});
	};

	const movieDetails = computed(() => moviesStore.movieDetails);
	const sessions = computed(() => moviesStore.sessions);

	const getGenre = (genreId: number) => {
		const genres: Record<number, string> = {
			0: "Action",
			1: "Adventures",
			2: "Comedy",
			3: "Drama",
			4: "Horror",
			5: "Westerns",
		};
		return genres[genreId] || "Unknown";
	};

	const toggleAdditionalInfo = () => {
		isAdditionalInfoVisible.value = !isAdditionalInfoVisible.value;
	};

	const formatDate = (dateString: string): string => {
		const date = new Date(dateString);
		return date.toLocaleDateString("uk-UA", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	const formatTime = (timeString: string): string[] => {
		return timeString.split(";");
	};

	onMounted(async () => {
		try {
			await fetchData();
		} catch (error) {
			console.error("Failed to fetch data:", error);
		}
	});
</script>

<style scoped>
	ul {
		@apply space-y-4;
	}

	li {
		@apply flex justify-between items-center bg-gray-100 rounded-lg p-4 shadow-sm hover:bg-gray-200 transition-colors;
	}

	li button {
		@apply px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors;
	}
</style>
