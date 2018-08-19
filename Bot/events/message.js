module.exports = (client, message) => {
    if (message.author.bot) return;
    if (message.content.indexOf(client.config.prefix) !== 0) return;
    if (!message.member) return;

    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    client.commands.forEach((v, k) => {
        if (k === command) {
            const requirements = v.requirements;
            const permissions = v.permissions;

            for (let requirement of requirements) {
                switch(requirement) {
                    case "arg1":
                        if (!args[0]) return;
                        break;

                    case "arg2":
                        if (!args[1]) return;
                        break;
                        
                    case "arg3":
                        if (!args[2]) return;
                        break;

                    case "mention":
                        if (!message.mentions.users.first()) return;
                        break;
                }
            }

            for (let permission of permissions) {
                if (!message.member.permissions.has(permission)) return;
            }

            v.run(client, message, args);
            return;
        }

        for(let alias of v.aliases) {
            if (command === alias) {
                const requirements = v.requirements;
                const permissions = v.permissions;

                for (let requirement of requirements) {
                    switch(requirement) {
                        case "arg1":
                            if (!args[0]) return;
                            break;

                        case "arg2":
                            if (!args[1]) return;
                            break;
                            
                        case "arg3":
                            if (!args[2]) return;
                            break;

                        case "mention":
                            if (!message.mentions.users.first()) return;
                            break;
                    }
                }

                for (let permission of permissions) {
                    if (!message.member.permissions.has(permission)) return;
                }

                
                v.run(client, message, args);
                return;
            }
        }
    });
};