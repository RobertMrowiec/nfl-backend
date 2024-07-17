import { Request, Response } from "express";

import { fetchPlayers, paginateResults } from "../../helpers/helpers";

export const getPlayers = async (req: Request, res: Response) => {
	const { query, params } = req;
	const page = parseInt(params.page) || 1;
	const limit = parseInt(params.limit) || 10;

	try {
		let players = await fetchPlayers();

		if (query.search) {
			const searchValue = (query.search as string).toLowerCase();
			players = players.filter((player) =>
				player.search_full_name?.includes(searchValue)
			);
		}

		if (query.position) {
			// theoreticly we won't need toLowerCase() here, cause API data is in UPPERCASE but just in case
			const positionValue = (query.position as string).toLowerCase();
			players = players.filter(
				(player) => player.position?.toLowerCase() === positionValue
			);
		}

		const paginatedPlayers = paginateResults(players, page, limit);
		res.status(200).json(paginatedPlayers);
	} catch (error) {
		console.error(error);
		res.status(400).send(error);
	}
};

export const getPlayer = async (req: Request, res: Response) => {
	try {
		const players = await fetchPlayers();

		const player = players.find((player) => player.player_id === req.params.id);

		if (!player) {
			return res.status(404).send("Player not found");
		}

		res.status(200).json(player);
	} catch (error) {
		res.status(400).send(error);
	}
};
