const request = require("request");
const Discord = require("discord.js");

exports.run = (client, message, args) => {
    
    request("https://api.audd.io/findLyrics/?q=" + args.join("%20"), (err, result, body) => {
        if (err) throw err;
        const res = JSON.parse(body).result[0].lyrics;

        if (res.length > 2000) {
            const str1 = res.substr(0, 2000);
            const str2 = res.substr(2000, res.length);    

            const embed = new Discord.RichEmbed();
            embed.setTitle("Lyrics for " + args.join(" "));
            embed.setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16));
            embed.setDescription(str1);

            const embed2 = new Discord.RichEmbed();
            embed2.setDescription(str2);
            embed.setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16));
            embed2.setFooter("Requested by " + message.author.username, message.author.avatarURL);

            message.channel.send(embed);
            message.channel.send(embed2);
        } else {
            const embed = new Discord.RichEmbed();
            embed.setTitle("Lyrics for " + args.join(" "));
            embed.setDescription(res);
            embed.setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16));
            embed.setFooter("Requested by " + message.author.username, message.author.avatarURL);

            message.channel.send(embed);
        }
    });
}

exports.requirements = [
    
];

exports.permissions = [
    
];

exports.aliases = [
    "l"
]