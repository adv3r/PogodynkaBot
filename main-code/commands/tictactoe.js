const{tictactoe} = require('reconlx')

module.exports = {
    name: 'tictactoe',
    description: 'Uruchamia grę w kółko i krzyżyk!',

    run : async (client, message, args) =>{
        const member = message.mentions.members.first()
        if(!member) return message.channel.send("Musisz wyzwać na pojedynek **@użytkownika!**")

        new tictactoe({
            player_two: member, 
            message: message
        })
    }
}