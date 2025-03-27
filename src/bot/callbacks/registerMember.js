const handleRegisterMember = async (query, bot) => {
    const chatId = query.message.chat.id;

    await bot.sendMessage(chatId, `✅ คุณได้ลงทะเบียนเป็น *Member* เรียบร้อยแล้ว`, {
        parse_mode: "Markdown",
    });

    await bot.answerCallbackQuery(query.id);
};

export default {
    data: "register_member",
    handle: handleRegisterMember,
};
