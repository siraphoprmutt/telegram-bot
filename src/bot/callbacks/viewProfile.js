import { formatUserProfile } from "../components/formatUserProfile.js";

const handleViewProfile = async (query, bot) => {
    const { message, from } = query;
    const chatId = message.chat.id;

    const profile = formatUserProfile({
        username: from.username,
        first_name: from.first_name,
        last_name: from.last_name,
        id: from.id,
    });

    await bot.sendMessage(chatId, profile);
    await bot.answerCallbackQuery(query.id);
};

export default {
    data: "view_profile",
    handle: handleViewProfile,
};
