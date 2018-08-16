exports.run = (client, message, args) => {
    if (message.member.voiceChannel) {            
        message.member.voiceChannel.leave();
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
    "d"
]