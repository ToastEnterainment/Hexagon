exports.run = (client, message, args) => {
    message.channel.send("pong!").catch(console.error);
}

exports.requirements = [

];

exports.permissions = [
    "KICK_MEMBERS"
]
exports.aliases = [
    
]