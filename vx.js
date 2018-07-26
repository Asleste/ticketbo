const Discord = require("discord.js");
const client = new Discord.Client();

function clean(text) {
    if (typeof(text) === "string")
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}

var prefix = "^";
var token = " ";

client.on("ready", () => {
  console.log("B/O Ticket System | Logged in! Server count: ${client.guilds.size}");
  client.user.setGame(`https://vk.com/brainoutgame`);
});

client.on("guildCreate", (guild) => {
client.user.setGame(``);
    guild.owner.user.send(`Thanks for Using my Bot!`);
});

client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  if (message.content.toLowerCase().startsWith(prefix + `help`)) {
    const embed = new Discord.RichEmbed()
    .setTitle(`:tools: Brain/Out Ticket Help`)
    .setColor(0xCF40FA)
    .setDescription(`This bot is used for #support and #bug_report Channels`)
    .addField(`Tickets`, `[${prefix}**ticket**]() *Opens up a new ticket and tags the Brain/Out Team*\n[${prefix}**close**]() *Closes a ticket that has been resolved* `)
    message.channel.send({ embed: embed });
  }

  if (message.content.toLowerCase().startsWith(prefix + `ping`)) {
    message.channel.send(`Hoold on!`).then(m => {
    m.edit(`:ping_pong: Wew, made it over the ~waves~ ! **Pong!**\nMessage edit time is ` + (m.createdTimestamp - message.createdTimestamp) + `ms, Client ` + Math.round(client.ping) + `ms.`);
    });
}

if (message.content.toLowerCase().startsWith(prefix + `ticket`)) {
    const reason = message.content.split(" ").slice(1).join(" ");
    if (!message.guild.roles.exists("name", "Support")) return message.channel.send(`This server doesn't have a \`Support\` role made, so the ticket won't be opened.\nIf you are an administrator, make one with that name exactly and give it to users that should be able to see tickets.`);
    if (message.guild.channels.exists("name", "ticket-" + message.author.id)) return message.channel.send(`You already have a ticket open.`);
    message.guild.createChannel(`ticket-${message.author.id}`, "text").then(c => {
        let role = message.guild.roles.find("name", "Support");
        let role2 = message.guild.roles.find("name", "@everyone");
        c.overwritePermissions(role, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
        c.overwritePermissions(role2, {
            SEND_MESSAGES: false,
            READ_MESSAGES: false
        });
        c.overwritePermissions(message.author, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
        message.channel.send(`:white_check_mark: Your ticket has been created, #${c.name}.`);
        const embed = new Discord.RichEmbed()
        .setColor(0xCF40FA)
        .addField(`Hey ${message.author.username}!`, `Please try explain why you opened this ticket with as much detail as possible. Our **Brain/Out Team** will be here soon to help.`)
        .setTimestamp();
        c.send({ embed: embed });
    }).catch(console.error);
}
if (message.content.toLowerCase().startsWith(prefix + `close`)) {
    if (!message.channel.name.startsWith(`ticket-`)) return message.channel.send(`You can't use the close command outside of a ticket channel.`);

    message.channel.send(`Are you sure? Once confirmed, you cannot reverse this action!\nTo confirm, type \`^confirm\`. This will time out in 10 seconds and be cancelled.`)
    .then((m) => {
      message.channel.awaitMessages(response => response.content === '^confirm', {
        max: 1,
        time: 10000,
        errors: ['time'],
      })
      .then((collected) => {
          message.channel.delete();
        })
        .catch(() => {
          m.edit('Ticket close timed out, the ticket was not closed.').then(m2 => {
              m2.delete();
          }, 3000);
        });
    });
}

});
{
	"name": "Ticket",
	"permissions": "NONE",
	"restriction": "1",
	"_id": "QdupG",
	"actions": [{
			"storage": "2",
			"varName": "ticket-num",
			"min": "10000000",
			"max": "9999999999",
			"name": "Generate Random Number"
		},
		{
			"info": "1",
			"infoIndex": "1",
			"storage": "1",
			"varName": "origmessage",
			"name": "Store Command Params"
		},
		{
			"info": "1",
			"find": "Team",
			"storage": "1",
			"varName": "team",
			"name": "Find Role"
		},
		{
			"channelName": "ticket-${serverVars(\"ticket-num\")}",
			"topic": "",
			"position": "",
			"storage": "2",
			"varName": "ticket-channel",
			"name": "Create Text Channel"
		},
		{
			"storage": "4",
			"varName": "ticket-channel",
			"permission": "READ_MESSAGES",
			"state": "1",
			"name": "Set Channel Permissions"
		},
		{
			"channel": "0",
			"varName": "",
			"message": "${member} your ticket has been created! ${serverVars(\"ticket-channel\")} :ticket:",
			"storage": "0",
			"varName2": "",
			"name": "Send Message"
		},
		{
			"title": "Ticket #${serverVars(\"ticket-num\")}",
			"author": "",
			"color": "",
			"timestamp": "true",
			"url": "",
			"authorIcon": "",
			"imageUrl": "",
			"thumbUrl": "",
			"storage": "1",
			"varName": "ticketmsg",
			"name": "Create Embed Message"
		},
		{
			"storage": "1",
			"varName": "ticketmsg",
			"message": "${member} hello! This ticket is for you to speak to support!",
			"name": "Set Embed Description"
		},
		{
			"storage": "1",
			"varName": "ticketmsg",
			"fieldName": "Original Message",
			"message": "${tempVars(\"origmessage\")}",
			"inline": "1",
			"name": "Add Embed Field"
		},
		{
			"storage": "1",
			"varName": "ticketmsg",
			"channel": "6",
			"varName2": "ticket-channel",
			"name": "Send Embed Message"
		},
		{
			"channel": "4",
			"varName": "ticket-channel",
			"member": "1",
			"varName2": "",
			"permission": "READ_MESSAGES",
			"state": "0",
			"name": "Set Member Channel Perms"
		},
		{
			"channel": "4",
			"varName": "ticket-channel",
			"role": "3",
			"varName2": "team",
			"permission": "READ_MESSAGES",
			"state": "0",
			"name": "Set Role Channel Perms"
		}
	]
}




client.login(process.env.BOT_TOKEN);
