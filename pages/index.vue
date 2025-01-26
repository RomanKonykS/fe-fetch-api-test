<template>
	<div class="min-h-screen bg-gray-100 py-8 px-4">
		<h1 class="text-3xl font-bold text-center mb-6">Movies</h1>
		<div class="flex justify-between mb-4">
			<input
				v-model="search"
				placeholder="Search by name"
				class="border rounded-lg px-4 py-2 w-80 focus:outline-none focus:ring focus:ring-blue-300"
				@input="fetchMoviesList"
			/>
			<select
				v-model="selectedGenre"
				@change="filterByGenre"
				class="border rounded-lg px-4 py-2 w-80 focus:outline-none focus:ring focus:ring-blue-300"
			>
				<option value="">All Genres</option>
				<option
					v-for="(genreName, genreId) in genres"
					:key="genreId"
					:value="genreId"
				>
					{{ genreName }}
				</option>
			</select>
		</div>
		<div
			v-if="movies.length"
			class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
		>
			<NuxtLink
				v-for="movie in movies"
				:key="movie.id"
				:to="`/movies/${movie.id}`"
				class="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition duration-300"
			>
				<img
					:src="movie.image"
					alt="Movie Poster"
					class="w-full h-56 object-cover"
				/>
				<div class="p-4">
					<h2 class="text-lg font-semibold mb-2">{{ movie.name }}</h2>
					<p class="text-gray-600 mb-4">Genre: {{ getGenre(movie.genre) }}</p>
					<NuxtLink
						:to="`/movies/${movie.id}`"
						class="text-blue-500 hover:underline"
					>
						View Details
					</NuxtLink>
				</div>
			</NuxtLink>
		</div>
		<div v-else class="text-center text-gray-500 mt-8">No movies found.</div>
	</div>
</template>

<script>
	import { useMovies } from "@/store";

	export default {
		setup() {
			const moviesStore = useMovies();
			const search = ref("");
			const selectedGenre = ref("");

			const genres = {
				0: "Actions",
				1: "Adventures",
				2: "Comedy",
				3: "Drama",
				4: "Horror",
				5: "Westerns",
			};

			const fetchMoviesList = () => {
				moviesStore.fetchMovies({ name: search.value });
			};

			const filterByGenre = () => {
				if (selectedGenre.value === "") {
					moviesStore.fetchMovies();
				} else {
					moviesStore.fetchMovies({ genres: selectedGenre.value });
				}
			};

			onMounted(() => {
				moviesStore.fetchMovies();
			});

			return {
				movies: moviesStore.movies,
				search,
				selectedGenre,
				genres,
				fetchMoviesList,
				filterByGenre,
				getGenre: (genreId) => genres[genreId] || "Unknown",
			};
		},
	};
</script>
