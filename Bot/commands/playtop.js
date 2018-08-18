exports.run = (client, message, args) => {
    if (message.member.voiceChannel) {            
        message.member.voiceChannel.join();
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