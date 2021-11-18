const { Client, Collection, MessageEmbed } = require('discord.js');
const client = new Client();
const { readdirSync } = require('fs');
const fs = require("fs");
const db = require('quick.db')
const Timeout = new Collection()
const { token } = require('./config.json')


client.queue = new Map();
client.commands = new Collection();
client.aliases = new Collection();
client.categoryes = readdirSync("./commands/")
const settups = require("./handlers/setups");
settups(client);


["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});


client.on("message", async message => {
    if (message.author.bot) return;
    const prefix = '!?'
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if (cmd.length === 0) return;
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if (command) command.run(client, message, args);

})

client.login(token);
