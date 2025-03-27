const handleRegister = async (chatId, msg, bot) => {
    const profile = `🙋‍♂️ โปรดเลือกประเภทการลงทะเบียนของคุณ`;

    await bot.sendMessage(chatId, profile, {
        reply_markup: {
            inline_keyboard: [
                [{ text: "🔹 ลงทะเบียน Member", callback_data: "register_member" }],
                [{ text: "💎 ลงทะเบียน VIP", callback_data: "register_vip" }],
            ],
        },
    });
};

export default {
    paths: ["/register", "/ลงทะเบียน"],
    description: "ลงทะเบียนสมาชิก",
    handle: handleRegister,
};
