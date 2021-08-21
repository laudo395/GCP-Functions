const { Telegram } = require('telegraf')

console.log("Initialization of the cloud Function");
// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TELEGRAM_TOKEN;
const GROUP_ID = process.env.GROUP_ID;

//const tg = new Telegram(process.env.BOT_TOKEN)
const tg = new Telegram(token)

// subscribeTelegram is the main function called by Cloud Functions.
module.exports.subscribeTelegram = (pubSubEvent, context) => {

  const build = eventToBuild(pubSubEvent.data);

  const message = createTelegramMessage(build);
  //const msgText = `${build.summary}`;
  let msgHtml = `\n<b>${build.incident.condition_name} </b> \n${build.incident.summary} \n <a href="${build.incident.url}">Check here</a>`;
  if (build.images) {
    const images = build.images.join(',');
    msgHtml += `'Images:' ${images}`;
  }

  tg.sendMessage(GROUP_ID, message + msgHtml, { parse_mode: "HTML" })
};

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function randomize(arr) {
  return arr[getRandomInt(arr.length)];
}

// eventToBuild transforms pubsub event message to a build object.
const eventToBuild = (data) => {
  return JSON.parse(Buffer.from(data, 'base64').toString());
}

// createTelegramMessage creates a message from a build object.
const createTelegramMessage = (build) => {
  switch (build.incident.state) {
    case 'open':
      return randomize([
        "⚠️Something is wrong, open your eyes.⚠️",
        "⚠️Something is wrong, open your eyes.⚠️",
      ]);

    case 'closed':
      return randomize([
        "✅Good job guys!😎",
        "✅Great work!😎",
      ]);
  }
  return "Something is strange, baby";
}