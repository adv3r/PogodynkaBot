module.exports = {
    name: 'server-info',
    description: "Pokazuje uลผyteczne informacje o serwerze!",
    execute(message, args){
        let servicon = message.guild.iconURL();
        
        const{guild} = message;

        const{name, region, memberCount, owner, afkTimeout, premiumTier, createdAt, me} = guild;
        var data = new Date(createdAt).toLocaleDateString();
        
        let emoji;
        if(region == `europe` || region == `eu-central`){
            emoji = "๐ช๐บ";
        }else if(region == `brazil`){
            emoji = "๐ง๐ท";
        }else if(region == `hongkong`){
            emoji = "๐ญ๐ฐ";
        }else if(region == `india`){
            emoji == "๐ฎ๐ณ";
        }else if(region == `japan`){
            emoji == "๐ฏ๐ต";
        }else if(region == `russia`){
            emoji == "๐ท๐บ";
        }else if(region == `singapore`){
            emoji == "๐ธ๐ฌ";
        }else if(region == `southafrica`){
            emoji == "๐ฟ๐ฆ";
        }else if(region == `sydney`){
            emoji == "๐ฆ๐บ";
        }else if(region == `uscentral`){
            emoji == "๐บ๐ธ";
        }else if(region == `useast`){
            emoji == "๐บ๐ธ";
        }else if(region == `ussouth`){
            emoji == "๐บ๐ธ";
        }else if(region == `uswest`){
            emoji == "๐บ๐ธ";
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
                   name:`Uลผytkonikรณw:`,
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
                                text: "Coล nie dziaลa? Napisz do mnie: adver#7336!",
                                icon_url: servicon,
                            },
       }})
    }
}