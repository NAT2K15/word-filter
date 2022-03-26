const { Client, MessageEmbed } = require('discord.js');
const chalk = require('chalk')
const client = new Client();
const config = require('./config.json');


client.once('ready', client => {
    //made by NAT2K15
    console.log(chalk.red `[MADE BY NAT2K15] ` + chalk.white `The bot is now online`)
})

client.on('message', async(message) => {
    if (message.author.bot) return;
    if (message.guild !== undefined) {
        config.word_filter.blacklist_words.forEach(async badword => {
            if (message.content.toLowerCase().search(badword.toLowerCase()) >= 0) {
                if (!message.member.roles.cache.some(r => config.word_filter.bypass.includes(r.id))) {
                    await message.delete().catch(e => {}) 
                    let e1 = new MessageEmbed()
                        .setDescription(`You cannot say || ${badword} ||  in ${message.guild.name}`)
                        .setColor(config.embed.color)
                        .setFooter(`Word said by ${message.author.tag}`)
                        .setTimestamp()
                    message.channel.send(e1).then(msg => msg.delete({ timeout: 10000 }));
                }
            }
        });
    }
    if (message.guild !== undefined) {
        const bannedinvites = config.invite_filter.blacklist_invites
        if (bannedinvites.some(invite => message.content.toLowerCase().includes(invite))) {
            if (!message.member.roles.cache.some(r => config.invite_filter.bypass.includes(r.id))) {
                await message.delete().catch(e => {}) 
                let nat2k15 = new MessageEmbed();
                nat2k15.setDescription(`You cannot send discord invites in this guild`)
                nat2k15.setColor(config.embed.color)
                nat2k15.setFooter(`Invite posted by ${message.author.tag}`)
                nat2k15.setTimestamp()
                message.channel.send(nat2k15).then(msg => msg.delete({ timeout: 10000 }));
            }
        }
    }
})

client.login(config.token).then(() => {
    setInterval(() => client.user.setActivity(`${config.presence}`, { type: "WATCHING" }), 10000);
})
