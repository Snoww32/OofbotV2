//fix this, putting this in every message is stupid and inefficent
const prefix = ";";
/*
  Runs when a message is sent
*/


// Export event
module.exports = async (client, message) => {
  // Make sure it ignores bots
  if (message.author.bot) return

  // Exit if it's in dms
  if (!message.guild) return message.channel.send(`Commands don't work in dm's! Sorry!`)

  // If Guild is unavailable (ie due to server outage) exit
  if(!message.guild.available)
    return;

  // Guilds with more than 250 members don't cache all members, use this as a workaround
  // Possible ratelimit issue? Do a little research into that.
  const guild = await message.guild.fetchMembers()

  /*
    Stupidly discord doesn't cache users who send messages, so message.member might not always be defined in guilds with more than 250 members.
    This line fixes the issue by fetching the member from our previously requested guild data
  */
  message.member = await guild.members.get(message.author.id)

  // And if the message doesn't start with our prefix, bail out
  if (message.content.indexOf(prefix) !== 0) return
  // Lets go ahead and split our command and arguments apart to make life easier
  const args = message.content.slice(prefix.length).trim().replace(/\n/g, ' ').split(/ +/gm)
  const command = args.shift().toLowerCase()

  // Fetch the respective command from our map of commands
  const cmd = client.commands.get(command)

  // And in case it doesn't exist just bail out~
  if (!cmd) return

  // Check permission level
  if (cmd.conf.perm > client.tools.permCheck(message.member)) return message.channel.send(`**You need permission level \`${client.config.permLvls[cmd.conf.perm].name}\` to use this**`)

  // Bail out if the command is disabled in it's configuration (maybe strap this to a database at some point so to can be remotely toggled?)
  if (cmd.conf.enabled === false) return message.channel.send(`**This command is disabled**`)

  // And if all goes well, run the command
  await cmd.run(client, message, args)

}