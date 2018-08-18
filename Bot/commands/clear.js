const Discord = require("discord.js");

exports.run = (client, message, args) => {
    if (message.member.voiceChannel) {
        let queue = client.queues[message.guild.id];

        if (!queue) {
            const embed = new Discord.RichEmbed();
            embed.setDescription(client.messages.get("noQueue"));
            embed.setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16));
            message.channel.send(embed);
            return;
        }

        queue = [];
        message.reply(client.messages.get("queueCleared"));
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
    "j"
]