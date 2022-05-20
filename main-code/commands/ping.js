module.exports = {
    name: 'ping',
    description: "Sprawdza opóźnienie",
    execute(message, args){
        const timeTaken = Date.now() - message.createdTimestamp;
        message.channel.send(`Piłeczka odbita między nami w czasie: **${timeTaken}ms**.`);
    }
}