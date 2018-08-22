const fetch = require('@v0id/fetch');
const Discord = require('discord.js');

exports.run = async (client, message, args) => {
    if (!message.channel.nsfw)
        return message.channel.send('Sorry! This is command only works in NSFW channels! :)');

    const hentai = args[0];
    const n = (await fetch.get(`https://nhentai.net/api/gallery/${hentai}`)).body;

    const embed = new Discord.RichEmbed()
        .setTitle(`${n.title.pretty}`)
        .setURL(`https://nhentai.net/g/${n.id}/`)

        .setColor('#ED2553')
        .setImage(`https://t.nhentai.net/galleries/${n.media_id}/cover.jpg`)
        .setFooter(`Id: ${n.id} | Favorites: ${n.num_favorites} | Pages: ${n.num_pages} `);

    message.channel.send(embed);
};