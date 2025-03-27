import express from "express";
import { config } from "./src/config/index.js";
import routes from "./src/routes/index.js";
import "./src/bot/telegram.js"; // start Telegram bot

const app = express();

app.use("/", routes);

app.listen(config.port, () => {
    console.log(`Server running on http://localhost:${config.port}`);
});
