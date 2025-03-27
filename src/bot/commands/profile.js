import { formatUserProfile } from "../components/formatUserProfile.js";

const handleProfile = async (chatId, msg, bot) => {
    const profile = formatUserProfile({
        username: msg.chat.username,
        first_name: msg.chat.first_name,
        last_name: msg.chat.last_name,
        id: msg.chat.id,
    });

    await bot.sendMessage(chatId, profile);
};

export default {
    paths: ["/me", "/profile"],
    description: "ข้อมูลผู้ใช้งาน",
    handle: handleProfile,
};
