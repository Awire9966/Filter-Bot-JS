
                (async()=>{
                const Discord = require("discord.js");
                const Database = require("easy-json-database");
                const devMode = typeof __E_IS_DEV !== "undefined" && __E_IS_DEV;
                const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
                const s4d = {
                    Discord,
                    database: new Database(`${devMode ? S4D_NATIVE_GET_PATH : "."}/db.json`),
                    joiningMember:null,
                    reply:null,
                    tokenInvalid:false,
                    tokenError: null,
                    checkMessageExists() {
                        if (!s4d.client) throw new Error('You cannot perform message operations without a Discord.js client')
                        if (!s4d.client.readyTimestamp) throw new Error('You cannot perform message operations while the bot is not connected to the Discord API')
                    }
                };
                s4d.client = new s4d.Discord.Client({
                    intents: [Object.values(s4d.Discord.Intents.FLAGS).reduce((acc, p) => acc | p, 0)],
                    partials: ["REACTION"]
                });

                var badwords;

function textToTitleCase(str) {
  return str.replace(/\S+/g,
      function(txt) {return txt[0].toUpperCase() + txt.substring(1).toLowerCase();});
}


await s4d.client.login('Your bot token goes here.').catch((e) => { s4d.tokenInvalid = true; s4d.tokenError = e; });

s4d.client.on('messageCreate', async (s4dmessage) => {
  badwords = ['Bad words go in this list.', ''];
  if (String((s4dmessage.content)).includes(String(badwords))) {
    s4dmessage.delete();
    (s4dmessage.member).send(String((['You cant say that',s4dmessage.member,'!'].join(''))));
  }
  if (String((s4dmessage.content)).includes(String((badwords.toUpperCase())))) {
    s4dmessage.delete();
    (s4dmessage.member).send(String((['You cant say that',s4dmessage.member,'!'].join(''))));
  }
  if (String((s4dmessage.content)).includes(String((textToTitleCase(badwords))))) {
    s4dmessage.delete();
    (s4dmessage.member).send(String((['You cant say that',s4dmessage.member,'!'].join(''))));
  }

});


                return s4d;
                })();
            