const handler = async (m, { conn, usedPrefix, participants }) => {
  (conn.level = db.data.users[m.sender]),
    (conn.fightnaga = conn.fightnaga ? conn.fightnaga : {});
  if (void 0 !== conn.fightnaga[m.sender] && !0 === conn.fightnaga[m.sender])
    return m.reply(
      "*Tidak bisa melakukan battle ⚔️ karena Arena yang kamu miliki dipakai untuk fight pet mu yg lain.*",
    );
  let users = participants.map((u) => u.id);
  var lawan;
  for (
    lawan = users[Math.floor(users.length * Math.random())];
    void 0 === db.data.users[lawan] || lawan === m.sender;

  )
    lawan = users[Math.floor(users.length * Math.random())];
  let lamaPertarungan = Acakin(8, 20);
  var time;
  m.reply(
    `*Pet Kamu* (🦅phonix ${db.data.users[m.sender].phonix}) ⚔️menantang 🦅phonixnya *${conn.getName(lawan)}* (🦅phonix ${db.data.users[lawan].phonix}) lagi berkelahi.\n\nTunggu ${lamaPertarungan} menit lagi dan lihat siapa yg menang🎮.`,
  ),
    (conn.fightnaga[m.sender] = !0),
    await ((time = 6e4 * lamaPertarungan),
    new Promise((res) => setTimeout(res, time)));
  let alasanKalah = [
      "Naikin lagi levelnya😐",
      "Cupu",
      "Kurang hebat",
      "Ampas Petnya",
      "Pet gembel",
    ],
    alasanMenang = [
      "Hebat",
      "Pro",
      "Ganas Pet",
      "Legenda Pet",
      "Sangat Pro",
      "Rajin Ngasi Makan Pet",
    ],
    kesempatan = [];
  for (i = 0; i < db.data.users[m.sender].phonix; i++)
    kesempatan.push(m.sender);
  for (i = 0; i < db.data.users[lawan].phonix; i++) kesempatan.push(lawan);
  let pointPemain = 0,
    pointLawan = 0;
  for (i = 0; i < 10; i++)
    (unggul = Acakin(0, kesempatan.length - 1)),
      kesempatan[unggul] === m.sender ? (pointPemain += 1) : (pointLawan += 1);
  if (pointPemain > pointLawan) {
    let hadiah = 2e4 * (pointPemain - pointLawan);
    (db.data.users[m.sender].money += hadiah),
      (db.data.users[m.sender].tiketcoin += 1),
      m.reply(
        `*${conn.getName(m.sender)}* [${10 * pointPemain}] - [${10 * pointLawan}] *${conn.getName(lawan)}*\n\n*Pet🦅Kamu* (phonix ${db.data.users[m.sender].phonix}) MENANG melawan 🦅phonixnya *${conn.getName(lawan)}* (phonix ${db.data.users[lawan].phonix}) karena phonix🦅kamu ${alasanMenang[Acakin(0, alasanMenang.length - 1)]}\n\nHadiah Rp. ${hadiah.toLocaleString()}\n+1 Tiketcoin`,
      );
  } else if (pointPemain < pointLawan) {
    let denda = 1e4 * (pointLawan - pointPemain);
    (db.data.users[m.sender].money -= denda),
      (db.data.users[m.sender].tiketcoin += 1),
      m.reply(
        `*${conn.getName(m.sender)}* [${10 * pointPemain}] - [${10 * pointLawan}] *${conn.getName(lawan)}*\n\n*Pet🦅Kamu* (phonix ${db.data.users[m.sender].phonix}) KALAH melawan 🦅phonixnya *${conn.getName(lawan)}* (phonix ${db.data.users[lawan].phonix}) karena pet kamu ${alasanKalah[Acakin(0, alasanKalah.length - 1)]}\n\nUang kamu berkurang Rp. ${denda.toLocaleString()}\n+1 Tiketcoin`,
      );
  } else
    m.reply(
      `*${conn.getName(m.sender)}* [${10 * pointPemain}] - [${10 * pointLawan}] *${conn.getName(lawan)}*\n\nHasil imbang kak, ga dapet apa apa 😂`,
    );
  delete conn.fightnaga[m.sender];
};
(handler.help = ["fightphonix"]),
  (handler.tags = ["game"]),
  (handler.command = /^(fightphonix)$/i),
  (handler.limit = !0),
  (handler.group = !0);
export default handler;

function Acakin(min, max) {
  return (
    (min = Math.ceil(min)),
    (max = Math.floor(max)),
    Math.floor(Math.random() * (max - min + 1)) + min
  );
}
