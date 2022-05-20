const {Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'serwery',
    description: 'sprawdza na jakich serwerach jest bot',

    run: async(client, message, args) => {
        let serverIn = await client.guilds.cache.size;
        const guilds = client.guilds.cache.sort((a, b)=> b.memberCount - a.memberCount).first(serverIn);

        const desc = guilds.map((guild, index) =>{
            return `${index+1}) **${guild.name}** -> *${guild.memberCount}* użytkowników`}).join('\n')
        
        message.channel.send(
            new MessageEmbed().setTitle("Serwery Pogodynki:").setDescription(desc).setColor(0xFFD1DC)
        )
    }
}