export const formatUserProfile = ({ username, first_name, last_name, id }) => {
    const name = username || "ไม่ทราบชื่อ";
    const first = first_name || "-";
    const last = last_name || "-";

    return `👤 ข้อมูลผู้ใช้งาน:
  🔹 ชื่อผู้ใช้: ${name}
  🧑‍🦱 ชื่อต้น: ${first}
  🧑‍🦰 นามสกุล: ${last}
  🆔 ID: ${id}`;
};
