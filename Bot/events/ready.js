module.exports = (client) => {
    client.user.setPresence({ game: { name: 'with ' + client.users.size + ' users' }, status: 'streaming' })
        .catch(console.error);
    
    console.log(`Ready to server in ${client.channels.size} channels on ${client.guilds.size} servers, for a total of ${client.users.size} users.`);
};