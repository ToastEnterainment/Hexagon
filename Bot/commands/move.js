exports.run = (client, message, args) => {
    if (message.member.voiceChannel) {        
        let queue = client.queues[message.guild.id];

        if (!queue) {
            message.channel.send("There's any queue for this server");
            return;
        }        
        
        if (args[0] === "0" || args[1] === "0") {
            message.reply("you can't use current playing track");
            return;
        }

        const temp = queue[args[1]];
        queue[args[1]] = queue[args[0]];
        queue[args[0]] = temp;

        console.log(queue);

    } else {
        message.reply("You must join voice channel to use this command");
        return;
    }
}

exports.requirements = [
    
];

exports.permissions = [
    
];

exports.aliases = [
    "m"
]