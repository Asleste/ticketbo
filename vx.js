//Package
const Discord = require('discord.js');
const client = new Discord.Client();
// Constant Variables
const prefix = '_';
const ownerID = '353253343956828162';

// quickdb
const db = require('quick.db');


// Listener Events
client.on('message', async message => {

  if (message.author.bot) return;
  //Check if is in the dm channel
  if (message.channel.type !=='text') {

     let active = await db.fetch(`support_${message.author.id}`);

     let guild = client.guilds.get('guildID');
     // Two variables
     let channel, found = true;
     // This check if the support channel is create
     try {
         if (active) client.channels.get(activate.channelID).guild;

     } catch (e){
        found = false;
     }
       if (!activate || !found) {
        active = {};
        //create the channel
        channel = await guild.channels.create(`${message.author.username}-${message.author.discriminator}`,{
                parent: '', //
                topic: `?complete to close the ticket | Support for ${message.author.tag} | ID: ${message.author.id}`
         });
            let author = message.author;

           const newChannel = new Discord.MessageEmbed()
              .setColor(0x36393e)
              .setAuthor(author.tag, author.displayAvatarURL())
              .setFooter('Support Ticket Created')
              .setField('User', author)
              .addField('ID', author.id)

            //Send the message to the new channel
            await channel.send(newChannel);
            //New embed to the user to confirm the ticker
            const newTicket = new Discord.MessageEmbed()
              .setColor(0x36393e)
              .setAuthor(`Hello, ${author.tag}`,author.displayAvatarURL())
              .setFooter('Support Ticket Created')

              // Send embed
            await author.send(newTicket);
            //Update Active Data
            active.channelID = channel.id;
            active.targetID = author.id;
        }

          channel = client.channels.get(active.channelID);
          //dm embed
          const dm = new Discord.MessageEmbed()
          .setColor(0x36393e)
          .setAuthor(`Thank you, ${message.author.tag}`,message.author.displayAvatarURL())
          .setFooter(`Your message has been sent -- A staff member will be in contact soon`)

           // Send Embed
          await message.author.send(dm);

          // Create the embed for the ticket channel
          const embed = Disocord.MessageEmbed()
               .setColor(0x36393e)
               .setAuthor(message.author.tag, message.author.displayAvatarURL())
               .setDescription(message.content)
               .setFooter(`Message Recieved -- ${message.author.tag}`)

           // Send Embed
           await channel.send(embed);

           // Update Data & Return
           db.set(`support_${message.author.id}`, active);
           db.set(`supportChannel_${channel.id}`, message.author.id);
           return;

    }

      // Fetch Support Object
      let support = await db.fetch(`supportChannel_${message.channel.id}`);

      if (support) {
        //update the support object
         support = await db.fetch(`support_${support}`);
         // Check if the user is still in the server
         let supportUser = client.users.get(support.targetID);
         if (!supportUser) return message.channel.delete();
         //command
        if(message.content.toLowerCase() == '?complete') {

          const complete = new Discord.MessageEmbed()
                .setColor(0x36393e)
                .setAuthor(`Hey, ${supportUser.tag}`, supportUser.displayAvatarURL())
                .setFooter('Ticket Closed -- Brain/Out Support')
                .setDescription('*Your ticket has been marked as **complete**. If you wish to reopen this, or create a new one, please send a message to the bot.*')

            supportUser.send(complete);
            message.channel.delete();
            db.delete(`support_${support.targetID}`);
         }
          const embed = new Discord.MessageEmbed()
                .setColor(0x36393e)
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setFooter(`Message Recieved -- Brain/Out Support`)
                .setDescription(message.content)

            //send to users DM
           client.users.get(support.targetID).send(embed)

            message.delet({timeout: 1000});

           //send it to the support channel
           embed.setFooter(`Message Sent -- ${supportUser.tag}`).setDescription(message.content);

           // Send & Return
           return message.channel.send(embed);


       }







   // Variables
    let args = message.content.slice(prefix.length).trim().split(' ');
    let cmd = args.shift().toLowerCase();

    // Return Staments
    if (message.author.bot) return; // Ignore all bots
    if (!message.content.startsWith(prefix)) return; // Return if the message doesnt start with the prefix

    // Command Handler
    try {

    // Options
    let ops = {
        ownerID: ownerID
    }


    let commandFile = require(`./commands/${cmd}.js`); // This require a file in the commands folder
    commandFile.run(client, message, args, ops);

	} catch (e){
       console.log(e.stack);
    }


	});
// Discord Login
client.login(process.env.BOT_TOKEN);
