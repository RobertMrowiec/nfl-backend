import express from "express";

import playersRouter from "./routes/players/router";

const app = express();

app.use(express.json());
app.use("/api/players", playersRouter);

export default app;
