const ytdl = require('ytdl-core');
const search = require("youtube-search");
const Discord = require("discord.js");
const request = require("request");

exports.run = (client, message, args) => {
    if (message.member.voiceChannel) {
        let queue = client.queues[message.guild.id];

        if (!queue) {
            client.queues[message.guild.id] = [];
            queue = client.queues[message.guild.id];
        }

        if (args.join(" ").includes("youtube") || !args.join(" ").includes("http")) {
            search(args.join(" "), { maxResults: 1, key: client.config.youtubeKey }, (err, results) => {
                if (err) throw err;
                if (!results[0]) {
                    const embed = new Discord.RichEmbed();
                    embed.setDescription(client.messages.get("queryError"));
                    embed.setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16));
                    message.channel.send(embed);
                    return;
                }
                
                request("https://www.googleapis.com/youtube/v3/videos?id=" + results[0].id + "&part=contentDetails&key=" + client.config.youtubeKey, (err, res) => {            
                    queue.push({
                        "url": results[0].link,
                        "requested": message.author.username,
                        "title": results[0].title,
                        "duration": JSON.parse(res.body).items[0].contentDetails.duration
                    });
                });

                const embed = new Discord.RichEmbed();
                embed.setTitle(client.messages.get("addedToQueue"))
                    .addField(client.messages.get("title"), results[0].title, true)
                    .addField(client.messages.get("description"), results[0].description, true)
                    .addField(client.messages.get("channel"), results[0].channelTitle, true)
                    .setFooter(client.messages.get("requestedBy") + message.author.username, message.author.avatarURL)
                    .setThumbnail(results[0].thumbnails.default.url);

                message.channel.send(embed);
            });
        }


        const conn = client.voiceConnections.find(val => val.channel.guild.id == message.guild.id);

        if (conn && conn.speaking) {
            return;
        }

        message.member.voiceChannel.join().then(connection => {
            play(connection, queue, client, message);
        }).catch(console.error);
    } else {
        const embed = new Discord.RichEmbed();
        embed.setDescription(client.messages.get("noVoiceChannel"));
        embed.setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16));
        message.channel.send(embed);
        return;
    }
}
    
const play = (connection, queue, client, message) => {
    const stream = ytdl(queue[0].url, { filter: 'audioonly' });
    const dispatcher = connection.playStream(stream, { seek: 0, volume: 1 });

    dispatcher.on("end", () => {
        const isQL = client.qloops.get(message.guild.id);

        if (isQL == "true") {
            queue.push(queue[0]);
        }

        queue.shift();
        if (!queue[0]) {
            connection.disconnect();
            queue = [];
            return;
        }

        play(connection, queue, client, message);
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