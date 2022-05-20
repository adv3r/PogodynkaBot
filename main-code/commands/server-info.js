module.exports = {
    name: 'server-info',
    description: "Pokazuje użyteczne informacje o serwerze!",
    execute(message, args){
        let servicon = message.guild.iconURL();
        
        const{guild} = message;

        const{name, region, memberCount, owner, afkTimeout, premiumTier, createdAt, me} = guild;
        var data = new Date(createdAt).toLocaleDateString();
        
        let emoji;
        if(region == `europe` || region == `eu-central`){
            emoji = "🇪🇺";
        }else if(region == `brazil`){
            emoji = "🇧🇷";
        }else if(region == `hongkong`){
            emoji = "🇭🇰";
        }else if(region == `india`){
            emoji == "🇮🇳";
        }else if(region == `japan`){
            emoji == "🇯🇵";
        }else if(region == `russia`){
            emoji == "🇷🇺";
        }else if(region == `singapore`){
            emoji == "🇸🇬";
        }else if(region == `southafrica`){
            emoji == "🇿🇦";
        }else if(region == `sydney`){
            emoji == "🇦🇺";
        }else if(region == `uscentral`){
            emoji == "🇺🇸";
        }else if(region == `useast`){
            emoji == "🇺🇸";
        }else if(region == `ussouth`){
            emoji == "🇺🇸";
        }else if(region == `uswest`){
            emoji == "🇺🇸";
        }
       message.channel.send({embed: {
           color: "0xFFFF33",
           title: `Informacje o serwerze ${name}`,
           thumbnail: {
            url: servicon,
            },
           fields:[
               {
                   name:`Region:`,
                   value:`${emoji} ${region}`,
               },
               {
                   name:`Użytkoników:`,
                   value:`${memberCount}`,
               },
               {
                   name:`Dopuszczalny czas AFK:`,
                   value:`${afkTimeout}` / 60,
               },
               {
                   name:`Pozion Nitro Boost:`,
                   value:`${premiumTier}`,
               },
               {
                   name:`Data utworzenia:`,
                   value:`${data}`,
               },
            ],
               timestamp: new Date(),
                    footer: {
                                text: "Coś nie działa? Napisz do mnie: adver#7336!",
                                icon_url: servicon,
                            },
       }})
    }
}