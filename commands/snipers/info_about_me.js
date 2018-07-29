const commando = require('discord.js-commando');
const discord = require('discord.js');

   class InfoAboutMeCommand extends commando.Commando
   {

     constructor(client)
     {

       super(client,{
         name: 'info',
         group: 'snipers',
         memberName: 'info',
         description: 'Learn a little bit about me!'

		   });

	 }

     async run(message, args)
         {
            var myInfo = new discord.RichEmbed()
            .setDescription("test")

            message.channel.sendEmbed(myInfo);
		 }



   }
module.exports = info
