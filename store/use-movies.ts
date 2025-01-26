import { ref } from "vue";
import { getMovies, getMovieSessions, checkPlaces, bookPlace } from "./use-api";

interface Movie {
	id: number;
	name: string;
	genre: number;
	description: string;
}

interface Session {
	id: number;
	movie_id: number;
	showdate: string;
	daytime: string;
}

interface Place {
	row: number;
	seat: number;
	available: boolean;
}

interface BookingData {
	movie_id: number;
	row: number;
	seat: number;
	showdate: string;
	daytime: string;
}

export function useMovies() {
	const movies = ref<Movie[]>([]);
	const movieDetails = ref<Movie | null>(null);
	const sessions = ref<Session[]>([]);
	const places = ref<Place[]>([]);

	const fetchMovies = async (params: Record<string, unknown> = {}) => {
		const { data } = await getMovies(params);
		movies.value = data.data || [];
	};

	const fetchMovieDetails = async (movieId: number) => {
		const { data } = await getMovies({ movie_id: movieId });
		movieDetails.value = data.data[0] || null;
	};

	const fetchSessions = async (movieId: number) => {
		const { data } = await getMovieSessions(movieId);
		sessions.value = data.data || [];
	};

	const fetchPlaces = async (
		movieId: number,
		daytime: string,
		showdate: string
	) => {
		const { data } = await checkPlaces(movieId, daytime, showdate);
		places.value = data.data || [];
	};

	const bookTicket = async (bookingData: BookingData): Promise<string> => {
		const { data } = await bookPlace(bookingData);
		return data.data.ticketkey;
	};

	return {
		movies,
		movieDetails,
		sessions,
		places,
		fetchMovies,
		fetchMovieDetails,
		fetchSessions,
		fetchPlaces,
		bookTicket,
	};
}
