exports.run = (client, message, args) => {
    if (message.member.voiceChannel) {            
        let queue = client.queues[message.guild.id];

        if (!queue) {
            message.channel.send("There's any queue for this server");
            return;
        }        

        queue = [];
        message.reply("queue cleared");
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
    "j"
]