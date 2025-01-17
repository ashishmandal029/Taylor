import fetch from "node-fetch";
const handler = async (m, { conn, args, usedPrefix, command }) => {
  const text =
    args.length >= 1
      ? args.slice(0).join(" ")
      : (m.quoted && m.quoted?.text) ||
        m.quoted?.caption ||
        m.quoted?.description ||
        null;
  if (!text)
    return m.reply(
      `Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`,
    );
  m.react(wait);
  const messages = [
    {
      role: "system",
      content:
        "Saya AI dari OpenAI, diciptakan untuk membantu Anda mengeksplorasi ide, bertukar informasi, dan menyelesaikan masalah. Ada yang bisa saya bantu?",
    },
    {
      role: "user",
      content: text,
    },
  ];
  try {
    let res = await chatWithGPT(messages);
    m.reply(res.choices[0]?.message.content);
  } catch (e) {
    m.react(eror);
  }
};
(handler.help = ["ji1z"]),
  (handler.tags = ["gpt"]),
  (handler.command = /^(ji1z)$/i);
export default handler;
async function chatWithGPT(messages) {
  try {
    const response = await fetch(
      "https://chatbot-ji1z.onrender.com/chatbot-ji1z",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "User-Agent":
            "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36",
          Referer: "https://seoschmiede.at/en/aitools/chatgpt-tool/",
        },
        body: JSON.stringify({
          messages: messages,
        }),
      },
    );
    return await response.json();
  } catch (error) {
    throw (console.error("Error fetching data:", error), error);
  }
}
