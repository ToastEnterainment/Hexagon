exports.run = (client, message, args) => {
    if (message.member.voiceChannel) {            
        const dispatcher = client.voiceConnections.find(val => val.channel.guild.id == message.guild.id).dispatcher;

        if (!dispatcher.paused) {
            message.channel.send("Player is already resumed");
        } else {
            dispatcher.resume();
        }
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
    "r"
]