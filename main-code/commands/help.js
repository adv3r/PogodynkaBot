module.exports = {
    name: 'help',
    description: "Wzywa pomoc!",
    execute(message, args){
        let servicon = message.guild.iconURL();
        message.channel.send( {embed: {
            color: "RANDOM",
            title: `Dostępne komendy:`,
            thumbnail: {
                url: servicon,
                },
            fields: [
                {
                    name: "`pogodynka-info`",
                    value: `Wyświetla informacje o mnie:)`,
                    inline: true,
                },
                {
                    name:"`ping`",
                    value:`Pokazuje aktualny status bota.`,
                    inline: true,
                },
                {
                    name:"`users`",
                    value:`Wyświetla ilość użytkowników.`,
                    inline: true,
                },
                {
                    name:"`uptime`",
                    value:`Sprawdza, jak długo działa bot.`,
                    inline: true,
                },
                {
                    name:"`server-info`",
                    value:`Wyświetla informacje o serwerze.`,
                    inline: true,
                },
                {
                    name:"`servers`",
                    value:`Wyświetla liczbę serwerów, na których znajduje się bot.`,
                    inline:true,
                },  
                {
                    name:"`pogoda [miasto]`",
                    value:`Wyświetla aktualną prognozę pogody dla [miasta].`,
                    inline: true,
                },
                {
                    name:"`news`",
                    value:`Wysyła losową informację z kraju lub ze świata.`,
                    inline:true,
                },
                {
                    name:"`tictactoe [@user]`",
                    value:`Wyzwij na pojedynek w kółko i krzyżyk [@użytkownika].`,
                    inline: true,
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