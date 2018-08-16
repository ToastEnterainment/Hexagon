const ytdl = require('ytdl-core');
const search = require("youtube-search");
const Discord = require("discord.js");

exports.run = (client, message, args) => {
    if (message.member.voiceChannel) {
        let queue = client.queues[message.guild.id];

        if (!queue) {
            client.queues[message.guild.id] = [];
            queue = client.queues[message.guild.id];
        }

        search(args.join(" "), { maxResults: 1, key: client.config.youtubeKey }, (err, results) => {
            if (err) throw err;
            if (!results[0]) {
                message.channel.send("There's problem with your query, try again");
                return;
            }

            queue.push({
                "url": results[0].link,
                "requested": message.author.username,
                "title": results[0].title
            });

            const embed = new Discord.RichEmbed();
            embed.setTitle("Added to queue!")
                .addField("Title", results[0].title, true)
                .addField("Description", results[0].description, true)
                .addField("Channel", results[0].channelTitle, true)
                .setFooter("Requested by " + message.author.username, message.author.avatarURL)
                .setThumbnail(results[0].thumbnails.default.url);

            message.channel.send(embed);
        });


        const conn = client.voiceConnections.find(val => val.channel.guild.id == message.guild.id);

        if (conn && conn.speaking) {
            return;
        }

        message.member.voiceChannel.join().then(connection => {
            play(connection, queue);
        }).catch(console.error);
    } else {
        message.reply("You must join voice channel to use this command");
        return;
    }
}

const play = (connection, queue) => {
    const stream = ytdl(queue[0].url, { filter: 'audioonly' });
    const dispatcher = connection.playStream(stream, { seek: 0, volume: 1 });

    dispatcher.on("end", () => {
        queue.shift();
        if (!queue[0]) {
            connection.disconnect();
            return;
        }

        play(connection, queue);
    });
}

exports.requirements = [
    "arg1"
];

exports.permissions = [

];

exports.aliases = [
    "p"
]