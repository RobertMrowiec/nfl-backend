import axios from "axios";

import { Player } from "../types/player";
import { fetchPlayers, paginateResults } from "../helpers/helpers";
import { rawPlayersDataset, playersDataset } from "./data/players";

describe("fetchPlayers", () => {
	axios.get = jest.fn(
		() => Promise.resolve({ status: 200, data: rawPlayersDataset }) as any
	);

	it("should return a formatted list of players", async () => {
		const players = await fetchPlayers();
		expect(players.length).toEqual(3);
		expect(players).toEqual(playersDataset);
	});
});

describe("paginateResults", () => {
	it("should return a paginated list of players", () => {
		const players = playersDataset;
		const paginatedPlayers = paginateResults(
			players as unknown as Player[],
			1,
			2
		);

		expect(paginatedPlayers.currentPage).toEqual(1);
		expect(paginatedPlayers.hasNextPage).toEqual(true);
		expect(paginatedPlayers.data.length).toEqual(2);
		expect(paginatedPlayers.data).toEqual([players[0], players[1]]);
	});
});
