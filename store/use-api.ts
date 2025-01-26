import axios from "axios";
import type { AxiosInstance, AxiosResponse } from "axios";

const apiClient: AxiosInstance = axios.create({
	baseURL: "https://cinema-api-test.y-media.io/v1",
	headers: {
		"Content-Type": "application/json",
	},
});

interface ApiResponse<T> {
	data: T;
	error_code?: number;
	error_message?: string;
}

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

export const getMovies = (
	params: Record<string, unknown> = {}
): Promise<AxiosResponse<ApiResponse<Movie[]>>> =>
	apiClient.get("/movies", { params });

export const getMovieSessions = (
	movieId: number
): Promise<AxiosResponse<ApiResponse<Session[]>>> =>
	apiClient.get("/movieShows", { params: { movie_id: movieId } });

export const checkPlaces = (
	movieId: number,
	daytime: string,
	showdate: string
): Promise<AxiosResponse<ApiResponse<Place[]>>> =>
	apiClient.get("/showPlaces", {
		params: { movie_id: movieId, daytime, showdate },
	});

export const bookPlace = (
	data: BookingData
): Promise<AxiosResponse<ApiResponse<{ ticketkey: string }>>> =>
	apiClient.post("/bookPlace", data);
