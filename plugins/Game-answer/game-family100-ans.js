import similarity from "similarity";
const threshold = 0.72;
export async function before(m) {
  db.data.game.familygame = db.data.game.familygame
    ? db.data.game.familygame
    : {};
  if (!m.quoted || !m.quoted?.fromMe || !m.quoted?.isBaileys || !m.text)
    return !0;
  let id = "family100_" + m.chat;
  if (!(id in db.data.game.familygame)) return !0;
  let room = db.data.game.familygame[id],
    text = m.text.toLowerCase().replace(/[^\w\s\-]+/, ""),
    isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text);
  if (!isSurrender) {
    let index = room.jawaban.indexOf(text);
    if (index < 0)
      return (
        Math.max(
          ...room.jawaban
            .filter((_, index) => !room.terjawab[index])
            .map((jawaban) => similarity(jawaban, text)),
        ) >= 0.72 &&
          (await this.reply(m.chat, "❗ *Sedikit Lagi!*", m, {
            contextInfo: {
              mentionedJid: [m.sender],
            },
          })),
        !0
      );
    if (room.terjawab[index]) return !0;
    let users = db.data.users[m.sender];
    (room.terjawab[index] = m.sender), (users.exp += room.winScore);
  }
  let isWin = room.terjawab.length === room.terjawab.filter((v) => v).length,
    caption =
      `\n*Soal:* ${room.soal}\nTerdapat *${room.jawaban.length}* jawaban${room.jawaban.find((v) => v.includes(" ")) ? "\n(beberapa jawaban terdapat spasi)\n" : ""}\n${isWin ? "✅ *SEMUA JAWABAN TERJAWAB*" : isSurrender ? "*MENYERAH!*" : ""}\n${Array.from(
        room.jawaban,
        (jawaban, index) =>
          !(!isSurrender && !room.terjawab[index]) &&
          `(${index + 1}) ${jawaban} ${room.terjawab[index] ? "@" + room.terjawab[index].split("@")[0] : ""}`.trim(),
      )
        .filter((v) => v)
        .join(
          "\n",
        )}\n${isSurrender ? "" : `+${room.winScore} XP tiap jawaban benar`}\n    `.trim();
  const msg = await this.reply(m.chat, caption, null, {
    mentions: this.parseMention(caption),
  });
  return (
    (room.msg = msg),
    (isWin || isSurrender) && delete db.data.game.familygame[id],
    !0
  );
}
