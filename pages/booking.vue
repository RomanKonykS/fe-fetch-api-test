<template>
	<div class="max-w-7xl mx-auto px-4 py-8">
		<h1 class="text-4xl font-extrabold text-gray-900 mb-4">Booking</h1>

		<p class="text-lg text-gray-700 mb-4">
			<strong>Movie ID:</strong> {{ movieId }}
		</p>
		<p class="text-lg text-gray-700 mb-4">
			<strong>Date:</strong> {{ showdate }}
		</p>
		<p class="text-lg text-gray-700 mb-4">
			<strong>Time:</strong> {{ daytime }}
		</p>

		<h2 class="text-2xl font-semibold text-gray-800 mb-4">Available Places</h2>
		<template v-if="places">
			<div v-for="item in places" class="border-b-2 border-solid mb-4 pb-4">
				Row - {{ item[0].row }}
				<div class="flex gap-2">
					<div
						v-for="seat in item[1]"
						:key="`${rowIndex}-${seat.seat}`"
						:class="[
							'flex justify-center items-center w-6 h-6 rounded-lg cursor-pointer border text-xs',
							seat.is_free ? 'bg-green-200 hover:bg-green-300' : 'bg-red-300',
						]"
						@click="selectPlace({ ...seat, row: item[0].row })"
					>
						{{ seat.seat }}
					</div>
				</div>
			</div>
		</template>
		<p v-else class="text-gray-500 mt-4">No available places.</p>

		<div
			v-if="selectedPlace"
			class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
		>
			<div class="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
				<h3 class="text-xl font-bold mb-4">Booking Details</h3>
				<p><strong>Row:</strong> {{ selectedPlace.row }}</p>
				<p><strong>Seat:</strong> {{ selectedPlace.seat }}</p>
				<p><strong>Date:</strong> {{ showdate }}</p>
				<p><strong>Time:</strong> {{ daytime }}</p>
				<div class="mt-4">
					<button
						v-if="selectedPlace.is_free && !isBooking"
						@click="book(selectedPlace)"
						class="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
					>
						Book
					</button>
					<p v-else-if="!selectedPlace.is_free" class="text-red-500">
						This seat is already booked.
					</p>
					<p v-if="isBooking" class="text-blue-500 mt-2">
						Booking your ticket...
					</p>
					<p v-if="bookingError" class="text-red-500 mt-2">
						{{ bookingError }}
					</p>
				</div>
				<button
					@click="closeModal"
					class="mt-4 w-full px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition-colors"
				>
					Close
				</button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { useMovies } from "@/store";
	import { useRoute } from "vue-router";
	import { onMounted, ref } from "vue";

	const moviesStore = useMovies();
	const route = useRoute();

	const movieId = ref(route.query.movie_id as string);
	const showdate = ref(route.query.showdate as string);
	const daytime = ref(route.query.daytime as string);
	const places = ref(moviesStore.places);

	const selectedPlace = ref<{
		row: number;
		seat: number;
		is_free: boolean;
	} | null>(null);
	const isBooking = ref(false);
	const bookingError = ref<string | null>(null);

	onMounted(async () => {
		if (movieId.value && showdate.value && daytime.value) {
			await moviesStore.fetchPlaces(
				parseInt(movieId.value, 10),
				daytime.value,
				showdate.value
			);
		} else {
			console.error("Missing query parameters.");
		}
	});

	const selectPlace = (place: {
		row: number;
		seat: number;
		is_free: boolean;
	}) => {
		selectedPlace.value = place;
	};

	const closeModal = () => {
		selectedPlace.value = null;
	};

	const book = async (place: { row: number; seat: number }) => {
		if (isBooking.value) return;

		isBooking.value = true;
		bookingError.value = null;

		try {
			const ticketKey = await moviesStore.bookTicket({
				movie_id: parseInt(movieId.value, 10),
				row: place.row,
				seat: place.seat,
				showdate: showdate.value,
				daytime: daytime.value,
			});

			alert(`Ticket booked! Ticket key: ${ticketKey}`);

			await moviesStore.fetchPlaces(
				parseInt(movieId.value, 10),
				daytime.value,
				showdate.value
			);

			closeModal();
		} catch (error: any) {
			bookingError.value =
				error?.response?.data?.error_message || "Booking failed.";
			console.error("Booking failed:", error);
		} finally {
			isBooking.value = false;
		}
	};
</script>

<style scoped>
	.grid div {
		border: 1px solid #ccc;
	}
</style>
