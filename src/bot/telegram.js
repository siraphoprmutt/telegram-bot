import TelegramBot from "node-telegram-bot-api";
import { config } from "../config/index.js";
import fs from "fs";
import path from "path";

if (!config.botToken) {
    console.error("Error: BOT_TOKEN is not set in .env");
    process.exit(1);
}

const bot = new TelegramBot(config.botToken, { polling: true });

// โหลดคำสั่งทั้งหมดจากโฟลเดอร์ commands
const commandsDir = path.resolve("./src/bot/commands");
const commandFiles = fs.readdirSync(commandsDir).filter(file => file.endsWith(".js"));

const validCommands = await Promise.all(
    commandFiles.map(async file => {
        const module = await import(`./commands/${file}`);
        return module.default;
    })
);

bot.on("polling_error", (error) => {
    console.error("Polling error:", error);
});

bot.on("callback_query", async (query) => {
    const { data, message, from } = query;
    const chatId = message.chat.id;

    if (data === "view_profile") {
        const username = from.username || "ไม่ทราบชื่อ";
        const firstName = from.first_name || "-";
        const lastName = from.last_name || "-";
        const userId = from.id;

        const profile = `👤 ข้อมูลผู้ใช้งาน:
  🔹 ชื่อผู้ใช้: ${username}
  🧑‍🦱 ชื่อต้น: ${firstName}
  🧑‍🦰 นามสกุล: ${lastName}
  🆔 ID: ${userId}`;

        await bot.sendMessage(chatId, profile);

        // ตอบ callback เพื่อให้ Telegram หยุด loading spinner
        await bot.answerCallbackQuery(query.id);
    }
});


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
