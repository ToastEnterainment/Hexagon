const Discord = require("discord.js");

exports.run = (client, message, args) => {
    let dispatcher;
    try {
        dispatcher = client.voiceConnections.find(val => val.channel.guild.id == message.guild.id).player.dispatcher;
    } catch (e) {

    }

    const queue = client.queues[message.guild.id];

    if (!queue) {
        const embed = new Discord.RichEmbed();
        embed.setDescription(client.messages.get("noQueue"));
        embed.setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16));
        message.channel.send(embed);
    }

	if (!args[0]) args[0] = 1;
	toSkip = Math.min(args[0], queue.length);

	queue.splice(0, toSkip - 1);

	dispatcher.end();
}

exports.requirements = [

];

exports.aliases = [
    "s"
];

exports.permissions = [
    
];