const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const config = require("./config.json");a

client.login("NDc5MzMwMjcyNjA1NzY1NjUy.DlXqtQ.yBYo3l28pk1ZEvja0vy6mTq7rVk");

client.commands = new Map();
client.events = new Map();
client.config = config;

fs.readdir("./events/", (err, files) => {
    if (err) throw err;

    files.forEach(file => {
        const event = require(`./events/${file}`);
        const eventName = file.split(".")[0];

        client.on(eventName, event.bind(null, client));
    });
});

fs.readdir("./commands", (err, files) => {
    if (err) throw err;

    files.forEach(file => {
        if (!file.endsWith(".js")) return;

        const props = require(`./commands/${file}`);
        const commandName = file.split(".")[0];

        console.log(`Attempting to load command ${commandName}`);

        client.commands.set(commandName, props);
    });
});