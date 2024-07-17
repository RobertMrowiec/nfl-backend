import axios from "axios";
import request from "supertest";

import app from "../app";
import { playersDataset, rawPlayersDataset } from "./data/players";

describe("GET /players", () => {
	beforeAll(() => {
		axios.get = jest.fn(
			() => Promise.resolve({ status: 200, data: rawPlayersDataset }) as any
		);
	});

	it("should return a list of players", async () => {
		const response = await request(app).get("/api/players/page/1/limit/10");

		expect(response.status).toBe(200);
		expect(response.body.data.length).toEqual(3);
		expect(response.body.hasNextPage).toEqual(false);
		expect(response.body.data).toEqual(playersDataset);
	});

	it("should return a paginated list of players", async () => {
		const response = await request(app).get("/api/players/page/2/limit/2");

		expect(response.status).toBe(200);
		expect(response.body.data.length).toEqual(1);
		expect(response.body.data).toEqual([playersDataset[2]]);
	});

	it("should return a paginated list of players with hasNextPage=true", async () => {
		const response = await request(app).get("/api/players/page/1/limit/2");

		expect(response.status).toBe(200);
		expect(response.body.data.length).toEqual(2);
		expect(response.body.data).toEqual([playersDataset[0], playersDataset[1]]);
	});

	it("should return a correct list of players based on query param 'search'", async () => {
		const response = await request(app).get(
			"/api/players/page/1/limit/10?search=s"
		);

		expect(response.status).toBe(200);
		expect(response.body.data.length).toEqual(2);
		expect(response.body.hasNextPage).toEqual(false);
		expect(response.body.data).toEqual([playersDataset[0], playersDataset[1]]);
	});

	it("should return a correct list of players with name provided in query param 'search'", async () => {
		const response = await request(app).get(
			"/api/players/page/1/limit/10?search=micah"
		);

		expect(response.status).toBe(200);
		expect(response.body.data.length).toEqual(1);
		expect(response.body.data).toEqual([playersDataset[1]]);
	});

	it("should return empty list when search value is not included in any of player names", async () => {
		const response = await request(app).get(
			"/api/players/page/1/limit/10?search=definitelynotacorrectname"
		);

		expect(response.status).toBe(200);
		expect(response.body.data.length).toEqual(0);
		expect(response.body.data).toEqual([]);
	});

	it("should return empty list when search value is not included in any of player names", async () => {
		const response = await request(app).get(
			"/api/players/page/1/limit/10?search=definitelynotacorrectname"
		);

		expect(response.status).toBe(200);
		expect(response.body.data.length).toEqual(0);
		expect(response.body.data).toEqual([]);
	});

	it("should return list of players based on their position", async () => {
		const response = await request(app).get(
			"/api/players/page/1/limit/10?position=WR"
		);

		expect(response.status).toBe(200);
		expect(response.body.data.length).toEqual(2);
		expect(response.body.data).toEqual([playersDataset[0], playersDataset[2]]);
	});

	it("should return list of players based on their position and search name", async () => {
		const response = await request(app).get(
			"/api/players/page/1/limit/10?position=WR&search=chris"
		);

		expect(response.status).toBe(200);
		expect(response.body.data.length).toEqual(1);
		expect(response.body.hasNextPage).toEqual(false);
		expect(response.body.data).toEqual([playersDataset[0]]);
	});
});

describe("GET /players/:id", () => {
	beforeAll(() => {
		axios.get = jest.fn(
			() => Promise.resolve({ status: 200, data: rawPlayersDataset }) as any
		);
	});

	it("should return a specific player by ID", async () => {
		const response = await request(app).get("/api/players/1");

		expect(response.status).toBe(200);
		expect(response.body).toEqual(playersDataset[0]);
	});

	it("should return 404 when player with provided ID is not found", async () => {
		const response = await request(app).get("/api/players/NOTEXISTINGID");

		expect(response.status).toBe(404);
		expect(response.text).toEqual("Player not found");
	});
});
