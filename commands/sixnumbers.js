const Discord = require('discord.js')
const request = require('request');
var Api = require("nhentai-api");
exports.run = async (client, message, args) => {
    if(!message.channel.nsfw)
    return message.channel.send("Sorry! This is command only works in NSFW channels! :)")
    const hentai = args[0]
    request(`https://nhentai.net/g/${hentai}/json`, { json: true }, (response, body) => {
        const n = body.data.chidren.data;
        if(!/(ftp|http|https)/gmi.test(postdata.url))
        return message.channel.send(`:heavy_multiplication_x: **Subreddit not found, or missing posts**`)
        const embed = new Discord.RichEmbed()
      .setTitle(n.title)
      .setFooter(`Number: ${n.id} | Likes: ${n.favorites} | Pages: ${n.pages} | Url:${n.url}`)
      .setColor('#000000')
      .setImage(n.thumbnail);



      




    })
}
