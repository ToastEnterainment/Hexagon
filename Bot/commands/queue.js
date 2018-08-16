const Discord = require("discord.js");

exports.run = (client, message, args) => {
    const queue = client.queues[message.guild.id];

    if (!queue || !queue[0]) {
        message.reply("there's any music added to queue");
        return;
    }

    const queueEmbed = new Discord.RichEmbed();

    queueEmbed.setTitle(message.guild.name + "'s queue");

    for (let song of queue) {
        queueEmbed.addField(song.title, "Requested by: " + song.requested);
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