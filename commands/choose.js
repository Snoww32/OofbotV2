const Discord = require('discord.js')

exports.run = async (client, message, args) => {

  // Divide up our selection
  const selection = args.join(' ').split(/\/+/gmi)

  // Format our embed
  const embed = new Discord.RichEmbed()
    .setDescription('I pick... :thinking:')
    .setColor('#36393F')

  // Send the first message
  const ms = await message.channel.send(embed)

  // Add a 1.5 second delay
  setTimeout(() => {

    // Update our embed with choice
    embed.setDescription(`**${selection[Math.floor(Math.random() * selection.length)]}**!`)

    // Edit our message with new embed
    ms.edit(embed);


  }, 1500)
}

exports.conf = {
  perm: 0,
  enabled: true
}

exports.help = {
  name: 'choose',
  description: 'Picks from a selection of items',
  usage: '[item]/[item]/(item)/(etc..)',
  category: "util"
}