import TelegramBot from "node-telegram-bot-api";
import { config } from "../config/index.js";
import fs from "fs";
import path from "path";

if (!config.botToken) {
    console.error("Error: BOT_TOKEN is not set in .env");
    process.exit(1);
}

const bot = new TelegramBot(config.botToken, { polling: true });

// ===== โหลด commands =====
const commandsDir = path.resolve("./src/bot/commands");
const commandFiles = fs.readdirSync(commandsDir).filter(file => file.endsWith(".js"));

const validCommands = await Promise.all(
    commandFiles.map(async file => {
        const module = await import(`./commands/${file}`);
        return module.default;
    })
);

// ===== โหลด callbacks =====
const callbacksDir = path.resolve("./src/bot/callbacks");
const callbackFiles = fs.readdirSync(callbacksDir).filter(file => file.endsWith(".js"));

const callbackHandlers = await Promise.all(
    callbackFiles.map(async file => {
        const module = await import(`./callbacks/${file}`);
        return module.default;
    })
);

bot.on("polling_error", (error) => {
    console.error("Polling error:", error);
});

// ===== จัดการ callback_query =====
bot.on("callback_query", async (query) => {
    const handler = callbackHandlers.find(cb => cb.data === query.data);

    if (handler) {
        try {
            await handler.handle(query, bot);
        } catch (err) {
            console.error("Callback error:", err);
            await bot.answerCallbackQuery(query.id, {
                text: "❗ เกิดข้อผิดพลาด",
                show_alert: true,
            });
        }
    } else {
        await bot.answerCallbackQuery(query.id, {
            text: "ไม่รู้จักคำสั่งนี้",
            show_alert: true,
        });
    }
});

// ===== จัดการข้อความธรรมดา =====
bot.onText(/(.*)/, async (msg) => {
    const chatId = msg.chat.id;
    const message = msg.text.trim();

    const foundCommand = validCommands.find(cmd => cmd.paths.includes(message));
    if (foundCommand) {
        try {
            await foundCommand.handle(chatId, msg, bot, validCommands);
        } catch (err) {
            console.error("Handle error:", err);
            bot.sendMessage(chatId, "❗ เกิดข้อผิดพลาดระหว่างประมวลผลคำสั่ง");
        }
        return;
    }

    bot.sendMessage(chatId, `❗ ไม่พบคำสั่งที่ต้องการ`);
});

export default bot;
