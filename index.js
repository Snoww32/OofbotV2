// god this looks awful clean this shit up
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");
const fs = require('fs');
const Enmap = require('enmap')
const prefix = ";";
client.on('ready', () => {
    console.log(`-----------------------------------\nOofbotV2 has launched!\nRunning in ${client.guilds.size} guilds with ${client.users.size} users!`);
});


fs.readdir('./events/', (err, files) => {
  if (err) return console.error(err)

  // Cycle through our list of files
  files.forEach(file => {

     if (!file.endsWith('.js')) // Bail if file isn't a .js file, thanks Apple
      return;

    console.log(`Loading event ${file}..`) // Neat logging message (fancy startup)


    const event = require(`./events/${file}`) // Get the file
    


    let eventName = file.split('.')[0] // Just grabbing the event name from the file
    
    client.on(eventName, event.bind(null, client)) // And now lets set up a listener for the event

    delete require.cache[require.resolve(`./events/${file}`)] // Stops us from ending up with circular dependancies *1
  })

  console.log(`Events loaded successfully!`) // More fancy logging messages
})

client.commands = new Enmap()

/*
  Map our commands to our enmap (Thanks Evie!)
*/
fs.readdir('./commands/', (err, files) => {
  if (err) return console.error(err) // Err check

  files.forEach(file => {

    if (!file.endsWith('.js')) // Again, thank you apple for your brilliant DS_Store. You suck :)
      return;

    let cmdModule = require(`./commands/${file}`) // Again just require the command file so we can stick it in our Enmap :z3:

    let cmdName = file.split('.')[0] // File name

    console.log(`Loading command ${cmdName}..`) // Fancy logging!

    client.commands.set(cmdName, cmdModule) // And finally, sticking our command into the Enmap!

  })

  console.log(`Commands loaded successfully!`) // Last bit of fancy logging

})


client.login(config.token);