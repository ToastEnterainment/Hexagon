const Discord = require("discord.js");

exports.run = (client, message, args) => {
    if (message.member.voiceChannel) {            
        const dispatcher = client.voiceConnections.find(val => val.channel.guild.id == message.guild.id).dispatcher;

        if (!dispatcher.paused) {
            const embed = new Discord.RichEmbed();
            embed.setDescription(client.messages.get("playerResumed"));
            embed.setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16));
            message.channel.send(embed);
        } else {
            dispatcher.resume();
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
    "r"
]