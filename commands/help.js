/*
  Self updating help menu, probably a better way to sort command categories but this looks neat and prevents confusion
*/
const Discord = require('discord.js');
const prefix = ';';

exports.run = (client, message, args) => {

  // Gets the permission level of the member so only commands they have access to are displayed



  
  
  // Get an array of each command name
  const cmdList = client.commands.keyArray()

  // Cheaply posts raw description, marked for improvment
  if(args[0]) {

    // Gets the command
    cmd = client.commands.get(args[0])

    // Exits if no command
    if(!cmd)
      return message.channel.send('**Cannot find that command!**')

    // Nicely formatted help message
    let helpMessage = `\`\`\`js\n\`Detailed Help\`\n\n${prefix}${cmd.help.name} ${cmd.help.usage} // ${cmd.help.description}\n\n// [required] (optional)\`\`\``

    // Exits with description
    return message.channel.send(helpMessage)
  }
  
  // Arrays for our categories
  let fun = [];
  let util = [];
  
  // ForEach Script for filtering our command list
  cmdList.forEach((cmd) => {
    cmd = client.commands.get(cmd);

    

    /*
      Control flow
    */
    if (cmd.help.category === "fun")
      fun.push(prefix + cmd.help.name);

    else if (cmd.help.category === "util")
      util.push(prefix + cmd.help.name);

    else 
      console.log(`ERR, ${cmd.help.name} doesn't match any known categories!`)
    
  })

  // Format help menu to fancy embed
  const embed = new Discord.RichEmbed()
    .setAuthor("Hey, I'm Oofbot.")
    .setDescription(`A bot by \`Snow#6929\`\n**${prefix}help (command) for more info**`)
    .addField('Fun', fun.sort().join('\n'), true)
    .addField('Utility', util.sort().join('\n'), true)
    .addBlankField()
    .setColor('#36393F')
    .setURL('https://discord.gg/pQnCP3s')
    .setThumbnail(client.user.avatarURL)
    .setFooter(`If you have a problem: https://discord.gg/pQnCP3s`)

  // Send it
  message.channel.send(embed)


}




exports.conf = {
  perm: 0,
  enabled: true
}

exports.help = {
  name: "help",
  category: 'util',
  description: "Opens the help menu, or gives detailed information about a command",
  usage: '(command)'
}