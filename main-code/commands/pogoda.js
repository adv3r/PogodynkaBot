const weather = require("weather-js");

const Discord = require("discord.js");

module.exports = {
    name: "pogoda",
    description: "Pozwala na pobranie informacji o pogodzie w danej lokalizacji!",

    async run(client, message, args){
        let servicon = message.guild.iconURL()
        weather.find({search: args.join(" "), degreeType:`C`}, function (error, result){
            if(error){
                const error={
                    color: "RED",
                    title: `Nieprawidłowa składnia komendy!`,
                    subtitle: `Spróbuj tego:`,
                    fields: [
                        {
                            name: `Komenda powinna wyglądać w ten sposób:`,
                            value: "`^pogoda [tutaj wpisz miasto]`",
                            inline:false,
                        },
                    ],
                    timestamp: new Date(),
                    footer: {
                                text: "Coś nie działa? Napisz do mnie: adver#7336!",
                                icon_url: servicon,
                            },
            
                }
                return message.channel.send({embed: error});
            }
            if(!args[0]){ 
                const error={
                    color: "RED",
                    title: `Nieprawidłowa składnia komendy!`,
                    subtitle: `Spróbuj tego:`,
                    fields: [
                        {
                            name: `Komenda powinna wyglądać w ten sposób:`,
                            value: "`^pogoda [tutaj wpisz miasto]`",
                            inline:false,
                        },
                    ],
                    timestamp: new Date(),
                    footer: {
                                text: "Coś nie działa? Napisz do mnie: adver#7336!",
                                icon_url: servicon,
                            },
            
                }
                return message.channel.send({embed: error});
            }
            if(result === undefined || result.length === 0){ 
                const error={
                    color: "RED",
                    title: `Nieprawidłowa składnia komendy!`,
                    subtitle: `Spróbuj tego:`,
                    fields: [
                        {
                            name: `Komenda powinna wyglądać w ten sposób:`,
                            value: "`^pogoda [tutaj wpisz miasto]`",
                            inline:false,
                        },
                    ],
                    timestamp: new Date(),
                    footer: {
                                text: "Coś nie działa? Napisz do mnie: adver#7336!",
                                icon_url: servicon,
                            },
            
                }
                return message.channel.send({embed: error});
            }

            var current = result[0].current;
            var location = result[0].location;

            const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(`Prognoza pogody dla ${current.observationpoint} o godz. ${current.observationtime}`)
            .setThumbnail(current.imageUrl)
            .setDescription(`**${current.skytext}**`)
            .addField("Strefa czasowa", `UTC ${location.timezone}`, true)
            .addField(`Jednostka temp.`, `Celcius`, true)
            .addField(`Temperatura`, `${current.temperature}°`, true)
            .addField(`Wiatr`, `${current.winddisplay}`, true)
            .addField(`Odczuwalna temp.`, `${current.feelslike}°`, true)
            .addField(`Wilgotność`, `${current.humidity}%`, true)
            //.addField(`% na opady`, `${daily.precip}%`, true)
            message.channel.send(embed);

        })
    }
}