const handleRegisterVip = async (query, bot) => {
    const chatId = query.message.chat.id;

    await bot.sendMessage(chatId, `🎉 ยินดีด้วย! คุณได้ลงทะเบียนเป็น *VIP* แล้ว`, {
        parse_mode: "Markdown",
    });

    await bot.answerCallbackQuery(query.id);
};

export default {
    data: "register_vip",
    handle: handleRegisterVip,
};
