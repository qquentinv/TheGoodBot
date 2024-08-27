const docx = require("docx");

async function createWordFile(msg) {
  console.log("start to generating word file");
  // send channel waiting message
  const response = await msg.channel.send("Generating word file...");

  // get all message (limit 100 now)
  // regarder comment faire pour prendre tous les messages
  const channelMessages = await msg.channel.messages
    .fetch({ limit: 100 })
    .catch((err) => console.log(err));

  const content = [];
  // checker si les msgs sont des images pour les enregistrer dans le fs
  // ajouter les images dans le word

  // add content message in word
  await channelMessages.forEach((msg) => {
    console.log(msg.content);
    if (!msg.author.bot && msg.content.toLowerCase() !== "!word") {
      content.push(new docx.TextRun({ text: msg.content, break: 1 }));
    }
  });

  // create word
  const doc = new docx.Document({
    sections: [
      {
        properties: {},
        children: [
          new docx.Paragraph({
            children: content.reverse(),
          }),
        ],
      },
    ],
  });

  // add word to buffer
  const buffer = await docx.Packer.toBuffer(doc);
  // send word to discord channel
  response.edit({
    content: `Word file OK`,
    files: [{ attachment: buffer, name: "word.docx" }],
  });
  console.log("generating word file is OK");
}

module.exports = {
  createWordFile,
};
