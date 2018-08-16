exports.run = (client, message, args) => {
    let dispatcher;
    try {
        dispatcher = client.voiceConnections.find(val => val.channel.guild.id == message.guild.id).player.dispatcher;
    } catch (e) {

    }

    const queue = client.queues[message.guild.id];

    if (!queue) {
        message.channel.send("There's any queue for this server");
        return;
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