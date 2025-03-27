const handleHelp = async (chatId, msg, bot, validCommands) => {
    const commandList = validCommands
        .map(cmd => `${cmd.paths[0]} - ${cmd.description}`)
        .join("\n");

    const helpMessage = `📌 คำสั่งที่มีอยู่:\n\n${commandList}`;

    await bot.sendMessage(chatId, helpMessage);
};

export default {
    paths: ["/", "/start", "/help", "/commands", "/เริ่มต้น"],
    description: "แสดงรายการคำสั่งที่รองรับ",
    handle: handleHelp
};
