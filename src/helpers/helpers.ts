import axios from "axios";

import { Player } from "../types/player";
import { cache } from "../cache/cache";

export const paginateResults = (
	results: Player[],
	page: number,
	limit: number
) => {
	const start = (page - 1) * limit;
	const end = page * limit;

	return {
		currentPage: page,
		hasNextPage: end < results.length,
		data: results.slice(start, end),
	};
};

const formatPlayers = (players: { [key in string]: Player }) =>
	Object.values(players);

export const fetchPlayers = async (): Promise<Player[]> => {
	let players: Player[] | undefined = cache.get("playersList");

	if (!players) {
		try {
			const response = await axios.get(
				"https://api.sleeper.app/v1/players/nfl"
			);

			const formattedPlayers = formatPlayers(response.data);
			const playersOnly = formattedPlayers.filter(
				(p) => p.player_id !== p.team
			); // Filter out team objects from the list

			cache.set("playersList", playersOnly as Player[]);
			players = playersOnly as Player[];
		} catch (err) {
			console.error(err);
			throw err;
		}
	}

	return players as Player[];
};
