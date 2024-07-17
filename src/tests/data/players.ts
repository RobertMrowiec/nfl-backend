import { Player } from "../../types/player";

export const playersDataset: Partial<Player>[] = [
	{
		search_full_name: "chrisjones",
		full_name: "Chris Jones",
		first_name: "Chris",
		last_name: "Jones",
		player_id: "1",
		position: "WR",
	},
	{
		search_full_name: "micahparsons",
		full_name: "Micah Parsons",
		first_name: "Micah",
		last_name: "Parsons",
		player_id: "2",
		position: "DE",
	},
	{
		search_full_name: "trevorlawrence",
		full_name: "Trevor Lawrence",
		first_name: "Trevor",
		last_name: "Lawrence",
		player_id: "3",
		position: "WR",
	},
];

export const rawPlayersDataset: { [key in string]: Partial<Player> } =
	playersDataset.reduce((acc: { [key in string]: Partial<Player> }, p) => {
		acc[p.player_id!] = p;

		return acc;
	}, {});
