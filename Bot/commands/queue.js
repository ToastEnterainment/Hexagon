const Discord = require("discord.js");

exports.run = (client, message, args) => {
    const queue = client.queues[message.guild.id];

    if (!queue || !queue[0]) {
        const embed = new Discord.RichEmbed();
        embed.setDescription(client.messages.get("noQueue"));
        embed.setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16));
        message.channel.send(embed);
        return;
    }

    const queueEmbed = new Discord.RichEmbed();

    queueEmbed.setTitle(client.messages.get("queueTitle"));

    for (let song of queue) {
        queueEmbed.addField(song.title, client.messages.get("requestedBy") + song.requested + " | " + client.messages.get("duration") + ": " + song.duration.replace("M",":").replace("PT","").replace("S",""));
    }

    message.channel.send(queueEmbed);
}

exports.requirements = [

];

exports.permissions = [
    
];

exports.aliases = [
    "q"
]