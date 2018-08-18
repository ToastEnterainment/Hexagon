const ytdl = require('ytdl-core');
const search = require("youtube-search");
const Discord = require("discord.js");

exports.run = (client, message, args) => {
    if (message.member.voiceChannel) {
        const isQL = client.qloops.get(message.guild.id);

        if (!isQL || isQL == "false") {
            client.qloops.set(message.guild.id, "true");

            const embed = new Discord.RichEmbed();
            embed.setDescription(client.messages.get("queueLoopOn"));
            embed.setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16));
            message.channel.send(embed);
        } else {
            client.qloops.set(message.guild.id, "false");

            const embed = new Discord.RichEmbed();
            embed.setDescription(client.messages.get("queueLoopOff"));
            embed.setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16));
            message.channel.send(embed);
        }
    } else {
        const embed = new Discord.RichEmbed();
        embed.setDescription(client.messages.get("noVoiceChannel"));
        embed.setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16));
        message.channel.send(embed);
        return;
    }
}

exports.requirements = [
    
];

exports.permissions = [

];

exports.aliases = [
    "qloop",
    "ql"
]