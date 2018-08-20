// Import module
const prefix = ";";
const request = require('request')
const Discord = require('discord.js')


exports.run = async (client, message, args) => {

  // Fetch either the author's avatar or a mentioned members avatar
  const user = message.mentions.users.first() || message.author

  // Mapped to fancy embed (This is because images take longer to load if sent in an attatchment and embeds are neater than raw URL's)
  const embed = new Discord.RichEmbed()
    .setColor('#36393F')
    .setImage(user.avatarURL)
    .setFooter(user.tag, 'https://cdn.discordapp.com/attachments/410836292885020687/475749889708654592/logo_3.png')

  // Send 
  message.channel.send(embed)

}
exports.conf = {
  perm: 0,
  enabled: true
}

exports.help = {
  name: "avatar",
  category: 'fun',
  description: "Retrieves user avatars",
  usage: '(mention)'
}